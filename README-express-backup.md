# 🥗 Salad Room - Real-time Chat App

A simple, real-time chat application built with Node.js, Express, and Socket.IO. Features include real-time messaging, chat history, and room-based conversations.

## Features

- ✅ Real-time messaging with WebSockets
- ✅ Chat history for new joiners (stored in memory)
- ✅ Multiple chat rooms
- ✅ User names and timestamps
- ✅ Preserves message formatting (spaces, line breaks)
- ✅ Mobile-responsive design
- ✅ No database required

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

3. Open your browser and go to `http://localhost:4000`

## Deployment

### Option 1: Deploy to Render (Free)

1. Create a GitHub repository and push your code
2. Go to [render.com](https://render.com) and sign up
3. Click "New" → "Web Service"
4. Connect your GitHub repo
5. Use these settings:
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Deploy!

### Option 2: Deploy to Railway (Free)

1. Create a GitHub repository and push your code
2. Go to [railway.app](https://railway.app) and sign up
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway will auto-detect Node.js and deploy

### Option 3: Deploy to Heroku

1. Create a GitHub repository and push your code
2. Create a Heroku app
3. Connect GitHub repo to Heroku
4. Deploy from the Heroku dashboard

## Usage

1. Enter your name and a room name
2. Click "Join Chat" to connect
3. Start chatting! 
4. Share the room name with friends so they can join the same room
5. New joiners will automatically see the chat history

## Tech Stack

- **Backend**: Node.js, Express, Socket.IO
- **Frontend**: Vanilla HTML, CSS, JavaScript
- **Real-time**: WebSocket communication
- **Storage**: In-memory (resets on server restart)

## Environment Variables

- `PORT`: Server port (default: 4000)
- `NODE_ENV`: Environment (development/production)

## License

MIT License
