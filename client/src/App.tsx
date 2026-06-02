import { useState } from "react";
import { searchSongs } from "../services/youtubeApi";

const App = () => {
  const [songs, setSongs] = useState([]);

  async function handleSearch() {
    const results = await searchSongs("Arijit Singh");
    setSongs(results);
    console.log(`Result: ${results}`);
  }
  return (
    <div className="bg-zinc-900 h-screen w-full text-white">
      <button onClick={handleSearch}>Search</button>

      {songs.map((song) => (
        <div key={song.id.videoId}>
          <img
            src={song.snippet.thumbnails.medium.url}
            alt={song.snippet.title}
          />

          <h3>{song.snippet.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default App;
