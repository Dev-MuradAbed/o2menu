// components/ui/optimized-image.tsx
"use client";

import Image from "next/image";
import { useState } from "react";

interface OptimizedImageProps {
    src: string;
    alt: string;
    fill?: boolean;
    width?: number;
    height?: number;
    className?: string;
    priority?: boolean;
    sizes?: string;
}

export function OptimizedImage({
    src,
    alt,
    fill,
    width,
    height,
    className = "",
    priority = false,
    sizes,
}: OptimizedImageProps) {
    const [imgSrc, setImgSrc] = useState(src);
    const [isLoading, setIsLoading] = useState(true);

    const handleError = () => {
        // Fallback image
        setImgSrc("/images/placeholder.jpg");
    };

    return (
        <div className={`relative ${fill ? "w-full h-full" : ""}`}>
            <Image
                src={imgSrc}
                alt={alt}
                fill={fill}
                width={!fill ? width : undefined}
                height={!fill ? height : undefined}
                className={`transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"
                    } ${className}`}
                onLoadingComplete={() => setIsLoading(false)}
                onError={handleError}
                priority={priority}
                sizes={sizes}
                quality={85}
            />
            {isLoading && (
                <div className="absolute inset-0 bg-muted animate-pulse" />
            )}
        </div>
    );
}