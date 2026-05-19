interface VideoEmbedProps {
  videoId: string;
  title: string;
  platform?: 'youtube' | 'vimeo';
}

export function VideoEmbed({ videoId, title, platform = 'youtube' }: VideoEmbedProps) {
  let embedUrl = '';

  if (platform === 'youtube') {
    embedUrl = `https://www.youtube.com/embed/${videoId}`;
  } else if (platform === 'vimeo') {
    embedUrl = `https://player.vimeo.com/video/${videoId}`;
  }

  return (
    <div className="space-y-3">
      <h4 className="font-semibold text-sm text-primary">{title}</h4>
      <div className="relative w-full aspect-video bg-secondary/50 border border-border rounded-lg overflow-hidden">
        <iframe
          src={embedUrl}
          title={title}
          className="absolute inset-0 w-full h-full"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
    </div>
  );
}
