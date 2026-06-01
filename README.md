````md
# Rhythm 🎵

Rhythm is a full-stack music streaming web application powered by the YouTube API. Users can discover music, create playlists, like tracks, view listening history, and enjoy a modern music-player experience—all from a clean and responsive interface.

## ✨ Features

### 🎧 Music Playback
- Search songs using YouTube API
- Play, pause, skip, and resume tracks
- Queue management
- Volume control
- Progress tracking
- Shuffle and repeat modes

### 👤 User Accounts
- User registration and login
- Secure authentication with JWT
- Password hashing with bcrypt
- Protected routes

### ❤️ Personalized Experience
- Like and unlike songs
- Save favorite tracks
- Recently played songs
- Listening history

### 📂 Playlists
- Create custom playlists
- Add/remove songs
- Edit playlist details
- Public playlist sharing

### 🎯 Recommendations
- Personalized recommendations based on:
  - Liked songs
  - Listening history
  - Frequently played artists

### 📱 Responsive Design
- Desktop support
- Tablet support
- Mobile-friendly interface

---

## 🏗️ Tech Stack

### Frontend
- React
- React Router
- Context API / Redux Toolkit
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Authentication
- JWT (JSON Web Tokens)
- bcrypt

### External APIs
- YouTube Data API v3
- YouTube IFrame Player API

---

## 📁 Project Structure

```bash
rhythm/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── context/
│   │   ├── services/
│   │   ├── layouts/
│   │   └── App.jsx
│   │
│   └── public/
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── models/
│   ├── services/
│   ├── utils/
│   └── server.js
│
├── README.md
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js
- MongoDB
- YouTube API Key

### Clone the Repository

```bash
git clone https://github.com/ankitsensei/rhythm.git
cd rhythm
```

### Install Dependencies

#### Frontend

```bash
cd client
npm install
```

#### Backend

```bash
cd ../server
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file inside the server directory.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

YOUTUBE_API_KEY=your_youtube_api_key
```

---

## ▶️ Running the Project

### Start Backend

```bash
cd server
npm run dev
```

### Start Frontend

```bash
cd client
npm run dev
```

The application should now be running locally.

---

## 📌 Roadmap

### Phase 1
- [x] Authentication
- [x] Search songs
- [x] Music player
- [x] Like songs
- [x] Playlists

### Phase 2
- [x] Recently played
- [x] Listening history
- [x] Queue management
- [x] Shuffle & repeat

### Phase 3
- [x] Playlist sharing
- [x] Public profiles
- [x] Follow users

### Phase 4
- [x] Smart recommendations
- [x] Trending tracks
- [x] AI-powered discovery

---

## ⚠️ Disclaimer

Rhythm uses YouTube APIs for music discovery and playback. All media content belongs to its respective owners. This project does not host, store, or redistribute copyrighted audio content.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

Feel free to fork the project and submit a pull request.

---


Made with ❤️ by Ankit Bhagat
````

```md
# Rhythm 🎵

Discover, play, and organize your favorite music with a seamless YouTube-powered listening experience.
```
