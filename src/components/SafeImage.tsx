import React from 'react';

export default function SafeImage({
  src,
  alt,
  fallback = '/images/placeholders/placeholder.png',
  ...rest
}: React.ImgHTMLAttributes<HTMLImageElement> & { fallback?: string }) {
  const [err, setErr] = React.useState(false);
  
  return (
    <img 
      src={err ? fallback : src} 
      alt={alt} 
      onError={() => setErr(true)} 
      {...rest} 
    />
  );
}
