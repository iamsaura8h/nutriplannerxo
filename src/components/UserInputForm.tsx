
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  weight: z.string().refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num > 0 && num < 500;
  }, {
    message: "Weight must be a positive number less than 500kg",
  }),
  height: z.string().refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num > 0 && num < 300;
  }, {
    message: "Height must be a positive number less than 300cm",
  }),
  age: z.string().refine((val) => {
    const num = parseInt(val);
    return !isNaN(num) && num > 0 && num < 120;
  }, {
    message: "Age must be a positive number less than 120",
  }),
  gender: z.enum(["male", "female"]),
  activityLevel: z.enum(["sedentary", "light", "moderate", "active"]),
  goal: z.enum(["loss", "maintain", "gain"]),
});

export type UserFormData = z.infer<typeof formSchema>;

const UserInputForm = () => {
  const navigate = useNavigate();
  
  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      weight: "",
      height: "",
      age: "",
      gender: "male",
      activityLevel: "sedentary",
      goal: "maintain",
    },
  });

  function onSubmit(values: UserFormData) {
    localStorage.setItem("userFormData", JSON.stringify(values));
    toast({
      title: "Form submitted!",
      description: "Your nutrition analysis is ready.",
    });
    navigate("/results");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight (kg)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="70" {...field} />
                </FormControl>
                <FormDescription>
                  Enter your weight in kilograms
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="height"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Height (cm)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="170" {...field} />
                </FormControl>
                <FormDescription>
                  Enter your height in centimeters
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="30" {...field} />
                </FormControl>
                <FormDescription>
                  Enter your age in years
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select your biological gender for BMR calculation
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="activityLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Activity Level</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select activity level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentary (little/no exercise)</SelectItem>
                    <SelectItem value="light">Lightly Active (1-3 days/week)</SelectItem>
                    <SelectItem value="moderate">Moderately Active (3-5 days/week)</SelectItem>
                    <SelectItem value="active">Very Active (6-7 days/week)</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select your typical activity level
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="goal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Goal</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your goal" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="loss">Weight Loss</SelectItem>
                    <SelectItem value="maintain">Maintain Weight</SelectItem>
                    <SelectItem value="gain">Weight Gain</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select your fitness goal
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full">Calculate</Button>
      </form>
    </Form>
  );
};

export default UserInputForm;
