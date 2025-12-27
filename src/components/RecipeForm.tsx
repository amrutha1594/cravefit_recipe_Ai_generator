import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import config from "@/config/config";

interface RecipeFormProps {
  mealType: string;
  onBack: () => void;
  onRecipeGenerated: (recipe: any) => void;
}

const RecipeForm = ({
  mealType,
  onBack,
  onRecipeGenerated,
}: RecipeFormProps) => {
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateRecipe = async (
    recipeName: string,
    userIngredients: string
  ) => {
    const BACKEND_URL = `${config.BACKEND_URL}${config.ENDPOINTS.GENERATE_RECIPE}`;

    const data = {
      recipeName,
      ingredients: userIngredients,
      mealType,
    };

    try {
      const response = await fetch(BACKEND_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status === 503) {
        throw new Error(
          "AI service is currently overloaded. Please try again later."
        );
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error ||
            `Error: ${response.status} - ${response.statusText}`
        );
      }

      const responseData = await response.json();

      if (!responseData.success) {
        throw new Error(responseData.error || "Failed to generate recipe");
      }

      return responseData.recipe;
    } catch (error) {
      if (error instanceof TypeError && error.message.includes("fetch")) {
        throw new Error(
          "Unable to connect to the backend server. Please make sure the Flask server is running."
        );
      }
      throw new Error(
        error instanceof Error ? error.message : "Failed to generate recipe"
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!recipeName.trim() || !ingredients.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide both recipe name and ingredients.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      const recipe = await generateRecipe(recipeName, ingredients);
      onRecipeGenerated(recipe);

      toast({
        title: "Recipe Generated!",
        description:
          "Your personalized recipe is ready with nutrition analysis.",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description:
          error instanceof Error
            ? error.message
            : "Failed to generate recipe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
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
            <h1 className="text-2xl font-bold text-foreground capitalize">
              Create {mealType} Recipe
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="shadow-glow border-0 bg-white">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center text-2xl">
              <Sparkles className="h-6 w-6 text-primary mr-2" />
              Recipe Generator
            </CardTitle>
            <CardDescription>
              Tell us what you want to cook and we'll create a perfect recipe
              with nutrition analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="recipe-name"
                  className="text-base font-semibold"
                >
                  Recipe Name
                </Label>
                <Input
                  id="recipe-name"
                  type="text"
                  placeholder={`e.g., Healthy ${mealType} Bowl`}
                  value={recipeName}
                  onChange={(e) => setRecipeName(e.target.value)}
                  className="text-base"
                  required
                />
                <p className="text-sm text-muted-foreground">
                  What would you like to call your recipe?
                </p>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="ingredients"
                  className="text-base font-semibold"
                >
                  Ingredients
                </Label>
                <Textarea
                  id="ingredients"
                  placeholder="e.g., chicken breast, broccoli, quinoa, olive oil, garlic, lemon, salt, pepper"
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  className="min-h-[120px] text-base"
                  required
                />
                <p className="text-sm text-muted-foreground">
                  List the ingredients you have or want to use, separated by
                  commas
                </p>
              </div>

              <Button
                type="submit"
                variant="auth"
                className="w-full"
                size="lg"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Generating Recipe...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Recipe & Nutrition
                  </>
                )}
              </Button>
            </form>

            <div className="mt-8 p-4 bg-muted rounded-lg">
              <h3 className="font-semibold text-sm mb-2">What you'll get:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Step-by-step cooking instructions</li>
                <li>• Complete nutritional breakdown</li>
                <li>• Cooking time and difficulty level</li>
                <li>• Voice narration for hands-free cooking</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default RecipeForm;
