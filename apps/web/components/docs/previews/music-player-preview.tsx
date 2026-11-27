"use client";

import * as React from "react";
import { MusicPlayer } from "@workspace/ui/components/music-player";

export function MusicPlayerPreview() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 p-4 sm:gap-12 sm:p-8">
      <MusicPlayer
        src="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        coverArt="https://i.scdn.co/image/ab67616d0000b27315ebbedaacef61af244262a8"
        className="w-full h-full max-w-sm"
      />
      <div className="text-center space-y-2">
        <h3 className="text-xl font-bold tracking-tight">Click the Record to Play</h3>
        <p className="text-sm text-muted-foreground w-64">
          Features a spinning record animation and a tonearm overlay.
        </p>
      </div>
    </div>
  );
}
