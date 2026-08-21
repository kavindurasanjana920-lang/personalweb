/* eslint-disable @next/next/no-img-element */

interface MediaContainerProps {
  src: string;
  alt?: string;
  type?: "image" | "video";
  className?: string;
  full?: boolean;
}

export function MediaContainer({
  src,
  alt = "",
  type = "image",
  className = "",
  full = false,
}: MediaContainerProps) {
  return (
    <div className={`rounded-lg overflow-hidden border border-border ${full ? "w-full h-auto" : "w-full h-[440px]"} ${className}`}>
      {type === "image" ? (
        <img
          src={src}
          alt={alt}
          className={`w-full max-w-full block ${full ? "h-auto" : "h-full object-cover object-[center_25%]"}`}
        />
      ) : (
        <video
          src={src}
          className="w-full h-full object-cover object-center max-w-full max-h-full"
          controls
        />
      )}
    </div>
  );
}

