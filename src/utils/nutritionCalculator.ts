
export type ActivityLevel = "sedentary" | "light" | "moderate" | "active";
export type Goal = "loss" | "maintain" | "gain";
export type Gender = "male" | "female";

/**
 * Calculate Body Mass Index (BMI)
 */
export const calculateBMI = (weight: number, heightCm: number): number => {
  const heightM = heightCm / 100;
  return weight / (heightM * heightM);
};

/**
 * Get BMI category based on BMI value
 */
export const getBMICategory = (bmi: number): string => {
  if (bmi < 18.5) return "Underweight";
  if (bmi >= 18.5 && bmi < 25) return "Normal weight";
  if (bmi >= 25 && bmi < 30) return "Overweight";
  return "Obese";
};

/**
 * Calculate Basal Metabolic Rate (BMR) using Mifflin-St Jeor Equation
 */
export const calculateBMR = (
  weight: number,
  heightCm: number,
  age: number,
  gender: Gender
): number => {
  // BMR = (10 × weight) + (6.25 × height) - (5 × age) + 5 [men]
  // BMR = (10 × weight) + (6.25 × height) - (5 × age) - 161 [women]
  const baseCalculation = 10 * weight + 6.25 * heightCm - 5 * age;
  return gender === "male" ? baseCalculation + 5 : baseCalculation - 161;
};

/**
 * Calculate Total Daily Energy Expenditure (TDEE)
 */
export const calculateTDEE = (bmr: number, activityLevel: ActivityLevel): number => {
  const activityMultipliers = {
    sedentary: 1.2,      // Little or no exercise
    light: 1.375,        // Light exercise 1-3 days/week
    moderate: 1.55,      // Moderate exercise 3-5 days/week
    active: 1.725,       // Very active 6-7 days/week
  };

  return bmr * activityMultipliers[activityLevel];
};

/**
 * Calculate daily caloric needs based on TDEE and goal
 */
export const calculateCalories = (tdee: number, goal: Goal): number => {
  switch (goal) {
    case "loss":
      return Math.round(tdee - 500); // Calorie deficit for weight loss
    case "gain":
      return Math.round(tdee + 500); // Calorie surplus for weight gain
    case "maintain":
    default:
      return Math.round(tdee); // Maintenance calories
  }
};

/**
 * Calculate recommended macronutrients based on caloric intake
 */
export const calculateMacros = (calories: number, goal: Goal) => {
  let proteinPercentage: number;
  let fatPercentage: number;
  let carbPercentage: number;

  switch (goal) {
    case "loss":
      // Higher protein for weight loss
      proteinPercentage = 0.30; // 30%
      fatPercentage = 0.30; // 30% 
      carbPercentage = 0.40; // 40%
      break;
    case "gain":
      // Higher carbs for weight gain
      proteinPercentage = 0.25; // 25%
      fatPercentage = 0.25; // 25%
      carbPercentage = 0.50; // 50%
      break;
    case "maintain":
    default:
      // Balanced macros for maintenance
      proteinPercentage = 0.25; // 25%
      fatPercentage = 0.30; // 30%
      carbPercentage = 0.45; // 45%
      break;
  }

  // Protein and carbs provide 4 calories per gram, fat provides 9 calories per gram
  const proteinCalories = calories * proteinPercentage;
  const fatCalories = calories * fatPercentage;
  const carbCalories = calories * carbPercentage;

  const proteinGrams = Math.round(proteinCalories / 4);
  const fatGrams = Math.round(fatCalories / 9);
  const carbGrams = Math.round(carbCalories / 4);

  return {
    protein: proteinGrams,
    fat: fatGrams,
    carbs: carbGrams,
  };
};
