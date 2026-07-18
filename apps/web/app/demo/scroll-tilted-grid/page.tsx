import { ScrollTiltedGrid } from "@workspace/ui/components/scroll-tilted-grid";

const images = [
  {
    src: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=85",
    alt: "Curved concrete facade in soft daylight",
  },
  {
    src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85",
    alt: "Sunlit modern interior with warm timber details",
  },
  {
    src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=85",
    alt: "Minimal white house framed by a clear sky",
  },
  {
    src: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=85",
    alt: "Quiet residential facade surrounded by trees",
  },
  {
    src: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=85",
    alt: "Calm apartment interior in a neutral palette",
  },
  {
    src: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?auto=format&fit=crop&w=1200&q=85",
    alt: "Bright workspace with white walls and natural wood",
  },
  {
    src: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=85",
    alt: "Open studio with long tables and tall windows",
  },
  {
    src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85",
    alt: "Refined office lounge with dark metal framing",
  },
  {
    src: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1200&q=85",
    alt: "Modern living room with layered neutral textures",
  },
  {
    src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=85",
    alt: "Geometric concrete architecture viewed from below",
  },
  {
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85",
    alt: "Contemporary workspace with glass partitions",
  },
  {
    src: "https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?auto=format&fit=crop&w=1200&q=85",
    alt: "Airy creative studio filled with daylight",
  },
];

export default function ScrollTiltedGridDemoPage() {
  return (
    <main className="relative min-h-screen">
      <style>{`
        html, body {
          scrollbar-width: none;
          -ms-overflow-style: none;
          background: transparent !important;
        }
        html::-webkit-scrollbar, body::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <ScrollTiltedGrid images={images} />
    </main>
  );
}
