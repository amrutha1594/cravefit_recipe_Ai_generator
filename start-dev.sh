#!/bin/bash

echo "🚀 Starting CraveFit Recipe AI Application"
echo "=========================================="

# Function to cleanup processes on exit
cleanup() {
    echo "🛑 Shutting down servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit 0
}

# Set up cleanup on script exit
trap cleanup EXIT INT TERM

# Start backend server
echo "🐍 Starting Flask backend server..."
cd backend
source venv/bin/activate 2>/dev/null || echo "⚠️  Virtual environment not found. Run ./setup-dev.sh first"
python app.py &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 3

# Start frontend server
echo "⚛️  Starting React frontend server..."
npm run dev &
FRONTEND_PID=$!

echo "✅ Application started successfully!"
echo "🌐 Frontend: http://localhost:5173"
echo "🔧 Backend API: http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for user to stop
wait
