import type { YoutubeVideo } from "../types/youtube";

const API_KEY = import.meta.env.YOUTUBE_API_KEY;

export async function searchVideos(
  query: string
): Promise<YoutubeVideo[]> {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(
      query
    )}&maxResults=20&key=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch videos");
  }

  const data = await response.json();

  return data.items.map((item: any) => ({
    id: item.id.videoId,
    title: item.snippet.title,
    thumbnail: item.snippet.thumbnails.high.url,
    channel: item.snippet.channelTitle,
  }));
}