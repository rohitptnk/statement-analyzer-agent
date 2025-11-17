# Statement Analyzer Agent
Agent that analyzes bank statements, visualizes spending patterns, and delivers AI-powered financial insights.

## Setup Instructions

### 1. Clone the Repository
```
git clone https://github.com/rohitptnk/statement-analyzer-agent.git
cd statement-analyzer-agent
```
Create a conda environment, then:
```
pip install -r requirements.txt
```

### 2. Backend Setup (FastAPI)
```
cd backend
uvicorn app:app --reload
```

### 3. Frontend Setup (React/Vite)
Open a new terminal:
```
cd frontend
npm install
npm run dev
```
