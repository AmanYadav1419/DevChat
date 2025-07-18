💬 DevChat — Real-Time Developer Chat App
DevChat is a full-stack, real-time messaging application designed for developers to collaborate, communicate, and code together. Built using FastAPI, React, and WebSockets, it supports seamless multi-user communication with typing indicators and real-time updates.

🔗 Live Demo
🚀 Try DevChat Live (Update with actual link)

📌 Features
🔁 Real-time Messaging with WebSockets

👥 Multi-user Chat Support

✍️ Typing Indicators for active users

🧩 Modular Backend API using FastAPI

⚛️ Interactive UI with React.js

📦 Docker-ready setup for production

🛠️ Tech Stack
Frontend
React.js

Tailwind CSS

Socket.IO-client

Backend
FastAPI

WebSockets (Starlette)

Uvicorn

Docker

🔧 Project Architecture
bash
Copy
Edit
DevChat/
│
├── backend/
│   ├── main.py            # FastAPI WebSocket server
│   ├── chat_manager.py    # Connection handling & messaging logic
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx        # React app entry
│   │   ├── ChatRoom.jsx   # Real-time chat UI
│   │   └── socket.js      # WebSocket client setup
│   └── Dockerfile
│
└── docker-compose.yml     # Combined deployment
🚀 How to Run
🔧 Backend (FastAPI)
bash
Copy
Edit
cd backend
python -m venv env
source env/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
🌐 Frontend (React)
bash
Copy
Edit
cd frontend
npm install
npm start
🐳 Docker Setup (Full Stack)
bash
Copy
Edit
docker-compose up --build
Then visit: http://localhost:3000

📸 Screenshots (Optional)
Include screenshots or gifs of:

Chatroom UI

Typing indicator in action

Docker deployment

📄 License
This project is licensed under the MIT License.

👨‍💻 Author
Ankur Ahire
🔗 GitHub | LinkedIn
