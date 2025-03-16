
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserFormData } from "@/components/UserInputForm";
import ResultDisplay from "@/components/ResultDisplay";
import MealRecommendations from "@/components/MealRecommendations";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ActivitySquare, Utensils, LogOut } from "lucide-react";
import { calculateBMR, calculateTDEE, calculateCalories } from "@/utils/nutritionCalculator";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ResultsPage = () => {
  const [userData, setUserData] = useState<UserFormData | null>(null);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { toast } = useToast();

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

  const saveUserData = async (data: UserFormData) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('user_nutrition_data')
        .insert({
          user_id: user.id,
          weight: parseFloat(data.weight),
          height: parseFloat(data.height),
          age: parseInt(data.age),
          gender: data.gender,
          activity_level: data.activityLevel,
          goal: data.goal
        });
        
      if (error) {
        throw error;
      }
      
      toast({
        title: "Data saved",
        description: "Your nutrition data has been saved to your profile.",
      });
    } catch (error: any) {
      toast({
        title: "Error saving data",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    // Get user data from localStorage
    const storedData = localStorage.getItem("userFormData");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData) as UserFormData;
        setUserData(parsedData);
        
        // Save to Supabase if user is logged in
        if (user) {
          saveUserData(parsedData);
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        navigate("/");
      }
    } else {
      // If no data is found, redirect to the home page
      navigate("/");
    }
  }, [navigate, user]);

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
        
        {user && (
          <Button 
            variant="ghost" 
            onClick={() => signOut()}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        )}
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
