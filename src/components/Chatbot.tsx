"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, User, Send, Loader2, Sparkles, BrainCircuit } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { healthFAQChatbot } from "@/ai/flows/health-faq-chatbot";
import { recommendDoctor } from "@/ai/flows/doctor-recommendation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Message {
  id: string;
  text: string;
  role: "user" | "bot";
}

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<"faq" | "recommend">("faq");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTo({
            top: scrollAreaRef.current.scrollHeight,
            behavior: 'smooth'
        });
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), text: input, role: "user" };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      if (mode === 'faq') {
        const response = await healthFAQChatbot({ query: input });
        const botMessage: Message = { id: (Date.now() + 1).toString(), text: response.answer, role: "bot" };
        setMessages(prev => [...prev, botMessage]);
      } else {
        const response = await recommendDoctor({ symptoms: input, needs: "General consultation" });
        const botMessage: Message = { id: (Date.now() + 1).toString(), text: `Based on your symptoms, I recommend a ${response.recommendation}. Reason: ${response.reason}`, role: "bot" };
        setMessages(prev => [...prev, botMessage]);
      }
    } catch (error) {
        console.error("Error with AI service:", error);
        toast({
            title: "Error",
            description: "Sorry, I'm having trouble connecting to the AI service. Please try again later.",
            variant: "destructive",
        });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <Card className="h-[calc(100vh-10rem)] w-full flex flex-col">
        <CardHeader>
            <CardTitle>HealthAssist AI Chatbot</CardTitle>
            <CardDescription>Your personal AI health assistant.</CardDescription>
        </CardHeader>

        <Tabs value={mode} onValueChange={(value) => setMode(value as "faq" | "recommend")} className="px-6">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="faq"><Sparkles className="mr-2 h-4 w-4"/>General FAQ</TabsTrigger>
                <TabsTrigger value="recommend"><BrainCircuit className="mr-2 h-4 w-4"/>Recommend a Doctor</TabsTrigger>
            </TabsList>
        </Tabs>

        <CardContent className="flex-1 flex flex-col p-6 pt-4 overflow-hidden">
            <ScrollArea className="flex-1 pr-4 -mr-4" ref={scrollAreaRef}>
                <div className="space-y-6">
                    {messages.map((message) => (
                        <div key={message.id} className={cn("flex items-start gap-4", message.role === "user" ? "justify-end" : "justify-start")}>
                            {message.role === "bot" && (
                                <Avatar>
                                    <AvatarFallback><Bot /></AvatarFallback>
                                </Avatar>
                            )}
                            <div className={cn(
                                "max-w-[75%] rounded-lg p-3 text-sm",
                                message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                            )}>
                                <p>{message.text}</p>
                            </div>
                            {message.role === "user" && (
                                <Avatar>
                                    <AvatarFallback><User /></AvatarFallback>
                                </Avatar>
                            )}
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex items-start gap-4 justify-start">
                             <Avatar>
                                <AvatarFallback><Bot /></AvatarFallback>
                            </Avatar>
                            <div className="bg-muted rounded-lg p-3 flex items-center space-x-2">
                                <Loader2 className="h-5 w-5 animate-spin" />
                                <span>Thinking...</span>
                            </div>
                        </div>
                    )}
                </div>
            </ScrollArea>
            <form onSubmit={handleSendMessage} className="mt-4 flex items-center gap-2 border-t pt-4">
                <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={mode === 'faq' ? "Ask a health question..." : "Describe your symptoms..."}
                    className="flex-1"
                    disabled={isLoading}
                />
                <Button type="submit" disabled={isLoading || !input.trim()}>
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    <span className="sr-only">Send</span>
                </Button>
            </form>
        </CardContent>
    </Card>
  );
}
