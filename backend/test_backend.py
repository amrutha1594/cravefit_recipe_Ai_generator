#!/usr/bin/env python3

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app import app
import requests
import json

def test_backend():
    """Test the Flask backend endpoints"""
    
    print("🧪 Testing Flask Backend")
    print("=========================")
    
    # Test health endpoint
    try:
        response = requests.get('http://localhost:5000/health', timeout=5)
        if response.status_code == 200:
            print("✅ Health endpoint working")
        else:
            print(f"❌ Health endpoint failed: {response.status_code}")
    except requests.exceptions.RequestException as e:
        print(f"❌ Health endpoint connection failed: {e}")
    
    # Test recipe generation endpoint
    try:
        test_data = {
            "recipeName": "Test Recipe",
            "ingredients": "chicken, rice, vegetables",
            "mealType": "lunch"
        }
        
        response = requests.post(
            'http://localhost:5000/generate-recipe',
            json=test_data,
            timeout=30
        )
        
        if response.status_code == 200:
            data = response.json()
            if data.get('success'):
                print("✅ Recipe generation endpoint working")
                print(f"   Generated recipe: {data['recipe']['name']}")
            else:
                print(f"❌ Recipe generation failed: {data.get('error')}")
        else:
            print(f"❌ Recipe generation endpoint failed: {response.status_code}")
            print(f"   Response: {response.text}")
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Recipe generation connection failed: {e}")

if __name__ == "__main__":
    print("Starting Flask server for testing...")
    # Note: You should start the server manually with: python app.py
    print("Please run 'python app.py' in another terminal, then run this test script")
