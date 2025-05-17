
import { Stethoscope } from 'lucide-react';
import Link from 'next/link';

export function DrZenBotLogo() {
  return (
    <Link href="/" className="flex items-center space-x-2" aria-label="Dr.ZenBot Home">
      <Stethoscope className="h-8 w-8 text-primary" />
      <span className="text-2xl font-bold text-primary">Dr.ZenBot</span>
    </Link>
  );
}
