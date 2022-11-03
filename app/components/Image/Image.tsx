interface Props {
  alt: string;
  title?: string;
  src: string;
}

export function Image({ alt, title, src }: Props) {
  return (
    <img
      src={src}
      alt={alt}
      title={title || alt}
    />
  )
}
