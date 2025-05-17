'use client';

// AUTH_DISABLED: Signup functionality is temporarily removed.
// import { useState } from 'react';
// import { useForm, type SubmitHandler } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '@/lib/firebase/config';
import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { DrZenBotLogo } from '@/components/DrZenBotLogo';
// import { useToast } from "@/hooks/use-toast";
// import { createUserProfile } from '@/services/user-service';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from 'lucide-react';

// const signupSchema = z.object({
//   email: z.string().email({ message: 'Invalid email address.' }),
//   password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
//   confirmPassword: z.string(),
//   medicalHistory: z.string().optional(),
// }).refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords don't match",
//   path: ['confirmPassword'],
// });

// type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  // AUTH_DISABLED: Signup functionality is temporarily removed.
  // const router = useRouter();
  // const { toast } = useToast();
  // const [error, setError] = useState<string | null>(null);
  // const [isLoading, setIsLoading] = useState(false);

  // const form = useForm<SignupFormValues>({
  //   resolver: zodResolver(signupSchema),
  //   defaultValues: {
  //     email: '',
  //     password: '',
  //     confirmPassword: '',
  //     medicalHistory: '',
  //   },
  // });

  // const onSubmit: SubmitHandler<SignupFormValues> = async (data) => {
  //   setIsLoading(true);
  //   setError(null);
  //   try {
  //     const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
  //     const user = userCredential.user;
  //     if (user) {
  //       await createUserProfile(user.uid, {
  //         email: user.email!,
  //         medicalHistory: data.medicalHistory || '',
  //       });
  //     }
  //     toast({ title: "Success", description: "Account created successfully! Please login." });
  //     router.push('/login');
  //   } catch (err: any) {
  //     setError(err.message || 'Failed to create account. Please try again.');
  //     toast({ title: "Signup Failed", description: err.message || "An error occurred.", variant: "destructive" });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="mb-8">
        <DrZenBotLogo />
      </div>
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Sign Up Temporarily Disabled</CardTitle>
          <CardDescription>Account creation is currently unavailable. We apologize for the inconvenience.</CardDescription>
        </CardHeader>
        <CardContent>
            <Alert variant="default">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Feature Unavailable</AlertTitle>
              <AlertDescription>
                User sign up and account features are temporarily disabled. You can continue to use the AI Health Assistant anonymously.
              </AlertDescription>
            </Alert>
        </CardContent>
         <CardFooter className="flex flex-col items-center gap-4 pt-6">
          <Button asChild variant="outline">
            <Link href="/">Go to Homepage</Link>
          </Button>
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Login (Disabled)
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
