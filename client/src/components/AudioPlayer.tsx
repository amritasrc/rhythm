type AudioPlayerProps = {
  videoId: string;
};

export default function AudioPlayer({ videoId }: AudioPlayerProps) {
  return (
    <iframe
      width="1"
      height="1"
      src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
      allow="autoplay"
      title="YouTube Player"
    />
  );
}
