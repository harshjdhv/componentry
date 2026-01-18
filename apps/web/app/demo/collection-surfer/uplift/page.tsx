"use client"

import { CollectionSurfer, CollectionItem } from "@workspace/ui/components/collection-surfer"

const DEMO_ITEMS: CollectionItem[] = [
    { id: 1, image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80", title: "HERITAGE 01" },
    { id: 2, image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80", title: "HERITAGE 02" },
    { id: 3, image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80", title: "HERITAGE 03" },
    { id: 4, image: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=800&q=80", title: "HERITAGE 04" },
    { id: 5, image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80", title: "HERITAGE 05" },
    { id: 6, image: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=800&q=80", title: "HERITAGE 06" },
    { id: 7, image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&q=80", title: "HERITAGE 07" },
    { id: 8, image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80", title: "HERITAGE 08" },
    { id: 9, image: "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=800&q=80", title: "HERITAGE 09" },
    { id: 10, image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800&q=80", title: "HERITAGE 10" },
    { id: 11, image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80", title: "HERITAGE 11" },
    { id: 12, image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80", title: "HERITAGE 12" },
    { id: 13, image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=800&q=80", title: "HERITAGE 13" },
    { id: 14, image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80", title: "HERITAGE 14" },
    { id: 15, image: "https://images.unsplash.com/photo-1496217590455-aa63a8350eea?w=800&q=80", title: "HERITAGE 15" },
    { id: 16, image: "https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=800&q=80", title: "HERITAGE 16" },
];

export default function CollectionSurferUpliftDemoPage() {
    return (
        <div className="w-full min-h-screen bg-black">
            <CollectionSurfer items={DEMO_ITEMS} variant="uplift" />
        </div>
    )
}
