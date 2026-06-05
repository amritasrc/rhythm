# Rhythm 🎵

**Rhythm** is a modern music player web application built with **React**, **TypeScript**, **Node.js**, and the **YouTube API**. Search for your favorite songs, explore music, and play tracks directly from YouTube through a clean and responsive interface.

---

## ✨ Features

* 🔍 Search songs using the YouTube Data API
* 🖼️ Display song thumbnails and details
* ▶️ Play music using the YouTube IFrame Player API
* ⏯️ Play and pause controls
* 📱 Fully responsive design
* ⚡ Fast and modern user experience

---

## 🛠️ Tech Stack

### Frontend

* React
* TypeScript
* Tailwind CSS
* React Router
* Axios

### Backend

* Node.js
* Express.js

### Database

* MongoDB

### APIs

* YouTube Data API v3
* YouTube IFrame Player API

---

## 📁 Project Structure

```bash
rhythm/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── App.tsx
│   │
│   └── public/
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── server.ts
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

* Node.js
* MongoDB
* YouTube API Key

---

### Clone the Repository

```bash
git clone https://github.com/ankitsensei/rhythm.git
cd rhythm
```

---

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

Create a `.env` file and add the following variables:

```env
VITE_YOUTUBE_API_KEY=your_youtube_api_key

MONGO_URI=your_mongodb_connection_string

PORT=5000
```

---

## ▶️ Running the Application

### Start Backend Server

```bash
cd server
npm run dev
```

### Start Frontend Application

```bash
cd client
npm run dev
```

Open your browser and visit:

```txt
http://localhost:5173
```

---

## 🎯 Future Improvements

* User Authentication
* Liked Songs
* Custom Playlists
* Recently Played Songs
* Listening History
* Recommendations
* Queue Management
* Shuffle & Repeat Controls

---

## ⚠️ Disclaimer

Rhythm uses YouTube APIs for music discovery and playback. All media content belongs to its respective owners. This project does not host or distribute copyrighted content.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

Feel free to fork the repository and submit a pull request.

---

<div align="center">

Made with ❤️ by **Ankit Bhagat**

</div>
