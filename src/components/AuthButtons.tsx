'use client';

// AUTH_DISABLED: All imports related to auth functionality are commented or will be unused.
// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
// import { LogIn, LogOut, UserPlus, UserCircle } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import { useToast } from '@/hooks/use-toast';

export function AuthButtons() {
  const { loading } = useAuth(); // AUTH_DISABLED: currentUser will always be null, loading will be false

  // AUTH_DISABLED: Login/logout functionality is temporarily removed.
  // This component will now render nothing.
  if (loading) {
    // This path might not be hit if loading is always false quickly.
    // return <div className="text-sm text-muted-foreground">Loading...</div>;
  }
  
  return null; // AUTH_DISABLED: Return null to hide auth buttons

  // const router = useRouter();
  // const { toast } = useToast();
  // const { currentUser, logout } = useAuth();


  // const handleLogout = async () => {
  //   try {
  //     await logout(); // logout from useAuth will be a no-op or console.log
  //     toast({ title: "Logged Out", description: "You have been successfully logged out." });
  //     router.push('/'); 
  //   } catch (error) {
  //     toast({ title: "Logout Failed", description: "Could not log out. Please try again.", variant: "destructive" });
  //     console.error("Logout error:", error);
  //   }
  // };

  // if (loading) {
  //   return (
  //     <div className="flex items-center space-x-2">
  //       <Button variant="ghost" size="sm" disabled>Loading...</Button>
  //     </div>
  //   );
  // }

  // if (currentUser) {
  //   return (
  //     <div className="flex items-center space-x-2">
  //       <span className="text-sm text-muted-foreground hidden sm:inline">
  //         <UserCircle className="inline h-4 w-4 mr-1" />
  //         {currentUser.email}
  //       </span>
  //       <Button variant="outline" size="sm" onClick={handleLogout}>
  //         <LogOut className="mr-1 h-4 w-4" /> Logout
  //       </Button>
  //     </div>
  //   );
  // }

  // return (
  //   <div className="flex items-center space-x-2">
  //     <Button variant="ghost" size="sm" asChild>
  //       <Link href="/login">
  //         <LogIn className="mr-1 h-4 w-4" /> Login
  //       </Link>
  //     </Button>
  //     <Button variant="default" size="sm" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
  //       <Link href="/signup">
  //         <UserPlus className="mr-1 h-4 w-4" /> Sign Up
  //       </Link>
  //     </Button>
  //   </div>
  // );
}
