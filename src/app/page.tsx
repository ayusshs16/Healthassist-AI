
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AppLogo, ChatbotLogo } from '@/components/icons';
import { Bot, Stethoscope, User, ArrowRight } from 'lucide-react';
import Image from 'next/image';

function FeatureCard({ icon, title, description, href }: { icon: React.ReactNode, title: string, description: string, href: string }) {
    return (
        <Link href={href} className="block group">
            <Card className="shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
                <CardHeader className="flex flex-row items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-full group-hover:bg-primary/20 transition-colors">
                        {icon}
                    </div>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{description}</p>
                </CardContent>
            </Card>
        </Link>
    )
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-card/80 backdrop-blur-sm shadow-sm fixed top-0 w-full z-50">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <AppLogo className="h-8 w-8 text-primary" />
          <span className="sr-only">HealthAssist AI</span>
        </Link>
        <h1 className="ml-4 text-2xl font-bold text-primary">HealthAssist AI</h1>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Login
          </Link>
          <Button asChild>
            <Link href="/signup" prefetch={false}>Sign Up</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1 pt-16">
        <section className="w-full py-20 md:py-32 lg:py-40 gradient-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:gap-12 items-center justify-center text-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="w-full max-w-4xl mx-auto aspect-video overflow-hidden rounded-xl bg-white my-4">
                    <Image
                    src="https://placehold.co/1200x675.png"
                    width="1200"
                    height="675"
                    alt="Hero Health"
                    data-ai-hint="medical team"
                    className="h-full w-full object-cover object-center"
                    />
                </div>
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Your Health, Simplified.
                  </h1>
                  <p className="max-w-[600px] mx-auto text-muted-foreground md:text-xl">
                    HealthAssist AI is your intelligent partner for finding the right doctor and getting instant health advice.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                  <Button size="lg" asChild>
                    <Link href="/signup" className="flex items-center gap-2" prefetch={false}>
                      Get Started <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-accent/20 px-3 py-1 text-sm text-accent-foreground">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Intelligent Healthcare at Your Fingertips</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform is designed to provide seamless and intelligent healthcare services, from finding the right specialist to getting instant answers to your health queries.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-stretch gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 mt-12">
               <FeatureCard 
                href="/chatbot"
                icon={<ChatbotLogo className="h-8 w-8 text-primary"/>}
                title="AI Health Chatbot"
                description="Get instant answers to your health questions and guidance on your symptoms from our intelligent chatbot."
              />
              <FeatureCard 
                href="/doctors"
                icon={<Stethoscope className="h-8 w-8 text-primary" />}
                title="Doctor Discovery"
                description="Easily find and book appointments with top doctors and specialists in your area based on your needs."
              />
              <FeatureCard
                href="/dashboard/patient"
                icon={<User className="h-8 w-8 text-primary" />}
                title="Personalized Dashboards"
                description="Manage your appointments, view your health history, and interact with your doctor—all in one place."
              />
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 HealthAssist AI. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
