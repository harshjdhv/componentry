#!/usr/bin/env python3
"""
Fully automated preview video uploader for Componentry.

Takes a video from the `temporary` root folder, then:
  1. Reads the registry to find the component's category
  2. Converts the video to optimized WebM + MP4 + WebP poster
  3. Uploads all assets to Cloudflare R2
  4. Automatically updates the registry's previewVideo URL
  5. Prints the final public URL

All credentials are read from the .env file at the repo root.

Edit the variables below before running, or pass them as arguments:
    python scripts/auto-upload-preview.py recording.mov component-slug
"""
import os
import re
import subprocess
import sys
from pathlib import Path

# ===========================================================================
# EDIT THESE VARIABLES FOR EACH UPLOAD
# ===========================================================================
VIDEO_FILENAME = "result.mp4"
COMPONENT_SLUG = "heatmap-logo"
# ===========================================================================

# ---------------------------------------------------------------------------
# Load .env manually (no third-party deps needed)
# ---------------------------------------------------------------------------
REPO_ROOT = Path(__file__).resolve().parent.parent
ENV_FILE = REPO_ROOT / ".env"
TEMPORARY_DIR = REPO_ROOT / "temporary"


def load_env(env_path: Path) -> dict[str, str]:
    """Parse a .env file and return a dict of key=value pairs."""
    env_vars: dict[str, str] = {}
    if not env_path.exists():
        return env_vars
    for line in env_path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        if "=" not in line:
            continue
        key, _, value = line.partition("=")
        env_vars[key.strip()] = value.strip()
    return env_vars


ENV = load_env(ENV_FILE)


def env(key: str) -> str:
    """Get a required env var, falling back to os.environ."""
    value = ENV.get(key) or os.environ.get(key)
    if not value:
        print(f"Error: {key} is not set in .env or environment")
        sys.exit(1)
    return value


# ---------------------------------------------------------------------------
# R2 config (from .env)
# ---------------------------------------------------------------------------
ACCOUNT_ID = env("R2_ACCOUNT_ID")
ACCESS_KEY_ID = env("R2_ACCESS_KEY_ID")
SECRET_ACCESS_KEY = env("R2_SECRET_ACCESS_KEY")
BUCKET_NAME = env("R2_BUCKET_NAME")
PUBLIC_URL = env("R2_PUBLIC_URL")

# ---------------------------------------------------------------------------
# Registry config
# ---------------------------------------------------------------------------
REGISTRY_FILE = REPO_ROOT / "apps/web/registry/index.ts"

# Map component categories to R2 folder names
CATEGORY_TO_FOLDER: dict[str, str] = {
    "Text Animations": "text-animations",
    "Components": "component-animations",
    "Hero Backgrounds": "hero-backgrounds",
    "Visual Effects": "visual-effects",
}


# ---------------------------------------------------------------------------
# Registry helper
# ---------------------------------------------------------------------------
def find_component_category(slug: str) -> str | None:
    """Read registry/index.ts and return the category for the given slug."""
    content = REGISTRY_FILE.read_text(encoding="utf-8")
    # Find the block for this slug — looks like:
    #   "some-slug": {
    #     ...
    #     category: "Text Animations",
    #     ...
    #   },
    pattern = rf'"{re.escape(slug)}":\s*\{{[^}}]*?category:\s*"([^"]+)"'
    match = re.search(pattern, content, re.DOTALL)
    if match:
        return match.group(1)
    return None


def update_registry_preview_video(slug: str, url: str) -> bool:
    """Insert or update the previewVideo field for a component in the registry."""
    content = REGISTRY_FILE.read_text(encoding="utf-8")

    # Strategy 1: Component already has a previewVideo — replace it
    pattern_existing = (
        rf'("{re.escape(slug)}":\s*\{{[^}}]*?)(previewVideo:\s*\n\s*"[^"]*")'
    )
    match = re.search(pattern_existing, content, re.DOTALL)
    if match:
        old = match.group(2)
        new = f'previewVideo:\n      "{url}"'
        content = content.replace(old, new, 1)
        REGISTRY_FILE.write_text(content, encoding="utf-8")
        return True

    # Strategy 2: Component has no previewVideo — add it after the last known field
    # Find the component block and insert previewVideo before the closing },
    block_pattern = rf'("{re.escape(slug)}":\s*\{{)(.*?)(\n\s*\}})'
    block_match = re.search(block_pattern, content, re.DOTALL)
    if block_match:
        block_body = block_match.group(2)
        # Find the last line of the block body (before the closing brace)
        # and append previewVideo
        new_body = block_body.rstrip(",\n ") + ",\n    previewVideo:\n      " + f'"{url}",'
        new_block = block_match.group(1) + new_body + block_match.group(3)
        content = content[: block_match.start()] + new_block + content[block_match.end() :]
        REGISTRY_FILE.write_text(content, encoding="utf-8")
        return True

    return False


# ---------------------------------------------------------------------------
# R2 client
# ---------------------------------------------------------------------------
def get_r2_client():
    import boto3

    return boto3.client(
        "s3",
        endpoint_url=f"https://{ACCOUNT_ID}.r2.cloudflarestorage.com",
        aws_access_key_id=ACCESS_KEY_ID,
        aws_secret_access_key=SECRET_ACCESS_KEY,
    )


# ---------------------------------------------------------------------------
# FFmpeg helpers
# ---------------------------------------------------------------------------
def run_ffmpeg(input_path: Path, output_path: Path, args: list[str]) -> None:
    cmd = ["ffmpeg", "-y", "-i", str(input_path), *args, str(output_path)]
    print(f"  → {' '.join(cmd)}")
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)


def convert(input_video: Path, output_dir: Path) -> tuple[Path, Path, Path | None]:
    """Convert input video to optimized WebM, MP4, and WebP poster."""
    base = output_dir / input_video.stem
    webm = base.with_suffix(".webm")
    mp4 = base.with_suffix(".mp4")
    webp = base.with_suffix(".webp")

    common_video_filters = "scale='min(720,iw)':-2:flags=lanczos,fps=24"
    max_preview_seconds = "6"

    print("📹 Converting to WebM (VP9)...")
    run_ffmpeg(input_video, webm, [
        "-t", max_preview_seconds,
        "-vf", common_video_filters,
        "-an", "-c:v", "libvpx-vp9",
        "-row-mt", "1", "-deadline", "good", "-cpu-used", "4",
        "-crf", "38", "-b:v", "0", "-g", "48",
    ])

    print("📹 Converting to MP4 (H.264)...")
    run_ffmpeg(input_video, mp4, [
        "-t", max_preview_seconds,
        "-vf", common_video_filters,
        "-an", "-c:v", "libx264",
        "-preset", "veryfast", "-crf", "30",
        "-pix_fmt", "yuv420p",
        "-g", "48", "-keyint_min", "48",
        "-movflags", "+faststart",
    ])

    print("🖼️  Extracting WebP poster...")
    jpg = base.with_suffix(".jpg")
    try:
        run_ffmpeg(input_video, webp, [
            "-vf", "scale='min(1280,iw)':-2:flags=lanczos",
            "-frames:v", "1", "-q:v", "85",
        ])
    except subprocess.CalledProcessError:
        print("  ⚠ WebP poster extraction failed, falling back to JPEG.")
        webp = None

    poster: Path | None = webp
    if poster is None:
        try:
            run_ffmpeg(
                input_video,
                jpg,
                [
                    "-vf", "scale='min(1280,iw)':-2:flags=lanczos",
                    "-frames:v", "1", "-q:v", "4",
                ],
            )
            poster = jpg
        except subprocess.CalledProcessError:
             print("  ⚠ JPEG poster extraction also failed, skipping poster.")
             poster = None

    return webm, mp4, poster


# ---------------------------------------------------------------------------
# Upload
# ---------------------------------------------------------------------------
def content_type_for(path: Path) -> str:
    return {
        ".webm": "video/webm",
        ".mp4": "video/mp4",
        ".webp": "image/webp",
    }.get(path.suffix.lower(), "application/octet-stream")


def upload_file(client, local_path: Path, object_key: str) -> None:
    print(f"  ☁️  Uploading {local_path.name} → {object_key}")
    client.upload_file(
        str(local_path),
        BUCKET_NAME,
        object_key,
        ExtraArgs={
            "ContentType": content_type_for(local_path),
            "CacheControl": "public, max-age=31536000, immutable",
        },
    )


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
def main() -> int:
    video_filename = sys.argv[1] if len(sys.argv) > 1 else VIDEO_FILENAME
    slug = sys.argv[2] if len(sys.argv) > 2 else COMPONENT_SLUG

    input_video = TEMPORARY_DIR / video_filename

    if not input_video.exists():
        print(f"❌ Error: Video file not found → {input_video}")
        print(f"   Make sure to put your file at: {TEMPORARY_DIR}/{VIDEO_FILENAME}")
        return 1

    # ── Step 1: Resolve the component category ──
    print(f"🔍 Looking up component: {slug}")
    category = find_component_category(slug)
    if not category:
        print(f"❌ Error: Component '{slug}' not found in registry/index.ts")
        print("   Make sure the component is registered before uploading a preview.")
        return 1

    folder = CATEGORY_TO_FOLDER.get(category)
    if not folder:
        print(f"❌ Error: Unknown category '{category}' — no folder mapping defined.")
        return 1

    # Remove hyphens from slug for R2 key (matches existing convention)
    r2_name = slug.replace("-", "")
    r2_prefix = f"preview-videos/{folder}/{r2_name}"
    print(f"   Category: {category}")
    print(f"   R2 prefix: {r2_prefix}")
    print()

    # ── Step 2: Convert ──
    output_dir = input_video.parent / ".preview-upload-tmp"
    output_dir.mkdir(parents=True, exist_ok=True)

    webm, mp4, poster = convert(input_video, output_dir)
    print()

    # ── Step 3: Upload ──
    print("☁️  Uploading to Cloudflare R2...")
    s3 = get_r2_client()
    upload_file(s3, webm, f"{r2_prefix}.webm")
    upload_file(s3, mp4, f"{r2_prefix}.mp4")
    if poster:
        poster_suffix = poster.suffix.lower()
        upload_file(s3, poster, f"{r2_prefix}{poster_suffix}")
    print()

    # ── Step 4: Update registry ──
    preview_url = f"{PUBLIC_URL}/{r2_prefix}.webm"
    print(f"📝 Updating registry/index.ts...")
    if update_registry_preview_video(slug, preview_url):
        print(f"   ✅ Set previewVideo for '{slug}'")
    else:
        print(f"   ⚠ Could not auto-update registry. Please add manually:")
        print(f'     previewVideo: "{preview_url}",')
    print()

    # ── Step 5: Print summary ──
    print("═" * 60)
    print("✅ DONE! Public URLs:")
    print(f"   WebM : {PUBLIC_URL}/{r2_prefix}.webm")
    print(f"   MP4  : {PUBLIC_URL}/{r2_prefix}.mp4")
    if poster:
        poster_suffix = poster.suffix.lower()
        print(f"   Image: {PUBLIC_URL}/{r2_prefix}{poster_suffix}")
    print()
    print(f"   Registry previewVideo → {preview_url}")
    print("═" * 60)

    # ── Cleanup ──
    for f in [webm, mp4, poster]:
        if f and f.exists():
            f.unlink()
    try:
        output_dir.rmdir()
    except OSError:
        pass

    return 0


if __name__ == "__main__":
    sys.exit(main())
