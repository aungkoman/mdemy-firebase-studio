"use client";

import type { FormEvent } from 'react';
import { useState, useEffect, useTransition } from 'react';
import { generateRelevantTestimonials, type GenerateRelevantTestimonialsInput } from '@/ai/flows/generate-testimonials';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Container } from '@/components/ui/container';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Quote, Users, Star, AlertTriangle, Loader2 } from 'lucide-react';
import type { UserProfile } from '@/types';
import { useToast } from "@/hooks/use-toast";


const userProfiles: UserProfile[] = ["Student", "Junior Developer", "Business Owner"];

export function TestimonialsSection() {
  const [selectedProfile, setSelectedProfile] = useState<UserProfile>(userProfiles[0]);
  const [testimonials, setTestimonials] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const fetchTestimonials = async (profile: UserProfile) => {
    setIsLoading(true);
    setError(null);
    try {
      const input: GenerateRelevantTestimonialsInput = {
        userProfile: profile,
        numberOfTestimonials: 3,
      };
      const result = await generateRelevantTestimonials(input);
      setTestimonials(result.testimonials);
    } catch (err) {
      console.error("Failed to generate testimonials:", err);
      setError("Sorry, we couldn't fetch testimonials at this time. Please try again later.");
      toast({
        title: "Error",
        description: "Failed to load testimonials.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    startTransition(() => {
      fetchTestimonials(selectedProfile);
    });
  }, [selectedProfile]);

  const handleProfileChange = (value: string) => {
    setSelectedProfile(value as UserProfile);
  };

  return (
    <Container as="section" id="testimonials" className="bg-secondary/30 section-fade-in">
      <div className="text-center mb-12">
        <Users className="h-12 w-12 text-primary mx-auto mb-4" />
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">What Our Users Say</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Hear from individuals like you who have benefited from mDemy.
        </p>
      </div>

      <div className="mb-8 max-w-md mx-auto">
        <Select onValueChange={handleProfileChange} defaultValue={selectedProfile} disabled={isLoading || isPending}>
          <SelectTrigger className="w-full text-lg py-6 shadow-md">
            <SelectValue placeholder="Select your profile..." />
          </SelectTrigger>
          <SelectContent>
            {userProfiles.map(profile => (
              <SelectItem key={profile} value={profile} className="text-lg py-3">
                {profile}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {error && (
        <Alert variant="destructive" className="max-w-2xl mx-auto">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {(isLoading || isPending) ? (
          Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} className="shadow-lg">
              <CardHeader>
                <Skeleton className="h-6 w-1/2 mb-2" />
                <div className="flex">
                  {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-5 w-5 mr-1 rounded-full" />)}
                </div>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          ))
        ) : (
          testimonials.map((testimonial, index) => (
            <Card key={index} className="shadow-lg flex flex-col transform hover:-translate-y-1 transition-transform duration-300">
              <CardHeader className="bg-muted/20">
                <div className="flex items-center justify-between">
                  <Quote className="h-8 w-8 text-primary opacity-50" />
                  <div className="flex">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />)}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow pt-6">
                <p className="text-muted-foreground italic">"{testimonial}"</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
      {(isLoading || isPending) && (
        <div className="flex justify-center mt-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-lg text-muted-foreground">Loading testimonials...</span>
        </div>
      )}
    </Container>
  );
}
