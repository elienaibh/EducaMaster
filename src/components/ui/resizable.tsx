import * as React from 'react';
import { GripVertical } from 'lucide-react';

import { cn } from '@/lib/utils';

const ResizablePanel = ({
  defaultSize = 50,
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  defaultSize?: number;
}) => {
  return (
    <div
      className={cn('relative flex h-full w-full', className)}
      style={{ '--default-size': `${defaultSize}%` } as React.CSSProperties}
      {...props}
    >
      {children}
    </div>
  );
};

const ResizablePanelGroup = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn('flex h-full w-full', className)} {...props}>
      {children}
    </div>
  );
};

const ResizableHandle = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        'relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full',
        className
      )}
      {...props}
    >
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-background">
        <GripVertical className="h-2.5 w-2.5" />
      </div>
    </div>
  );
};

export { ResizablePanel, ResizablePanelGroup, ResizableHandle };
