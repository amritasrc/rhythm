import { useState } from "react";
import { searchVideos } from "../src/api/youtube";
import type { YoutubeVideo } from "../src/types/youtube";

export default function App() {
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState<YoutubeVideo[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      setLoading(true);
      const result = await searchVideos(query);
      setVideos(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search music..."
      />

      <button onClick={handleSearch}>Search</button>

      {loading && <p>Loading...</p>}

      <div>
        {videos.map((video) => (
          <div key={video.id}>
            <img src={video.thumbnail} alt={video.title} width={200} />
            <h3>{video.title}</h3>
            <p>{video.channel}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
