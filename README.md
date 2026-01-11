# AI Flow Visualiser

A fullstack MERN application that visualises AI prompt-response intereactions using ReactFlow.

## Live Demo

- **Frontend** : [https://askaiflow.netlify.app/](https://askaiflow.netlify.app/)
- **Backend** :[https://futureblink-mern-task-46nf.onrender.com](https://futureblink-mern-task-46nf.onrender.com)

## Video Demo

- Youtube Link - [AI Flow Visualizer](https://youtu.be/qHhl8y3zNwA)

## Features

- ✅ **Interactive Flow Visualization** - Visual representation of AI interactions using React Flow
- ✅ **Real-time AI Responses** - Integration with OpenRouter API (Gemini 2.0 Flash Lite)
- ✅ **Data Persistence** - Save and retrieve interactions from MongoDB
- ✅ **Responsive UI** - Modern design with Tailwind CSS
- ✅ **Loading States** - Visual feedback during API calls
- ✅ **Error Handling** - Comprehensive error messages and validation
- ✅ **Animated Connections** - Dynamic edge animations during processing
- ✅ **Reset Functionality** - Clear all data and start fresh

## Tech Stack

### Frontend

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Flow** (@xyflow/react) - Flow diagram visualization
- **Tailwind CSS** - Utility-first styling
- **Sonner** - Notification Library
- **Axios** - API integration library

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB

### APIs & Services

- **OpenRouter API** - AI text generation
- **MongoDB Atlas** - Cloud database hosting
- **Netlify** - Frontend hosting
- **Render** - Backend hosting

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/sandesh-dalvi/futureblink-mern-task.git
cd futureblink-mern-task
```

### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your credentials
nano .env
```

**Configure `.env` file:**

```env
PORT=5000

MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-flow-db?retryWrites=true&w=majority
OPENROUTER_API_KEY=sk-or-your-api-key-here
OPENROUTER_URL="https://openrouter.ai/api/v1/chat/completions"
OPENROUTER_MODEL=add-openrouter-free-model-here
CLIENT_URL=http://localhost:5173
PORT=5000
NODE_ENV=development
```

### 3. Frontend Setup

```bash
# Navigate to client directory (from root)
cd client

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env
nano .env
```

**Configure `.env` file:**

```env
VITE_API_URL=http://localhost:5000
```

### 4. Run the Application

**Terminal 1 - Backend:**

```bash
cd server
npm run dev
```

Server runs on `http://localhost:5000`

**Terminal 2 - Frontend:**

```bash
cd client
npm run dev
```

Frontend runs on `http://localhost:5173`

Open your browser and navigate to `http://localhost:3000`

## 📁 Project Structure

```
ai-flow-visualizer/
├── client/                      # Frontend React Application
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── AIFlow.jsx
│   │   │   └── InputNode.jsx
│   │   │   └── ResultNode.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env
│   ├── package.json
│   ├── vite.config.js
│
├── server/                      # Backend Node Application
│   ├── db/
│   │   └── connect.js
│   ├── models/
│   │   └── Interaction.js
│   ├── routes/
│   │   └── interaction.js
│   ├── controllers/
│   │   └── interaction.js
│   ├── app.js
│   ├── .env
│   └── package.json
│
├── .gitignore
└── README.md
```

## 🔌 API Endpoints

### Testing Backend

```http
GET /api/test
```

Returns server status

### Ask AI

```http
POST /api/ask-ai
Content-Type: application/json

{
  "prompt": "What is the capital of France?"
}
```

**Response:**

```json
{
  "response": "The capital of France is Paris."
}
```

### Save Interaction

```http
POST /api/save-interaction
Content-Type: application/json

{
  "prompt": "What is the capital of France?",
  "response": "The capital of France is Paris."
}
```

**Response:**

```json
{
  "message": "Interaction saved successfully",
  "data": {
    "_id": "...",
    "prompt": "...",
    "response": "...",
    "createdAt": "..."
  }
}
```

### Get All Interactions

```http
GET /api/interactions
```

**Response:**

```json
[
  {
    "_id": "...",
    "prompt": "...",
    "response": "...",
    "createdAt": "..."
  }
]
```
