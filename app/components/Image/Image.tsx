interface Props {
  alt: string;
  title?: string;
  src?: string;
  className?: string;
  style?: any;
}

export function Image({ alt, title, src, style, className = "" }: Props) {
  return <img className={className} style={style} src={src} alt={alt} title={title || alt} />;
}
