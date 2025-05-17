
'use client';

import Link from 'next/link';
import { DrZenBotLogo } from '@/components/DrZenBotLogo';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function LandingPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-background to-accent/30 p-6 text-center">
      <main className={`flex flex-col items-center justify-center flex-grow ${isMounted ? 'animate-in fade-in-0 slide-in-from-bottom-5 duration-500 ease-out' : 'opacity-0'}`}>
        <div className="mb-10">
          <DrZenBotLogo />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
          Welcome to Dr.ZenBot
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10">
          Your AI-powered companion for physical and mental health insights. Get personalized suggestions, analyze symptoms, and find relevant health information quickly and intuitively.
        </p>
        <Button
          asChild
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-6 text-xl font-semibold shadow-lg transform transition-transform hover:scale-105"
        >
          <Link href="/assistant">
            Try Now <ArrowRight className="ml-2 h-6 w-6" />
          </Link>
        </Button>
      </main>
      <footer className="p-4 mt-auto text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Dr.ZenBot. All rights reserved. For informational purposes only.
        <br />
        Created by "The Hacktivists" for Hackfinity.
      </footer>
    </div>
  );
}
