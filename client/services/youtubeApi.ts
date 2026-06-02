// const API_KEY = import.meta.env.YOUTUBE_API_KEY;

// export async function searchSongs(query:string) {
//   const response = await fetch(
//     `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
//       query,
//     )}&type=video&videoCategoryId=10&maxResults=20&key=${API_KEY}`,
//   );

//   const data = await response.json();
//   return data.items;
// }

type SearchResult = {
  id: string;
  title: string;
  thumbnail: string;
  channel: string;
};

const API_KEY = "YOUR_API_KEY";

export async function searchMusic(
  query: string
): Promise<SearchResult[]> {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(
    query
  )}&maxResults=10&key=${API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();

  return data.items.map((item: any) => ({
    id: item.id.videoId,
    title: item.snippet.title,
    thumbnail: item.snippet.thumbnails.high.url,
    channel: item.snippet.channelTitle,
  }));
}