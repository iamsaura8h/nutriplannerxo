
import React, { useMemo } from "react";
import { UserFormData } from "./UserInputForm";
import {
  calculateBMI,
  getBMICategory,
  calculateBMR,
  calculateTDEE,
  calculateCalories,
  calculateMacros,
} from "@/utils/nutritionCalculator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Activity, BarChart4, Dumbbell, Scale, Utensils } from "lucide-react";

interface ResultDisplayProps {
  userData: UserFormData;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ userData }) => {
  const results = useMemo(() => {
    const weight = parseFloat(userData.weight);
    const height = parseFloat(userData.height);
    const age = parseInt(userData.age);

    const bmi = calculateBMI(weight, height);
    const bmiCategory = getBMICategory(bmi);
    const bmr = calculateBMR(weight, height, age, userData.gender);
    const tdee = calculateTDEE(bmr, userData.activityLevel);
    const dailyCalories = calculateCalories(tdee, userData.goal);
    const macros = calculateMacros(dailyCalories, userData.goal);

    return {
      bmi,
      bmiCategory,
      bmr,
      tdee,
      dailyCalories,
      macros,
    };
  }, [userData]);

  // Calculate BMI progress percentage (for the progress bar visualization)
  const getBmiProgress = (bmi: number) => {
    // Progress bar fill percentage based on BMI ranges
    if (bmi < 18.5) return Math.min(100, (bmi / 18.5) * 100); // Underweight
    if (bmi < 25) return Math.min(100, ((bmi - 18.5) / 6.5) * 100); // Normal weight
    if (bmi < 30) return Math.min(100, ((bmi - 25) / 5) * 100); // Overweight
    return 100; // Obese
  };

  const getBmiColor = () => {
    switch (results.bmiCategory) {
      case "Underweight": return "text-blue-500";
      case "Normal weight": return "text-green-500";
      case "Overweight": return "text-yellow-500";
      case "Obese": return "text-red-500";
      default: return "text-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <Scale size={24} />
            Body Mass Index (BMI)
          </CardTitle>
          <CardDescription>
            Measures your body fat based on height and weight
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="flex justify-between mb-1 items-center">
              <span className="text-lg font-bold">{results.bmi.toFixed(1)}</span>
              <span className={`font-semibold ${getBmiColor()}`}>
                {results.bmiCategory}
              </span>
            </div>
            <Progress value={getBmiProgress(results.bmi)} />
          </div>
          <div className="text-sm text-muted-foreground">
            <p>BMI Categories:</p>
            <ul className="grid grid-cols-2 mt-1">
              <li>Underweight: &lt; 18.5</li>
              <li>Normal weight: 18.5-24.9</li>
              <li>Overweight: 25-29.9</li>
              <li>Obesity: ≥ 30</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Activity size={24} />
              Basal Metabolic Rate (BMR)
            </CardTitle>
            <CardDescription>
              Calories your body needs at complete rest
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">
              {Math.round(results.bmr)} <span className="text-base font-normal text-muted-foreground">kcal/day</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your BMR is the number of calories your body burns at rest to maintain vital functions like breathing and keeping warm.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Dumbbell size={24} />
              Total Daily Energy Expenditure
            </CardTitle>
            <CardDescription>
              Total calories burned based on activity level
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">
              {Math.round(results.tdee)} <span className="text-base font-normal text-muted-foreground">kcal/day</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your TDEE factors in your activity level: {userData.activityLevel}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <BarChart4 size={24} />
            Daily Caloric Needs
          </CardTitle>
          <CardDescription>
            Recommended daily calorie intake for your goal: {userData.goal === "loss" ? "Weight Loss" : userData.goal === "gain" ? "Weight Gain" : "Weight Maintenance"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold mb-4">
            {results.dailyCalories} <span className="text-base font-normal text-muted-foreground">kcal/day</span>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm font-medium">
                <span>Protein</span>
                <span>{results.macros.protein}g ({Math.round(results.macros.protein * 4)} kcal)</span>
              </div>
              <Progress value={(results.macros.protein * 4 / results.dailyCalories) * 100} className="h-2 mt-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm font-medium">
                <span>Carbohydrates</span>
                <span>{results.macros.carbs}g ({Math.round(results.macros.carbs * 4)} kcal)</span>
              </div>
              <Progress value={(results.macros.carbs * 4 / results.dailyCalories) * 100} className="h-2 mt-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm font-medium">
                <span>Fat</span>
                <span>{results.macros.fat}g ({Math.round(results.macros.fat * 9)} kcal)</span>
              </div>
              <Progress value={(results.macros.fat * 9 / results.dailyCalories) * 100} className="h-2 mt-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <Utensils className="h-4 w-4" />
        <AlertTitle>Meal Suggestions</AlertTitle>
        <AlertDescription>
          For more personalized Indian meal suggestions based on your caloric needs, explore the meal recommendations!
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default ResultDisplay;
