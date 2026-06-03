import { useState } from "react";

type Video = {
  id: string;
  title: string;
  thumbnail: string;
};

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export default function YouTubeSearch() {
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState<Video[]>([]);
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

      const data = await response.json();

      const formattedVideos: Video[] = data.items.map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.high.url,
      }));

      setVideos(formattedVideos);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>YouTube Search</h1>

      <input
        type="text"
        placeholder="Search songs..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button onClick={searchVideos}>Search</button>

      {loading && <p>Loading...</p>}

      <div>
        {videos.map((video) => (
          <div key={video.id}>
            <img src={video.thumbnail} alt={video.title} width={250} />
            <h3>{video.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
