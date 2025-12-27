from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json
import os
from dotenv import load_dotenv
import logging

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Gemini API configuration
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY', 'AIzaSyBbwwBzF-lUPq9lTqRzLTumxTHEzgWYh1s')
GEMINI_API_URL = f'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_API_KEY}'

def parse_recipe_response(text, recipe_name, meal_type):
    """Parse the AI response into a structured recipe object"""
    lines = text.split('\n')
    recipe = {
        'name': recipe_name,
        'mealType': meal_type,
        'ingredients': [],
        'instructions': [],
        'cookingTime': '30 minutes',
        'servings': 4,
        'difficulty': 'Medium',
        'nutrition': {
            'calories': 0,
            'protein': 0,
            'carbs': 0,
            'fat': 0,
            'fiber': 0,
            'sugar': 0
        }
    }

    current_section = ''
    
    for line in lines:
        line = line.strip()
        
        if line.startswith('Recipe Name:'):
            recipe['name'] = line.replace('Recipe Name:', '').strip()
        elif line.startswith('Ingredients:'):
            current_section = 'ingredients'
        elif line.startswith('Steps:'):
            current_section = 'steps'
        elif line.startswith('Nutrition Analysis:'):
            current_section = 'nutrition'
        elif line.startswith('Cooking Time:'):
            recipe['cookingTime'] = line.replace('Cooking Time:', '').strip()
        elif line.startswith('Servings:'):
            try:
                recipe['servings'] = int(line.replace('Servings:', '').strip()) or 4
            except ValueError:
                recipe['servings'] = 4
        elif line.startswith('Difficulty:'):
            recipe['difficulty'] = line.replace('Difficulty:', '').strip()
        elif line.startswith('- ') and current_section == 'ingredients':
            recipe['ingredients'].append(line.replace('- ', '').strip())
        elif current_section == 'steps' and line and line[0].isdigit() and '.' in line:
            import re
            recipe['instructions'].append(re.sub(r'^\d+\.\s*', '', line).strip())
        elif line.startswith('- ') and current_section == 'nutrition':
            nutrition_line = line.replace('- ', '').strip()
            if ':' in nutrition_line:
                key, value = nutrition_line.split(':', 1)
                key = key.strip().lower()
                value = value.strip()
                
                # Extract numeric value
                import re
                num_match = re.search(r'\d+', value)
                num_value = int(num_match.group()) if num_match else 0
                
                if 'calories' in key:
                    recipe['nutrition']['calories'] = num_value
                elif 'protein' in key:
                    recipe['nutrition']['protein'] = num_value
                elif 'fat' in key:
                    recipe['nutrition']['fat'] = num_value
                elif 'carb' in key:
                    recipe['nutrition']['carbs'] = num_value
                elif 'fiber' in key:
                    recipe['nutrition']['fiber'] = num_value
                elif 'sugar' in key:
                    recipe['nutrition']['sugar'] = num_value

    return recipe

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'message': 'Flask backend is running'})

@app.route('/generate-recipe', methods=['POST'])
def generate_recipe():
    """Generate a recipe using Gemini AI"""
    try:
        # Get request data
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        recipe_name = data.get('recipeName', '').strip()
        ingredients = data.get('ingredients', '').strip()
        meal_type = data.get('mealType', 'meal').strip()
        
        if not recipe_name or not ingredients:
            return jsonify({'error': 'Recipe name and ingredients are required'}), 400
        
        # Create prompt for Gemini
        prompt = f"""The user wants to cook '{recipe_name}' and has the following ingredients: {ingredients}.
Please provide the recipe in this exact format:

Recipe Name: {recipe_name}
Ingredients:
- <ingredient 1>
- <ingredient 2>
...
Steps:
1. <step 1>
2. <step 2>
...
Cooking Time: <time>
Servings: <number>
Difficulty: <Easy/Medium/Hard>
Nutrition Analysis:
- Calories: <value>
- Protein: <value>g
- Fat: <value>g
- Carbohydrates: <value>g
- Fiber: <value>g
- Sugar: <value>g

Please make sure to provide realistic nutritional values and clear, detailed cooking instructions."""

        # Prepare request to Gemini API
        gemini_data = {
            'contents': [{
                'parts': [{'text': prompt}]
            }]
        }
        
        # Make request to Gemini API
        headers = {
            'Content-Type': 'application/json',
        }
        
        logger.info(f"Generating recipe for: {recipe_name}")
        
        response = requests.post(
            GEMINI_API_URL,
            headers=headers,
            json=gemini_data,
            timeout=30
        )
        
        if response.status_code == 503:
            return jsonify({'error': 'Gemini AI is currently overloaded. Please try again later.'}), 503
        
        if not response.ok:
            logger.error(f"Gemini API error: {response.status_code} - {response.text}")
            return jsonify({'error': f'AI service error: {response.status_code}'}), response.status_code
        
        # Parse response
        response_data = response.json()
        
        if 'candidates' not in response_data or not response_data['candidates']:
            return jsonify({'error': 'No recipe generated. Please try again.'}), 500
        
        generated_text = response_data['candidates'][0]['content']['parts'][0]['text']
        
        # Parse the AI response into structured recipe
        recipe = parse_recipe_response(generated_text, recipe_name, meal_type)
        
        logger.info(f"Recipe generated successfully for: {recipe_name}")
        
        return jsonify({
            'success': True,
            'recipe': recipe,
            'message': 'Recipe generated successfully'
        })
        
    except requests.exceptions.Timeout:
        logger.error("Request timeout while calling Gemini API")
        return jsonify({'error': 'Request timeout. Please try again.'}), 408
    
    except requests.exceptions.RequestException as e:
        logger.error(f"Network error: {str(e)}")
        return jsonify({'error': 'Network error. Please check your connection.'}), 500
    
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        return jsonify({'error': 'An unexpected error occurred. Please try again.'}), 500

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(405)
def method_not_allowed(error):
    return jsonify({'error': 'Method not allowed'}), 405

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)
