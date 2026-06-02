const API_KEY = import.meta.env.YOUTUBE_API_KEY;

export async function searchSongs(query:string) {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
      query,
    )}&type=video&videoCategoryId=10&maxResults=20&key=${API_KEY}`,
  );

  const data = await response.json();
  return data.items;
}