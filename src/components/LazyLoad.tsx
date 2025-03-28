import { Suspense, ReactNode } from 'react';

interface LazyLoadProps {
  children: ReactNode;
  fallback: ReactNode;
}

export const LazyLoad = ({ children, fallback }: LazyLoadProps) => (
  <Suspense fallback={fallback}>
    {children}
  </Suspense>
);

// Exemplo de uso:
// const VideoPlayer = () => (
//   <LazyComponent
//     importFunc={() => import('@/components/VideoPlayer')}
//     videoUrl="https://exemplo.com/video.mp4"
//   />
// );
