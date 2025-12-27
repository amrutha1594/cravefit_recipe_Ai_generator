# CraveFit Recipe AI - Setup Guide

## What's Been Created

### Backend Structure

```
backend/
├── app.py                 # Flask application with Gemini AI integration
├── requirements.txt       # Python dependencies
├── .env                   # Environment variables (with your API key)
├── .env.example          # Example environment file
├── README.md             # Backend documentation
└── test_backend.py       # Backend testing script
```

### Frontend Changes

- Updated `RecipeForm.tsx` to use Flask backend API instead of direct Gemini calls
- Added `config/config.ts` for centralized configuration
- Removed client-side API key exposure for better security

### Scripts Created

- `setup-dev.sh` - Complete development environment setup
- `start-dev.sh` - Start both backend and frontend servers
- `start-backend.sh` - Start only the backend server

## Quick Start

### 1. Setup (Run Once)

```bash
# Make scripts executable and run setup
chmod +x setup-dev.sh start-dev.sh start-backend.sh
./setup-dev.sh
```

### 2. Start Development Servers

```bash
# Option 1: Start both servers with one command
./start-dev.sh

# Option 2: Start separately
# Terminal 1 - Backend
cd backend
source venv/bin/activate
python app.py

# Terminal 2 - Frontend
npm run dev
```

### 3. Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- API Health Check: http://localhost:5000/health

## Key Features Implemented

### Backend (Flask)

- ✅ **CORS enabled** - Frontend can communicate with backend
- ✅ **Error handling** - Comprehensive error responses
- ✅ **Environment variables** - Secure API key management
- ✅ **Structured responses** - Consistent API format
- ✅ **Input validation** - Validates recipe generation requests
- ✅ **Logging** - Debug and error logging
- ✅ **Health check** - Monitor backend status

### Frontend Updates

- ✅ **Backend integration** - Uses Flask API instead of direct Gemini calls
- ✅ **Better error handling** - Handles backend connection issues
- ✅ **Configuration management** - Centralized API URLs
- ✅ **Security improved** - No client-side API key exposure

## API Endpoints

### POST /generate-recipe

```json
{
  "recipeName": "Healthy Breakfast Bowl",
  "ingredients": "oats, banana, berries, milk, honey",
  "mealType": "breakfast"
}
```

### GET /health

```json
{
  "status": "healthy",
  "message": "Flask backend is running"
}
```

## Environment Variables

Your Gemini API key is already configured in `backend/.env`:

```
GEMINI_API_KEY=AIzaSyBbwwBzF-lUPq9lTqRzLTumxTHEzgWYh1s
```

## Troubleshooting

### Backend Issues

- **Import errors**: Run `pip install -r requirements.txt` in backend directory
- **Port conflicts**: Change port in `app.py` if 5000 is occupied
- **API key errors**: Verify your Gemini API key in `backend/.env`

### Frontend Issues

- **React errors**: The React import issue should resolve once the backend is running
- **Connection errors**: Ensure backend is running on port 5000
- **Build errors**: Run `npm install` to ensure all dependencies are installed

### CORS Issues

- CORS is already configured in the Flask backend
- If you still see CORS errors, check that both servers are running on the correct ports

## Next Steps

1. **Run the setup script**: `./setup-dev.sh`
2. **Start the application**: `./start-dev.sh`
3. **Test the recipe generation** by creating a recipe in the UI
4. **Monitor the backend logs** for any API issues

## File Structure Summary

```
cravefit-recipe-ai-main/
├── backend/                 # Flask backend
│   ├── app.py              # Main Flask application
│   ├── requirements.txt    # Python dependencies
│   └── .env               # Environment variables
├── src/
│   ├── components/
│   │   └── RecipeForm.tsx  # Updated to use backend API
│   └── config/
│       └── config.ts       # API configuration
├── setup-dev.sh           # Development setup script
├── start-dev.sh           # Start both servers
└── README.md              # Updated documentation
```

The application is now properly structured with a secure backend API and will work much better than the previous client-side approach!
