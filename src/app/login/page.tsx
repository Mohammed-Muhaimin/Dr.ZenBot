'use client';

// AUTH_DISABLED: Login functionality is temporarily removed.
// import { useState } from 'react';
// import { useForm, type SubmitHandler } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '@/lib/firebase/config';
import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { DrZenBotLogo } from '@/components/DrZenBotLogo';
// import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from 'lucide-react';

// const loginSchema = z.object({
//   email: z.string().email({ message: 'Invalid email address.' }),
//   password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
// });

// type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  // AUTH_DISABLED: Login functionality is temporarily removed.
  // const router = useRouter();
  // const { toast } = useToast();
  // const [error, setError] = useState<string | null>(null);
  // const [isLoading, setIsLoading] = useState(false);

  // const form = useForm<LoginFormValues>({
  //   resolver: zodResolver(loginSchema),
  //   defaultValues: {
  //     email: '',
  //     password: '',
  //   },
  // });

  // const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
  //   setIsLoading(true);
  //   setError(null);
  //   try {
  //     await signInWithEmailAndPassword(auth, data.email, data.password);
  //     toast({ title: "Success", description: "Logged in successfully!" });
  //     router.push('/');
  //   } catch (err: any) {
  //     setError(err.message || 'Failed to login. Please check your credentials.');
  //     toast({ title: "Login Failed", description: err.message || "Please check your credentials.", variant: "destructive" });
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
          <CardTitle className="text-2xl font-semibold">Login Temporarily Disabled</CardTitle>
          <CardDescription>The login feature is currently unavailable. We apologize for the inconvenience.</CardDescription>
        </CardHeader>
        <CardContent>
            <Alert variant="default">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Feature Unavailable</AlertTitle>
              <AlertDescription>
                User login and account features are temporarily disabled. You can continue to use the AI Health Assistant anonymously.
              </AlertDescription>
            </Alert>
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-2 pt-6">
          <Button asChild variant="outline">
            <Link href="/">Go to Homepage</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
