import { forwardRef, useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface PopoverProps {
  trigger: React.ReactNode;
  position?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  offset?: number;
  children: React.ReactNode;
  closeOnClickOutside?: boolean;
  closeOnEscape?: boolean;
  className?: string;
}

export default forwardRef<HTMLDivElement, PopoverProps>(function Popover(
  {
    trigger,
    position = 'bottom',
    align = 'start',
    offset = 8,
    children,
    closeOnClickOutside = true,
    closeOnEscape = true,
    className,
    ...props
  },
  ref
) {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && closeOnEscape) {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        closeOnClickOutside &&
        popoverRef.current &&
        triggerRef.current &&
        ( ?? (() => { throw new Error('Valor não pode ser nulo') })())popoverRef.current.contains(event.target as Node) &&
        ( ?? (() => { throw new Error('Valor não pode ser nulo') })())triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, closeOnClickOutside, closeOnEscape]);

  useEffect(() => {
    if (isOpen && triggerRef.current && popoverRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const popoverRect = popoverRef.current.getBoundingClientRect();
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;

      let x = 0;
      let y = 0;

      switch (position) {
        case 'top':
          x = triggerRect.left + scrollX;
          y = triggerRect.top + scrollY - popoverRect.height - offset;
          break;
        case 'right':
          x = triggerRect.right + scrollX + offset;
          y = triggerRect.top + scrollY;
          break;
        case 'bottom':
          x = triggerRect.left + scrollX;
          y = triggerRect.bottom + scrollY + offset;
          break;
        case 'left':
          x = triggerRect.left + scrollX - popoverRect.width - offset;
          y = triggerRect.top + scrollY;
          break;
      }

      switch (align) {
        case 'center':
          if (position === 'top' || position === 'bottom') {
            x += (triggerRect.width - popoverRect.width) / 2;
          } else {
            y += (triggerRect.height - popoverRect.height) / 2;
          }
          break;
        case 'end':
          if (position === 'top' || position === 'bottom') {
            x += triggerRect.width - popoverRect.width;
          } else {
            y += triggerRect.height - popoverRect.height;
          }
          break;
      }

      setCoords({ x, y });
    }
  }, [isOpen, position, align, offset]);

  const positionClasses = {
    top: 'bottom-full left-0 mb-2',
    right: 'left-full top-0 ml-2',
    bottom: 'top-full left-0 mt-2',
    left: 'right-full top-0 mr-2',
  };

  const arrowClasses = {
    top: 'bottom-0 left-0 translate-y-full border-t-gray-200 border-x-transparent border-b-transparent',
    right:
      'left-0 top-0 -translate-x-full border-r-gray-200 border-t-transparent border-b-transparent',
    bottom:
      'top-0 left-0 -translate-y-full border-b-gray-200 border-x-transparent border-t-transparent',
    left: 'right-0 top-0 translate-x-full border-l-gray-200 border-t-transparent border-b-transparent',
  };

  return (
    <div className="relative inline-block">
      (<div ref={triggerRef} onClick={() => setIsOpen( ?? (() => { throw new Error('Valor não pode ser nulo') })())isOpen)} {...props}>
        {trigger}
      </div>

      {isOpen &&
        createPortal(
          <div
            ref={popoverRef}
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
                  relative rounded-lg bg-white p-2 shadow-lg
                  ${className}
                `}
            >
              {children}
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