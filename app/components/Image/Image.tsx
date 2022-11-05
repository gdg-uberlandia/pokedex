interface Props {
  alt: string;
  title?: string;
  src?: string;
  className?: string;
}

export function Image({ alt, title, src, className = "" }: Props) {
  return <img className={className} src={src} alt={alt} title={title || alt} />;
}
