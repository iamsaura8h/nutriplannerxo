
import React from "react";
import UserInputForm from "@/components/UserInputForm";
import { Activity, BarChart4, Scale, LogIn } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-bold">NutriPlanner</h1>
          <p className="text-xl text-muted-foreground">
            Calculate your BMI, BMR, and get personalized meal recommendations
          </p>
        </div>
        
        <div>
          {user ? (
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-medium">{user.email}</p>
                <p className="text-sm text-muted-foreground">Signed in</p>
              </div>
              <Button variant="outline" onClick={() => signOut()}>Sign Out</Button>
            </div>
          ) : (
            <Button 
              onClick={() => navigate('/auth')}
              className="flex items-center gap-2"
            >
              <LogIn className="h-4 w-4" />
              Sign In
            </Button>
          )}
        </div>
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
