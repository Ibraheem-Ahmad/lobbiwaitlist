import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertWaitlistSignupSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import type { z } from "zod";

type FormData = z.infer<typeof insertWaitlistSignupSchema>;

interface WaitlistFormProps {
  onSuccess: () => void;
}

export default function WaitlistForm({ onSuccess }: WaitlistFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<FormData>({
    resolver: zodResolver(insertWaitlistSignupSchema),
    mode: "onChange", // Validate on change for better UX
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await apiRequest("POST", "/api/waitlist", data);
      return response.json();
    },
    onSuccess: (data) => {
      form.reset();
      onSuccess();
      toast({
        title: "Welcome to the waitlist!",
        description: `Thanks for joining, ${data.signup.name}! We'll keep you updated.`,
      });
    },
    onError: (error: any) => {
      const message = error.message || "Failed to join waitlist. Please try again.";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20"
        data-testid="form-waitlist"
      >
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Your name"
                    className="w-full px-4 py-3 bg-white/90 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 text-gray-800"
                    data-testid="input-name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-3 bg-white/90 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 text-gray-800"
                    data-testid="input-email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="Phone number (optional)"
                    className="w-full px-4 py-3 bg-white/90 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 text-gray-800"
                    data-testid="input-phone"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit"
            disabled={mutation.isPending || !form.formState.isValid}
            className="w-full bg-white hover:bg-white/90 text-primary font-semibold px-8 py-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            data-testid="button-submit-waitlist"
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Joining...
              </>
            ) : (
              "🚀 Join the Waitlist"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
