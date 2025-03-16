
import React from "react";
import { Goal } from "@/utils/nutritionCalculator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Carrot, Coffee, Salad, Sandwich, Utensils } from "lucide-react";

interface MealRecommendationsProps {
  calories: number;
  goal: Goal;
}

const MealRecommendations: React.FC<MealRecommendationsProps> = ({ calories, goal }) => {
  // Sample meal recommendations based on calories and goals
  const getMealPlan = () => {
    if (goal === "loss") {
      return {
        title: "Weight Loss Meal Plan",
        description: "Lower carb, higher protein diet with focus on whole foods",
        meals: [
          {
            name: "Breakfast",
            icon: <Coffee className="h-5 w-5" />,
            items: [
              "1 bowl Moong Dal Chilla with mint chutney",
              "1 cup green tea or black coffee",
              "1/2 cup low-fat yogurt"
            ]
          },
          {
            name: "Lunch",
            icon: <Utensils className="h-5 w-5" />,
            items: [
              "1 bowl mixed vegetable dal",
              "2 multigrain rotis",
              "1 bowl cucumber raita",
              "1 bowl vegetable salad"
            ]
          },
          {
            name: "Snack",
            icon: <Carrot className="h-5 w-5" />,
            items: [
              "1 apple or 1 orange",
              "Handful of roasted chana",
              "1 cup green tea"
            ]
          },
          {
            name: "Dinner",
            icon: <Salad className="h-5 w-5" />,
            items: [
              "1 bowl vegetable curry (no cream)",
              "1 multigrain roti",
              "1 bowl mixed vegetables",
              "1 small bowl dal"
            ]
          }
        ]
      };
    } else if (goal === "gain") {
      return {
        title: "Weight Gain Meal Plan",
        description: "Higher calorie, nutrient-dense foods with adequate protein",
        meals: [
          {
            name: "Breakfast",
            icon: <Coffee className="h-5 w-5" />,
            items: [
              "2 stuffed parathas with ghee",
              "1 bowl paneer bhurji",
              "1 glass full-fat milk with nuts",
              "1 banana"
            ]
          },
          {
            name: "Lunch",
            icon: <Utensils className="h-5 w-5" />,
            items: [
              "2 cups rice",
              "1 bowl rajma or chole",
              "2-3 chapatis with ghee",
              "1 bowl vegetable curry",
              "1 glass buttermilk"
            ]
          },
          {
            name: "Snack",
            icon: <Sandwich className="h-5 w-5" />,
            items: [
              "1 mango milkshake or banana shake",
              "2 samosas or 1 plate pakoras",
              "1 cup chai with full-fat milk"
            ]
          },
          {
            name: "Dinner",
            icon: <Utensils className="h-5 w-5" />,
            items: [
              "2 cups biryani or pulao",
              "1 bowl paneer butter masala",
              "2-3 butter naans",
              "1 bowl mixed vegetable curry",
              "1 bowl sweet (kheer or halwa)"
            ]
          }
        ]
      };
    } else {
      return {
        title: "Weight Maintenance Meal Plan",
        description: "Balanced diet with moderate portions",
        meals: [
          {
            name: "Breakfast",
            icon: <Coffee className="h-5 w-5" />,
            items: [
              "2 idlis with sambhar and chutney",
              "OR 1 bowl poha with vegetables",
              "1 cup tea or coffee",
              "1 fruit (apple or orange)"
            ]
          },
          {
            name: "Lunch",
            icon: <Utensils className="h-5 w-5" />,
            items: [
              "1.5 cups rice or 3 chapatis",
              "1 bowl dal",
              "1 bowl vegetable curry",
              "1 bowl salad",
              "1 bowl curd"
            ]
          },
          {
            name: "Snack",
            icon: <Carrot className="h-5 w-5" />,
            items: [
              "1 bowl sprouts chaat",
              "OR 1 vegetable sandwich",
              "1 cup chai",
              "Handful of nuts"
            ]
          },
          {
            name: "Dinner",
            icon: <Salad className="h-5 w-5" />,
            items: [
              "2-3 chapatis",
              "1 bowl dal or rajma",
              "1 bowl vegetable curry",
              "1 bowl curd or raita"
            ]
          }
        ]
      };
    }
  };

  const mealPlan = getMealPlan();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">{mealPlan.title}</h2>
        <p className="text-muted-foreground">{mealPlan.description}</p>
        <p className="mt-2">
          <span className="font-medium">Daily Calories:</span> {calories} kcal
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mealPlan.meals.map((meal, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                {meal.icon}
                {meal.name}
              </CardTitle>
              <CardDescription>
                Suggested {meal.name.toLowerCase()} items
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {meal.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-sm text-muted-foreground">
        <p className="font-medium mb-1">Notes:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Adjust portion sizes based on your hunger levels and activity.</li>
          <li>Stay hydrated by drinking 8-10 glasses of water daily.</li>
          <li>These are sample recommendations. Consult a nutritionist for a personalized plan.</li>
          <li>Include seasonal fruits and vegetables for better nutrition.</li>
        </ul>
      </div>
    </div>
  );
};

export default MealRecommendations;
