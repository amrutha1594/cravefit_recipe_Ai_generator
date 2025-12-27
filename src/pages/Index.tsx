import { useState } from "react";
import Landing from "@/components/Landing";
import Dashboard from "@/components/Dashboard";
import RecipeForm from "@/components/RecipeForm";
import RecipeDisplay from "@/components/RecipeDisplay";

type AppState = 'landing' | 'dashboard' | 'recipe-form' | 'recipe-display';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('landing');
  const [selectedMealType, setSelectedMealType] = useState<string>('');
  const [generatedRecipe, setGeneratedRecipe] = useState<any>(null);

  const handleLogin = () => {
    setAppState('dashboard');
  };

  const handleLogout = () => {
    setAppState('landing');
    setSelectedMealType('');
    setGeneratedRecipe(null);
  };

  const handleMealSelect = (mealType: string) => {
    setSelectedMealType(mealType);
    setAppState('recipe-form');
  };

  const handleBackToDashboard = () => {
    setAppState('dashboard');
    setSelectedMealType('');
  };

  const handleRecipeGenerated = (recipe: any) => {
    setGeneratedRecipe(recipe);
    setAppState('recipe-display');
  };

  const handleBackToForm = () => {
    setAppState('recipe-form');
  };

  switch (appState) {
    case 'landing':
      return <Landing onLogin={handleLogin} />;
    
    case 'dashboard':
      return <Dashboard onMealSelect={handleMealSelect} onLogout={handleLogout} />;
    
    case 'recipe-form':
      return (
        <RecipeForm
          mealType={selectedMealType}
          onBack={handleBackToDashboard}
          onRecipeGenerated={handleRecipeGenerated}
        />
      );
    
    case 'recipe-display':
      return (
        <RecipeDisplay
          recipe={generatedRecipe}
          onBack={handleBackToForm}
        />
      );
    
    default:
      return <Landing onLogin={handleLogin} />;
  }
};

export default Index;
