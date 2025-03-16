
import React from "react";
import UserInputForm from "@/components/UserInputForm";
import { Activity, BarChart4, Scale } from "lucide-react";

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">NutriPlanner</h1>
        <p className="text-xl text-muted-foreground">
          Calculate your BMI, BMR, and get personalized meal recommendations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="flex flex-col items-center text-center p-6 rounded-lg bg-muted/50">
          <Scale className="h-10 w-10 mb-4 text-primary" />
          <h3 className="text-lg font-semibold mb-2">BMI Analysis</h3>
          <p className="text-muted-foreground">Calculate your Body Mass Index and understand your weight category</p>
        </div>
        
        <div className="flex flex-col items-center text-center p-6 rounded-lg bg-muted/50">
          <Activity className="h-10 w-10 mb-4 text-primary" />
          <h3 className="text-lg font-semibold mb-2">BMR Calculation</h3>
          <p className="text-muted-foreground">Determine your Basal Metabolic Rate and daily caloric needs</p>
        </div>
        
        <div className="flex flex-col items-center text-center p-6 rounded-lg bg-muted/50">
          <BarChart4 className="h-10 w-10 mb-4 text-primary" />
          <h3 className="text-lg font-semibold mb-2">Meal Suggestions</h3>
          <p className="text-muted-foreground">Get Indian meal recommendations based on your goals</p>
        </div>
      </div>

      <div className="bg-card rounded-xl shadow-sm p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-6">Enter Your Details</h2>
        <UserInputForm />
      </div>
    </div>
  );
};

export default HomePage;
