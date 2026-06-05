import { useState, useRef, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
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
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/") {
        e.preventDefault(); // prevents "/" from being typed immediately
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const firstVideo = ytData?.items?.[0];

  return (
    <div className="h-full min-h-screen w-full flex flex-col items-center justify-center gap-5">
      <h1 className="text-2xl">Rhythm</h1>

      {!firstVideo && (
        <div className="flex flex-col items-start">
          <img
            src={demoThumbnail}
            alt="demoThumbnail"
            className="h-80 w-auto rounded-2xl"
          />
          <label className="mt-4">
            Now playing: <span></span>
          </label>
        </div>
      )}

      {firstVideo && (
        <div className="flex flex-col items-start">
          <img
            src={firstVideo.snippet.thumbnails.high.url}
            alt={firstVideo.snippet.title}
            className="h-100 w-auto rounded-2xl"
          />
          {/* <p>{firstVideo.id.videoId}</p> */}
          <label className="mt-4">
            Now playing: <span>{firstVideo.snippet.title}</span>
          </label>

          <iframe
            width="500"
            height="10"
            // className="h-1 w-133 rounded-2xl"
            src={`https://www.youtube.com/embed/${firstVideo.id.videoId}`}
            title={firstVideo.snippet.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />

          <button onClick={() => setSelectedVideoId(firstVideo.id.videoId)}>
            Play
          </button>
        </div>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          searchVideos();
        }}
        className="border border-zinc-600 px-2 py-1 rounded-lg flex items-center"
      >
        <input
          type="text"
          ref={inputRef}
          placeholder="Press / to focus"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="outline-none w-60"
        />
        <button onClick={searchVideos} type="submit" className="outline-none">
          <IoSearch />
        </button>
      </form>
    </div>
  );
}
