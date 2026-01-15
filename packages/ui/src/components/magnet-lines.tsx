"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface MagnetLinesProps {
    rows?: number;
    columns?: number;
    containerSize?: string;
    lineColor?: string;
    lineWidth?: string;
    lineHeight?: string;
    baseAngle?: number;
    className?: string;
    style?: React.CSSProperties;
}

export function MagnetLines({
    rows = 9,
    columns = 9,
    containerSize = "80vmin",
    lineColor = "#efefef",
    lineWidth = "1vmin",
    lineHeight = "6vmin",
    baseAngle = 0,
    className = "",
    style = {},
}: MagnetLinesProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    // Spans the grid
    const total = rows * columns;
    const spans = Array.from({ length: total }, (_, i) => i);

    return (
        <div
            ref={containerRef}
            className={`relative grid place-items-center ${className}`}
            style={{
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gridTemplateRows: `repeat(${rows}, 1fr)`,
                width: containerSize,
                height: containerSize,
                ...style,
            }}
        >
            {spans.map((i) => (
                <Line
                    key={i}
                    containerRef={containerRef}
                    lineColor={lineColor}
                    lineWidth={lineWidth}
                    lineHeight={lineHeight}
                    baseAngle={baseAngle}
                />
            ))}
        </div>
    );
}

function Line({
    containerRef,
    lineColor,
    lineWidth,
    lineHeight,
    baseAngle,
}: {
    containerRef: React.RefObject<HTMLDivElement | null>;
    lineColor: string;
    lineWidth: string;
    lineHeight: string;
    baseAngle: number;
}) {
    const lineRef = useRef<HTMLDivElement>(null);
    const [rotate, setRotate] = useState(baseAngle);

    useEffect(() => {
        const updateRotation = (e: MouseEvent) => {
            if (!lineRef.current || !containerRef.current) return;

            const rect = lineRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const mouseX = e.clientX;
            const mouseY = e.clientY;

            const distanceX = mouseX - centerX;
            const distanceY = mouseY - centerY;

            const angle = (Math.atan2(distanceY, distanceX) * 180) / Math.PI;

            setRotate(angle + baseAngle);
        };

        window.addEventListener("mousemove", updateRotation);
        return () => window.removeEventListener("mousemove", updateRotation);
    }, [baseAngle, containerRef]);

    return (
        <motion.div
            ref={lineRef}
            animate={{ rotate }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            style={{
                width: lineWidth,
                height: lineHeight,
                backgroundColor: lineColor,
            }}
        />
    );
}
