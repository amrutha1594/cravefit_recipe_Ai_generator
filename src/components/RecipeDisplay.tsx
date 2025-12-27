import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Play, Pause, Clock, Users, ChefHat, Volume2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Recipe {
  name: string;
  mealType: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: string;
  servings: number;
  difficulty: string;
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sugar: number;
  };
}

interface RecipeDisplayProps {
  recipe: Recipe;
  onBack: () => void;
}

const RecipeDisplay = ({ recipe, onBack }: RecipeDisplayProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const { toast } = useToast();

  const handleVoiceToggle = () => {
    if (!isPlaying) {
      // Start text-to-speech
      const instruction = recipe.instructions[currentStep];
      const utterance = new SpeechSynthesisUtterance(instruction);
      utterance.rate = 0.8;
      utterance.onend = () => {
        setIsPlaying(false);
        if (currentStep < recipe.instructions.length - 1) {
          setCurrentStep(currentStep + 1);
        }
      };
      speechSynthesis.speak(utterance);
      setIsPlaying(true);
      
      toast({
        title: "Voice Instructions Started",
        description: "Follow along with the audio guide!",
      });
    } else {
      // Stop text-to-speech
      speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-secondary';
      case 'medium': return 'bg-accent';
      case 'hard': return 'bg-destructive';
      default: return 'bg-accent';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-bg">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <Button variant="ghost" onClick={onBack} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{recipe.name}</h1>
              <Badge variant="secondary" className="capitalize mt-1">
                {recipe.mealType}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recipe Info & Instructions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recipe Overview */}
            <Card className="shadow-warm border-0 bg-white">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ChefHat className="h-5 w-5 text-primary mr-2" />
                  Recipe Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <Clock className="h-6 w-6 text-primary mx-auto mb-2" />
                    <p className="font-semibold">{recipe.cookingTime}</p>
                    <p className="text-sm text-muted-foreground">Cook Time</p>
                  </div>
                  <div>
                    <Users className="h-6 w-6 text-primary mx-auto mb-2" />
                    <p className="font-semibold">{recipe.servings}</p>
                    <p className="text-sm text-muted-foreground">Servings</p>
                  </div>
                  <div>
                    <Badge className={`${getDifficultyColor(recipe.difficulty)} text-white`}>
                      {recipe.difficulty}
                    </Badge>
                    <p className="text-sm text-muted-foreground mt-2">Difficulty</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ingredients */}
            <Card className="shadow-warm border-0 bg-white">
              <CardHeader>
                <CardTitle>Ingredients</CardTitle>
                <CardDescription>Everything you need for this recipe</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-center">
                      <div className="h-2 w-2 bg-primary rounded-full mr-3" />
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card className="shadow-warm border-0 bg-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Instructions</CardTitle>
                    <CardDescription>Follow these steps to create your dish</CardDescription>
                  </div>
                  <Button 
                    variant="voice" 
                    onClick={handleVoiceToggle}
                    className="flex items-center"
                  >
                    {isPlaying ? (
                      <Pause className="h-4 w-4 mr-2" />
                    ) : (
                      <Volume2 className="h-4 w-4 mr-2" />
                    )}
                    {isPlaying ? 'Pause' : 'Voice Guide'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recipe.instructions.map((instruction, index) => (
                    <div 
                      key={index} 
                      className={`p-4 rounded-lg border-l-4 transition-all ${
                        index === currentStep 
                          ? 'border-primary bg-primary/5 shadow-sm' 
                          : 'border-border bg-muted/50'
                      }`}
                    >
                      <div className="flex items-start">
                        <Badge 
                          variant={index === currentStep ? "default" : "secondary"}
                          className="mr-3 mt-0.5"
                        >
                          {index + 1}
                        </Badge>
                        <p className="flex-1">{instruction}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Nutrition Panel */}
          <div className="space-y-6">
            <Card className="shadow-warm border-0 bg-white sticky top-24">
              <CardHeader>
                <CardTitle className="text-center">Nutrition Facts</CardTitle>
                <CardDescription className="text-center">Per serving</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Calories */}
                <div className="text-center p-4 bg-gradient-warm rounded-lg text-white">
                  <p className="text-3xl font-bold">{recipe.nutrition.calories}</p>
                  <p className="text-sm opacity-90">Calories</p>
                </div>

                {/* Macronutrients */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Protein</span>
                      <span className="text-sm">{recipe.nutrition.protein}g</span>
                    </div>
                    <Progress value={(recipe.nutrition.protein / 50) * 100} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Carbs</span>
                      <span className="text-sm">{recipe.nutrition.carbs}g</span>
                    </div>
                    <Progress value={(recipe.nutrition.carbs / 100) * 100} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Fat</span>
                      <span className="text-sm">{recipe.nutrition.fat}g</span>
                    </div>
                    <Progress value={(recipe.nutrition.fat / 30) * 100} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Fiber</span>
                      <span className="text-sm">{recipe.nutrition.fiber}g</span>
                    </div>
                    <Progress value={(recipe.nutrition.fiber / 25) * 100} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Sugar</span>
                      <span className="text-sm">{recipe.nutrition.sugar}g</span>
                    </div>
                    <Progress value={(recipe.nutrition.sugar / 50) * 100} className="h-2" />
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground text-center">
                    Nutritional values are approximate and may vary based on ingredients and portions.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecipeDisplay;