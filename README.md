# Open Salad - Simple Chat App

A simple real-time chat application built to learn **Socket.IO integration with Next.js**. Created for personal use and educational purposes.

## 🌟 The Story Behind Open Salad

**The Origin:** During an MS Azure class at college, me and my friends were sitting together using the college computers. We were sharing notes and text using "Salad Room" (an existing chat platform). That's when the idea suddenly clicked in my mind - **"Why not create our own Salad Room?"**

**The Journey:** Born out of pure curiosity and the desire to learn Socket.IO with Next.js, I decided to create our own version of a simple chat room. What started as a learning exercise turned into something we actually use for sharing notes and quick messages.

**The Reality:** This is a basic chat app with no database, no user accounts, and messages that disappear when the server restarts. It's purely for learning and personal use among friends.

> *Sometimes the best learning comes from building something you'll actually use, even if it's simple! 💡*

## 🎯 What This Project Is

A basic learning project that demonstrates:
- **Socket.IO integration** with Next.js
- **Real-time messaging** between users
- **Room-based conversations**
- **TypeScript** usage with WebSockets
- **Component-based architecture**

## ⚠️ What This Project Is NOT

- ❌ No database - messages are lost when server restarts
- ❌ No user authentication or accounts
- ❌ No message persistence
- ❌ No production-ready features
- ❌ Not suitable for real-world use

## ✨ Basic Features

- ✅ Real-time messaging while server is running
- ✅ Simple room-based conversations
- ✅ Basic UI with Tailwind CSS
- ✅ Copy message functionality
- ✅ Mobile-responsive design

## 🏗️ Architecture

### Component Structure
```
app/
├── components/           # Reusable UI components
│   ├── Header.tsx       # App header with title
│   ├── RoomControls.tsx # Join room form
│   ├── ChatLayout.tsx   # Main chat layout
│   ├── ChatMessages.tsx # Messages container with scrolling
│   ├── MessageBubble.tsx# Individual message component
│   ├── MessageInput.tsx # Message input field
│   ├── ConnectionInfo.tsx # User connection details
│   ├── HowToUse.tsx     # Usage instructions
│   └── Sidebar.tsx      # Right sidebar container
├── hooks/
│   └── useSocket.ts     # Socket.IO React hook
└── page.tsx             # Main chat room page
```

## 🚀 Simple Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **Real-time**: Socket.IO
- **Styling**: Tailwind CSS
- **Storage**: In-memory (temporary)
- **Deployment**: Vercel compatible

## 📚 What You Can Learn

If you're learning Socket.IO with Next.js, this project shows:
- Basic Socket.IO setup in Next.js
- Simple client-server WebSocket communication
- How to handle rooms and message broadcasting
- TypeScript with Socket.IO events
- Basic React patterns for real-time features

## 🛠 Running Locally

### Prerequisites
- Node.js 18+
- npm

### Installation

1. **Clone and install:**
```bash
git clone https://github.com/pranav89624/open-salad.git
cd open-salad
npm install
```

2. **Start development:**
```bash
npm run dev
```

3. **Open browser:**
Go to `http://localhost:3000`

That's it! No database setup, no environment variables needed.

## ⚠️ Important Notes

**This is a learning project created for personal use:**

- 📝 Messages are stored in **memory only** - they disappear when server restarts
- 🔒 **No user authentication** - anyone can join with any name
- 💾 **No database** - nothing is saved permanently
- 🚫 **Not production ready** - missing security, validation, etc.
- 🎓 **For learning only** - demonstrates basic Socket.IO concepts

## 🚀 Want to Make It Better?

If you want to build a real chat app, you'd need to add:

1. **Database** (MongoDB, PostgreSQL, etc.)
2. **User authentication** (login/signup)
3. **Message persistence**
4. **Input validation and security**
5. **Rate limiting**
6. **Error handling**
7. **User management**

---

**Open Salad** - A simple learning project that actually gets used! 💬
