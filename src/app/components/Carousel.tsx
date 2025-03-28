import { forwardRef, useState, useEffect } from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/24/outline';

interface CarouselProps {
  items: React.ReactNode[];
  defaultIndex?: number;
  autoPlay?: boolean;
  interval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  showThumbs?: boolean;
  infinite?: boolean;
  className?: string;
}

export default forwardRef<HTMLDivElement, CarouselProps>(function Carousel(
  {
    items,
    defaultIndex = 0,
    autoPlay = false,
    interval = 5000,
    showArrows = true,
    showDots = true,
    showThumbs = false,
    infinite = true,
    className,
    ...props
  },
  ref
) {
  const [currentIndex, setCurrentIndex] = useState(defaultIndex);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentIndex(prev => {
          if (prev === items.length - 1) {
            return infinite ? 0 : prev;
          }
          return prev + 1;
        });
      }, interval);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isPlaying, interval, items.length, infinite]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsPlaying(false);
  };

  const goToPrevSlide = () => {
    setCurrentIndex(prev => {
      if (prev === 0) {
        return infinite ? items.length - 1 : prev;
      }
      return prev - 1;
    });
    setIsPlaying(false);
  };

  const goToNextSlide = () => {
    setCurrentIndex(prev => {
      if (prev === items.length - 1) {
        return infinite ? 0 : prev;
      }
      return prev + 1;
    });
    setIsPlaying(false);
  };

  const goToFirstSlide = () => {
    setCurrentIndex(0);
    setIsPlaying(false);
  };

  const goToLastSlide = () => {
    setCurrentIndex(items.length - 1);
    setIsPlaying(false);
  };

  return (
    <div
      ref={ref}
      className={`
          relative overflow-hidden
          ${className}
        `}
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(autoPlay)}
      {...props}
    >
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          width: `${items.length * 100}%`,
        }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full"
            style={{ width: `${100 / items.length}%` }}
          >
            {item}
          </div>
        ))}
      </div>

      {showArrows && (
        <>
          <button
            type="button"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-gray-800 shadow-lg hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            onClick={goToPrevSlide}
            aria-label="Slide anterior"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-gray-800 shadow-lg hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            onClick={goToNextSlide}
            aria-label="Próximo slide"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="absolute left-12 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-gray-800 shadow-lg hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            onClick={goToFirstSlide}
            aria-label="Primeiro slide"
          >
            <ChevronDoubleLeftIcon className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="absolute right-12 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-gray-800 shadow-lg hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            onClick={goToLastSlide}
            aria-label="Último slide"
          >
            <ChevronDoubleRightIcon className="h-5 w-5" />
          </button>
        </>
      )}

      {showDots && (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
          {items.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`
                  h-2 w-2 rounded-full transition-colors
                  ${currentIndex === index ? 'bg-primary-500' : 'bg-white/50 hover:bg-white/80'}
                `}
              onClick={() => goToSlide(index)}
              aria-label={`Ir para slide ${index + 1}`}
              aria-current={currentIndex === index ? 'true' : 'false'}
            />
          ))}
        </div>
      )}

      {showThumbs && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 px-4">
          {items.map((item, index) => (
            <button
              key={index}
              type="button"
              className={`
                  h-16 w-24 overflow-hidden rounded-lg border-2 transition-colors
                  ${
                    currentIndex === index
                      ? 'border-primary-500'
                      : 'border-transparent hover:border-gray-300'
                  }
                `}
              onClick={() => goToSlide(index)}
              aria-label={`Ir para slide ${index + 1}`}
              aria-current={currentIndex === index ? 'true' : 'false'}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
});
