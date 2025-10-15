
'use client';

import React, { useState, type ComponentProps } from 'react';
import NextImage from 'next/image';
import { cn } from '@/lib/utils';
import { ImageOff } from 'lucide-react'; // Import an icon for the placeholder

// Extend the props of the standard next/image component
// Remove fallbackSrc prop
interface ImageWithFallbackProps extends Omit<ComponentProps<typeof NextImage>, 'onError'> {
   // Add original onError back if needed for external handling
   onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
   placeholderClassName?: string; // Optional class for the placeholder container
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  onError,
  className,
  placeholderClassName,
  alt = "Image", // Provide a default alt text
  ...props
}) => {
  const [showNotFound, setShowNotFound] = useState(false);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // Only show the placeholder if the primary image fails
    if (!showNotFound) {
        console.warn(`Image failed to load: ${src}. Displaying placeholder.`);
        setShowNotFound(true);
    }
    // Call the original onError handler if provided
    if (onError) {
      onError(e);
    }
  };

  if (showNotFound) {
    // Render a placeholder when the image fails to load
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-muted text-muted-foreground aspect-square w-full h-full',
          placeholderClassName, // Apply custom placeholder styles
          className // Also apply general image classes for layout consistency
        )}
        style={props.style} // Apply inline styles if provided
        // Mimic layout behavior if 'fill' is used
        {...(props.fill && { style: { ...props.style, position: 'absolute', inset: 0 } })}
      >
        <div className="flex flex-col items-center text-center p-2">
           <ImageOff className="w-1/4 h-1/4 mb-1 text-destructive" />
           <span className="text-xs sm:text-sm">Not Found</span>
        </div>
      </div>
    );
  }

  // Render the NextImage component if no error
  return (
    <NextImage
      src={src}
      onError={handleError}
      className={className}
      alt={alt} // Ensure alt text is always present
      {...props}
    />
  );
};

export default ImageWithFallback;
