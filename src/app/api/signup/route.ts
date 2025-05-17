import { NextResponse, type NextRequest } from 'next/server';
// AUTH_DISABLED: All imports related to signup functionality are commented or will be unused.
// import { z } from 'zod';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '@/lib/firebase/config';
// import { createUserProfile } from '@/services/user-service';

// const signupApiSchema = z.object({
//   email: z.string().email({ message: 'Invalid email address.' }),
//   password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
//   medicalHistory: z.string().optional(),
// });

export async function POST(request: NextRequest) {
  // AUTH_DISABLED: Signup API is temporarily disabled.
  return NextResponse.json(
    { error: 'Signup functionality is temporarily disabled.' },
    { status: 503 } // Service Unavailable
  );

  // try {
  //   const body = await request.json();
  //   const validationResult = signupApiSchema.safeParse(body);

  //   if (!validationResult.success) {
  //     return NextResponse.json(
  //       { error: 'Validation failed', details: validationResult.error.flatten().fieldErrors },
  //       { status: 400 }
  //     );
  //   }

  //   const { email, password, medicalHistory } = validationResult.data;

  //   const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  //   const user = userCredential.user;

  //   if (user) {
  //     await createUserProfile(user.uid, {
  //       email: user.email!,
  //       medicalHistory: medicalHistory || '',
  //     });
  //     return NextResponse.json(
  //       { message: 'User created successfully', userId: user.uid },
  //       { status: 201 }
  //     );
  //   } else {
  //     return NextResponse.json({ error: 'User creation failed after authentication.' }, { status: 500 });
  //   }

  // } catch (error: any) {
  //   console.error('Signup API error:', error);
  //   let errorMessage = 'An unexpected error occurred.';
  //   let statusCode = 500;

  //   if (error.code) {
  //     switch (error.code) {
  //       case 'auth/email-already-in-use':
  //         errorMessage = 'This email address is already in use.';
  //         statusCode = 409; 
  //         break;
  //       case 'auth/invalid-email':
  //         errorMessage = 'The email address is not valid.';
  //         statusCode = 400;
  //         break;
  //       case 'auth/operation-not-allowed':
  //         errorMessage = 'Email/password accounts are not enabled.';
  //         statusCode = 500; 
  //         break;
  //       case 'auth/weak-password':
  //         errorMessage = 'The password is too weak.';
  //         statusCode = 400;
  //         break;
  //       default:
  //         errorMessage = error.message || 'Failed to create account.';
  //     }
  //   } else if (error instanceof z.ZodError) { // Ensure z is imported if this block is re-enabled
  //       return NextResponse.json({ error: 'Invalid request data', details: error.errors }, { status: 400 });
  //   }
    
  //   return NextResponse.json({ error: errorMessage, details: error.code || null }, { status: statusCode });
  // }
}
