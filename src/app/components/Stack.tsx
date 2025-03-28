import { ReactNode } from 'react';

interface StackProps {
  children: ReactNode;
  direction?: 'row' | 'column';
  spacing?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  wrap?: boolean;
  className?: string;
}

export default function Stack({
  children,
  direction = 'column',
  spacing = 4,
  align = 'start',
  justify = 'start',
  wrap = false,
  className,
}: StackProps) {
  const directions = {
    row: 'flex-row',
    column: 'flex-col',
  };

  const spacings = {
    0: 'space-y-0',
    1: 'space-y-1',
    2: 'space-y-2',
    3: 'space-y-3',
    4: 'space-y-4',
    5: 'space-y-5',
    6: 'space-y-6',
    8: 'space-y-8',
    10: 'space-y-10',
    12: 'space-y-12',
  };

  const rowSpacings = {
    0: 'space-x-0',
    1: 'space-x-1',
    2: 'space-x-2',
    3: 'space-x-3',
    4: 'space-x-4',
    5: 'space-x-5',
    6: 'space-x-6',
    8: 'space-x-8',
    10: 'space-x-10',
    12: 'space-x-12',
  };

  const aligns = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  };

  const justifies = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
  };

  return (
    <div
      className={`
        flex
        ${directions[direction]}
        ${direction === 'column' ? spacings[spacing] : rowSpacings[spacing]}
        ${aligns[align]}
        ${justifies[justify]}
        ${wrap ? 'flex-wrap' : 'flex-nowrap'}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
