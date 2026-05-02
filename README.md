# ⚡ ClipBoost

> **Turn 1 Video Into 10 Viral Clips** — A modern SaaS content repurposing tool for creators and small businesses.

![ClipBoost Banner](https://via.placeholder.com/1200x400/0f0a1e/a855f7?text=ClipBoost+%E2%80%94+Content+Repurposing+Tool)

## ✨ Features

- 🎬 **Drag & Drop Upload** — Upload MP4, WebM, MOV, AVI (up to 500MB)
- 📱 **Vertical Conversion** — Smart center-crop to 9:16 (Reels/Shorts/TikTok)
- ✂️ **Video Trimming** — Dual-handle slider for precise cuts
- 💬 **Auto Captions** — Text overlay via FFmpeg drawtext filter
- 🎵 **Audio Extraction** — High-quality MP3 output
- ✨ **Glassmorphism UI** — Dark theme with purple/blue gradients
- 🚀 **60fps Animations** — Framer Motion throughout
- 🔔 **Toast Notifications** — Success/error feedback via Sonner

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15 (App Router) + TypeScript |
| Styling | Tailwind CSS + ShadCN UI |
| Animations | Framer Motion 11 |
| State | Zustand 5 |
| Processing | FFmpeg (external VPS) |
| Deployment | Vercel + Node.js VPS |

## 🚀 Quick Start

```bash
git clone https://github.com/yourname/clipboost.git
cd clipboost
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Structure

```
clipboost/
├── app/               # Next.js App Router pages + API routes
├── components/        # React components (landing + dashboard + ui)
├── lib/               # Utilities, Zustand store, FFmpeg helpers
└── public/            # Static assets
```

## 🔧 Environment Variables

Copy `.env.example` to `.env.local` and fill in:

- `NEXT_PUBLIC_APP_URL` — Your deployment URL
- `FFMPEG_SERVER_URL` — External VPS running FFmpeg server
- `FFMPEG_SERVER_SECRET` — Shared secret for VPS auth
- `BLOB_READ_WRITE_TOKEN` — Vercel Blob token (or use AWS S3)

## 📦 Deploy

**Frontend (Vercel):**
```bash
vercel --prod
```

**FFmpeg Server (VPS):**
```bash
pm2 start server.js --name clipboost-ffmpeg
```

See the included `ClipBoost_Developer_Guide.pdf` for detailed deployment instructions.

## 📄 License

MIT — see [LICENSE](LICENSE) for details.

---

Built with ❤️ for creators · [clipboost.app](https://clipboost.app)
