
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserFormData } from "@/components/UserInputForm";
import ResultDisplay from "@/components/ResultDisplay";
import MealRecommendations from "@/components/MealRecommendations";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ActivitySquare, Utensils } from "lucide-react";
import { calculateBMR, calculateTDEE, calculateCalories } from "@/utils/nutritionCalculator";

const ResultsPage = () => {
  const [userData, setUserData] = useState<UserFormData | null>(null);
  const navigate = useNavigate();

  // Calculate calories for meal recommendations
  const calculateUserCalories = () => {
    if (!userData) return 0;
    
    const weight = parseFloat(userData.weight);
    const height = parseFloat(userData.height);
    const age = parseInt(userData.age);
    
    const bmr = calculateBMR(weight, height, age, userData.gender);
    const tdee = calculateTDEE(bmr, userData.activityLevel);
    return calculateCalories(tdee, userData.goal);
  };

  useEffect(() => {
    // Get user data from localStorage
    const storedData = localStorage.getItem("userFormData");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData) as UserFormData;
        setUserData(parsedData);
      } catch (error) {
        console.error("Error parsing user data:", error);
        navigate("/");
      }
    } else {
      // If no data is found, redirect to the home page
      navigate("/");
    }
  }, [navigate]);

  if (!userData) {
    return <div className="container py-12 text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <Button 
          variant="outline" 
          onClick={() => navigate("/")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Calculator
        </Button>
        
        <h1 className="text-2xl font-bold">Your Nutrition Results</h1>
      </div>

      <Tabs defaultValue="analysis" className="mb-10">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="analysis" className="flex items-center gap-2">
            <ActivitySquare className="h-4 w-4" />
            Body Analysis
          </TabsTrigger>
          <TabsTrigger value="meals" className="flex items-center gap-2">
            <Utensils className="h-4 w-4" />
            Meal Recommendations
          </TabsTrigger>
        </TabsList>
        <TabsContent value="analysis" className="pt-6">
          <ResultDisplay userData={userData} />
        </TabsContent>
        <TabsContent value="meals" className="pt-6">
          <MealRecommendations 
            calories={calculateUserCalories()} 
            goal={userData.goal} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResultsPage;
