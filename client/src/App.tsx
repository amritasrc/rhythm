import { useState } from "react";

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
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const firstVideo = ytData?.items?.[0];

  return (
    <div className="h-full min-h-screen w-full bg-zinc-900 text-white">
      <h1>YouTube Search</h1>

      <input
        type="text"
        placeholder="Search songs..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button onClick={searchVideos}>Search</button>

      {loading && <p>Loading...</p>}

      {firstVideo && (
        <div>
          {/* <img
            src={firstVideo.snippet.thumbnails.high.url}
            alt={firstVideo.snippet.title}
          />
          <p>{firstVideo.id.videoId}</p>
          <p>{firstVideo.snippet.title}</p> */}

          <iframe
            width="560"
            height="315"
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
    </div>
  );
}
