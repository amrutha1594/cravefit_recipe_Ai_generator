# CraveFit Recipe AI Backend

This is the Flask backend for the CraveFit Recipe AI application that handles recipe generation using Google's Gemini AI.

## Setup

1. **Install Python dependencies:**

   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. **Set up environment variables:**

   - Copy `.env.example` to `.env` if needed
   - Update the `GEMINI_API_KEY` with your actual API key

3. **Run the Flask server:**
   ```bash
   python app.py
   ```

The server will start on `http://localhost:5000`

## API Endpoints

### POST /generate-recipe

Generate a recipe using Gemini AI.

**Request Body:**

```json
{
  "recipeName": "Healthy Breakfast Bowl",
  "ingredients": "oats, banana, berries, milk, honey",
  "mealType": "breakfast"
}
```

**Response:**

```json
{
  "success": true,
  "recipe": {
    "name": "Healthy Breakfast Bowl",
    "mealType": "breakfast",
    "ingredients": ["1 cup oats", "1 banana", ...],
    "instructions": ["Step 1", "Step 2", ...],
    "cookingTime": "10 minutes",
    "servings": 2,
    "difficulty": "Easy",
    "nutrition": {
      "calories": 350,
      "protein": 12,
      "carbs": 65,
      "fat": 8,
      "fiber": 10,
      "sugar": 25
    }
  },
  "message": "Recipe generated successfully"
}
```

### GET /health

Health check endpoint.

**Response:**

```json
{
  "status": "healthy",
  "message": "Flask backend is running"
}
```

## Features

- **CORS enabled** for frontend integration
- **Error handling** for various scenarios
- **Structured response parsing** from Gemini AI
- **Environment variable configuration**
- **Comprehensive logging**
- **Input validation**

## Error Handling

The API handles various error scenarios:

- Missing or invalid input data
- Gemini API overload (503 errors)
- Network timeouts
- General API errors

## Development

To run in development mode:

```bash
export FLASK_ENV=development
export FLASK_DEBUG=True
python app.py
```
