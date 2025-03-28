import { forwardRef, useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface TooltipProps {
  content: React.ReactNode;
  position?: 'top' | 'right' | 'bottom' | 'left';
  delay?: number;
  children: React.ReactNode;
  className?: string;
}

export default forwardRef<HTMLDivElement, TooltipProps>(function Tooltip(
  { content, position = 'top', delay = 200, children, className, ...props },
  ref
) {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isVisible && triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;

      let x = 0;
      let y = 0;

      switch (position) {
        case 'top':
          x = triggerRect.left + scrollX;
          y = triggerRect.top + scrollY - tooltipRect.height - 8;
          break;
        case 'right':
          x = triggerRect.right + scrollX + 8;
          y = triggerRect.top + scrollY;
          break;
        case 'bottom':
          x = triggerRect.left + scrollX;
          y = triggerRect.bottom + scrollY + 8;
          break;
        case 'left':
          x = triggerRect.left + scrollX - tooltipRect.width - 8;
          y = triggerRect.top + scrollY;
          break;
      }

      setCoords({ x, y });
    }
  }, [isVisible, position]);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const positionClasses = {
    top: 'bottom-full left-0 mb-2',
    right: 'left-full top-0 ml-2',
    bottom: 'top-full left-0 mt-2',
    left: 'right-full top-0 mr-2',
  };

  const arrowClasses = {
    top: 'bottom-0 left-0 translate-y-full border-t-gray-900 border-x-transparent border-b-transparent',
    right:
      'left-0 top-0 -translate-x-full border-r-gray-900 border-t-transparent border-b-transparent',
    bottom:
      'top-0 left-0 -translate-y-full border-b-gray-900 border-x-transparent border-t-transparent',
    left: 'right-0 top-0 translate-x-full border-l-gray-900 border-t-transparent border-b-transparent',
  };

  return (
    <div
      ref={triggerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative inline-block"
      {...props}
    >
      {children}

      {isVisible &&
        createPortal(
          <div
            ref={tooltipRef}
            className={`
                fixed z-50
                ${positionClasses[position]}
              `}
            style={{
              left: coords.x,
              top: coords.y,
            }}
          >
            <div
              className={`
                  relative rounded bg-gray-900 px-2 py-1 text-sm text-white
                  ${className}
                `}
            >
              {content}
              <div
                className={`
                    absolute h-0 w-0 border-4
                    ${arrowClasses[position]}
                  `}
              />
            </div>
          </div>,
          document.body
        )}
    </div>
  );
});
