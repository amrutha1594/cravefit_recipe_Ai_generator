import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChefHat, LogOut } from "lucide-react";
import breakfastImg from "@/assets/breakfast.jpg";
import lunchImg from "@/assets/lunch.jpg";
import snacksImg from "@/assets/snacks.jpg";
import dinnerImg from "@/assets/dinner.jpg";
import drinksImg from "@/assets/drinks.jpg";

interface DashboardProps {
  onMealSelect: (mealType: string) => void;
  onLogout: () => void;
}

const mealCategories = [
  { id: "breakfast", name: "Breakfast", image: breakfastImg, description: "Start your day right" },
  { id: "lunch", name: "Lunch", image: lunchImg, description: "Midday energy boost" },
  { id: "snacks", name: "Snacks", image: snacksImg, description: "Quick & healthy bites" },
  { id: "dinner", name: "Dinner", image: dinnerImg, description: "End the day perfectly" },
  { id: "drinks", name: "Drinks", image: drinksImg, description: "Refreshing beverages" },
];

const Dashboard = ({ onMealSelect, onLogout }: DashboardProps) => {
  return (
    <div className="min-h-screen bg-gradient-bg">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-border shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ChefHat className="h-8 w-8 text-primary mr-3" />
              <h1 className="text-2xl font-bold text-foreground">CraveFit</h1>
            </div>
            <Button variant="ghost" onClick={onLogout} className="text-muted-foreground">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            What are you craving today?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose a meal category and let our AI create the perfect recipe with detailed nutrition analysis
          </p>
        </div>

        {/* Meal Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mealCategories.map((meal) => (
            <Card 
              key={meal.id} 
              className="group cursor-pointer transition-all duration-300 hover:shadow-glow hover:scale-105 border-0 overflow-hidden bg-white"
              onClick={() => onMealSelect(meal.id)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={meal.image}
                  alt={meal.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">{meal.name}</h3>
                  <p className="text-sm opacity-90">{meal.description}</p>
                </div>
              </div>
              <CardContent className="p-6">
                <Button 
                  variant="meal" 
                  className="w-full"
                  size="lg"
                >
                  Create {meal.name} Recipe
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feature Highlights */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-8">Why Choose CraveFit?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="h-12 w-12 bg-gradient-warm rounded-full flex items-center justify-center mx-auto mb-4">
                <ChefHat className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold mb-2">AI-Powered Recipes</h4>
              <p className="text-muted-foreground">Get personalized recipes based on your ingredients and preferences</p>
            </div>
            <div className="p-6">
              <div className="h-12 w-12 bg-gradient-fresh rounded-full flex items-center justify-center mx-auto mb-4">
                <ChefHat className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Nutrition Analysis</h4>
              <p className="text-muted-foreground">Detailed nutritional breakdown for every recipe we generate</p>
            </div>
            <div className="p-6">
              <div className="h-12 w-12 bg-gradient-warm rounded-full flex items-center justify-center mx-auto mb-4">
                <ChefHat className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Voice Instructions</h4>
              <p className="text-muted-foreground">Listen to step-by-step cooking instructions hands-free</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;