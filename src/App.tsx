import { useState, useRef, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import YouTube from "react-youtube";
import demoThumbnail from "./assets/rhythm-thumbnail.png";

interface VideoItem {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
  };
}

interface YouTubeResponse {
  items: VideoItem[];
}

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export default function App() {
  const [query, setQuery] = useState("");
  const [ytData, setYtData] = useState<YouTubeResponse | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [loading, setLoading] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const playerRef = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const searchVideos = async () => {
    if (!query.trim()) return;

    try {
      setLoading(true);

      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(
          query,
        )}&maxResults=10&key=${API_KEY}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch videos");
      }

      const data: YouTubeResponse = await response.json();

      setYtData(data);
      setQuery("");

      if (data.items.length > 0) {
        setSelectedVideo(data.items[0]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePlayerReady = (event: any) => {
    playerRef.current = event.target;

    setTimeout(() => {
      setDuration(playerRef.current.getDuration());
      playerRef.current.playVideo();
      setIsPlaying(true);
    }, 500);
  };

  const togglePlayPause = () => {
    if (!playerRef.current) return;

    const state = playerRef.current.getPlayerState();

    if (state === 1) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    } else {
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

  const seekVideo = (value: number) => {
    if (!playerRef.current) return;

    playerRef.current.seekTo(value, true);
    setCurrentTime(value);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current) {
        setCurrentTime(playerRef.current.getCurrentTime());
        setDuration(playerRef.current.getDuration());
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center gap-6 px-6 py-20">
      <h1 className="text-3xl font-bold">Rhythm 🎵</h1>

      {!selectedVideo ? (
        <div className="flex flex-col items-start">
          <img src={demoThumbnail} alt="Rhythm" className="h-80 rounded-2xl" />

          <p className="mt-4">Search for a song to start listening.</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 w-full max-w-xl">
          <img
            src={selectedVideo.snippet.thumbnails.high.url}
            alt={selectedVideo.snippet.title}
            className="w-full h-80 object-cover rounded-2xl border"
          />

          <h2 className="text-center font-semibold">
            {selectedVideo.snippet.title}
          </h2>

          <YouTube
            videoId={selectedVideo.id.videoId}
            onReady={handlePlayerReady}
            opts={{
              width: "0",
              height: "0",
              playerVars: {
                autoplay: 1,
              },
            }}
          />

          <div className="w-full">
            <input
              type="range"
              min={0}
              max={duration}
              value={currentTime}
              onChange={(e) => seekVideo(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={togglePlayPause}
              className="px-4 py-2 rounded-lg border"
            >
              {isPlaying ? "Pause" : "Play"}
            </button>
          </div>

          <p>
            {Math.floor(currentTime)}s / {Math.floor(duration)}s
          </p>
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          searchVideos();
        }}
        className="border border-zinc-600 px-3 py-2 rounded-lg flex items-center gap-2"
      >
        <input
          type="text"
          ref={inputRef}
          placeholder="Press / to focus"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="outline-none w-72"
        />

        <button type="submit">
          <IoSearch />
        </button>
      </form>

      {loading && <p>Loading...</p>}

      {ytData && ytData.items.length > 0 && (
        <div className="w-full max-w-xl flex flex-col gap-2">
          <h3 className="font-semibold">Search Results</h3>

          {ytData.items.map((video) => (
            <button
              key={video.id.videoId}
              onClick={() => setSelectedVideo(video)}
              className="flex items-center gap-3 p-2 rounded-lg border text-left hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <img
                src={video.snippet.thumbnails.high.url}
                alt={video.snippet.title}
                className="w-20 rounded"
              />

              <span>{video.snippet.title}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
