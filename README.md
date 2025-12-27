# CraveFit Recipe AI

A modern web application that generates personalized recipes with nutrition analysis using AI. Built with React/TypeScript frontend and Flask backend.

## Project Architecture

- **Frontend**: React with TypeScript, Vite, Tailwind CSS
- **Backend**: Flask with Python, Google Gemini AI integration
- **AI Service**: Google Gemini API for recipe generation

## Quick Start

### Prerequisites

- Node.js & npm (for frontend)
- Python 3.8+ (for backend)
- Google Gemini API key

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone <YOUR_GIT_URL>
   cd cravefit-recipe-ai-main
   ```

2. **Setup Frontend**

   ```bash
   # Install frontend dependencies
   npm install
   ```

3. **Setup Backend**

   ```bash
   # Navigate to backend directory
   cd backend

   # Install Python dependencies
   pip install -r requirements.txt

   # Copy and configure environment variables
   cp .env.example .env
   # Edit .env and add your GEMINI_API_KEY
   ```

4. **Run the Application**

   **Terminal 1 - Backend:**

   ```bash
   # From the backend directory
   python app.py
   ```

   **Terminal 2 - Frontend:**

   ```bash
   # From the root directory
   npm run dev
   ```

The application will be available at:

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`

## Features

- 🍳 **AI-Powered Recipe Generation**: Uses Google Gemini AI to create personalized recipes
- 📊 **Nutrition Analysis**: Provides detailed nutritional information for each recipe
- 🎯 **Meal Type Targeting**: Specialized recipes for breakfast, lunch, dinner, and snacks
- 🎨 **Modern UI**: Beautiful, responsive interface built with Tailwind CSS
- 🔊 **Voice Narration**: Hands-free cooking experience (coming soon)
- 📱 **Mobile Responsive**: Works seamlessly on all devices

## API Endpoints

### POST /generate-recipe

Generate a recipe using AI.

**Request:**

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
    "ingredients": [
      "1 cup oats",
      "1 banana",
      "1/2 cup berries",
      "1 cup milk",
      "1 tbsp honey"
    ],
    "instructions": ["Step 1", "Step 2", "..."],
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
  }
}
```

## Development

### Frontend Development

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Backend Development

```bash
cd backend
python app.py        # Start Flask development server
```

## Environment Variables

### Backend (.env)

```
GEMINI_API_KEY=your_gemini_api_key_here
FLASK_ENV=development
FLASK_DEBUG=True
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Project info

**URL**: https://lovable.dev/projects/d774a2de-d0bb-4252-852d-7f6a8f1396df

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/d774a2de-d0bb-4252-852d-7f6a8f1396df) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/d774a2de-d0bb-4252-852d-7f6a8f1396df) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
