# Baatein — Real-time Chat App

**बातें** - Where conversations flow naturally

A modern, full-stack real-time chat application built with **Next.js**, **TypeScript**, **Socket.IO**, and **Tailwind CSS**.

## ✨ Features

- ✅ **Real-time messaging** with WebSockets (Socket.IO)
- ✅ **Room-based conversations** - join different chat rooms
- ✅ **Chat history** for new joiners (stored in memory)
- ✅ **TypeScript** for type safety
- ✅ **Modern UI** with Tailwind CSS and dark theme
- ✅ **Copy message functionality** with hover effects
- ✅ **Mobile-responsive design**
- ✅ **SEO optimized** with Next.js SSR
- ✅ **Zero cold starts** when deployed to Vercel

## 🚀 Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API routes + Custom server with Socket.IO
- **Real-time**: Socket.IO for WebSocket communication
- **Styling**: Tailwind CSS with dark theme
- **Deployment**: Ready for Vercel (free hosting)

## 🛠 Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone and install dependencies:**
```bash
git clone <your-repo>
cd baatein
npm install
```

2. **Start development server:**
```bash
npm run dev
```

3. **Open your browser:**
Navigate to `http://localhost:3000`

### Project Structure
```
app/
├── api/
│   └── health/          # Health check endpoint
├── hooks/
│   └── useSocket.ts     # Custom Socket.IO hook
├── layout.tsx           # Root layout with metadata
├── page.tsx             # Main chat component
└── globals.css          # Global styles
server.js                # Custom Next.js server with Socket.IO (ES modules)
backup-express/          # Original Express version backup
```

## 🌐 Deployment

### Vercel (Recommended - Free)

1. **Push to GitHub:**
```bash
git add .
git commit -m "Next.js migration complete"
git push origin nextjs-migration
```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js and deploy
   - **Important**: Set build command to `npm run build` and start command to `npm start`

3. **Custom Server Setup:**
Since we use a custom server with Socket.IO, you might need to:
   - Add `vercel.json` configuration for serverless functions
   - Or use Vercel's Edge Runtime (recommended for real-time apps)

### Alternative Platforms
- **Railway**: Great for full-stack apps with WebSockets
- **Render**: Free tier with custom server support
- **Heroku**: Classic choice for Node.js apps

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file:
```bash
NODE_ENV=development
PORT=3000
```

### Socket.IO Configuration
The Socket.IO server is configured in `server.js`:
- CORS enabled for all origins (adjust for production)
- WebSocket and polling transports
- Room-based message storage in memory

## 🎯 What's Different from Express Version

### ✅ Improvements:
- **Better SEO** with Next.js server-side rendering
- **Type safety** with TypeScript throughout
- **Modern React** with hooks and functional components
- **Better styling** with Tailwind CSS utility classes
- **Component architecture** for maintainability
- **Free hosting** on Vercel with zero cold starts
- **Built-in optimizations** (code splitting, image optimization, etc.)

### 🔄 Migration Benefits:
- Same core functionality as Express version
- Better developer experience
- Production-ready with minimal configuration
- Easier to add features like authentication, database, etc.

## 🚀 Next Steps

Now that you have a solid Next.js foundation, you can easily add:

1. **Database Integration** (MongoDB, PostgreSQL)
2. **User Authentication** (NextAuth.js)
3. **File Upload** for images
4. **Push Notifications**
5. **User Presence** indicators
6. **Message Reactions**
7. **Private Messages**
8. **Voice/Video Calls** (WebRTC)

## 🐛 Troubleshooting

### Common Issues:

1. **Socket.IO not connecting:**
   - Make sure you're using the custom server (`npm run dev`)
   - Check browser console for connection errors

2. **TypeScript errors:**
   - Run `npm run lint` to check for issues
   - Ensure all dependencies are installed

3. **Styling not loading:**
   - Restart the development server
   - Check Tailwind CSS configuration

## 📝 License

MIT License - feel free to use this for learning or building your own chat applications!

**Baatein** - बातें - Where every conversation matters! 💬
