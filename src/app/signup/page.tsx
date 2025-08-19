
"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AppLogo } from "@/components/icons"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState } from "react";
import { usePatient } from "@/hooks/use-patient";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, collection, query, where, getDocs } from "firebase/firestore";

export default function SignupPage() {
  const [role, setRole] = useState("patient");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { updatePatient } = usePatient();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);


  const handleCreateAccount = async () => {
    if (!firstName || !lastName || !username || !email || !password) {
      toast({
        title: "Missing Information",
        description: "Please fill out all fields.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    
    try {
      // Check if username is unique
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("username", "==", username));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        toast({
          title: "Username Taken",
          description: "This username is already in use. Please choose another one.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const fullName = `${firstName} ${lastName}`;

      // Store user info in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: fullName,
        username: username,
        email: user.email,
        role: role,
        avatarUrl: `https://placehold.co/128x128.png?text=${fullName.charAt(0)}`,
      });
      
      // Update local patient context
      updatePatient({
        id: user.uid,
        name: fullName,
        email: email,
        avatarUrl: `https://placehold.co/128x128.png?text=${fullName.charAt(0)}`,
        phone: '',
        dateOfBirth: '',
        address: ''
      });

      // Redirect based on role
      const redirectPath = role === 'patient' ? "/dashboard/patient" : "/dashboard/doctor";
      router.push(redirectPath);

    } catch (error: any) {
      console.error("Signup error:", error);
      let errorMessage = "An unexpected error occurred.";
       if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email address is already in use.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'The password is too weak. It must be at least 6 characters long.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      toast({
        title: "Signup Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader className="text-center">
            <div className="flex justify-center items-center mb-4">
                <AppLogo className="h-12 w-12 text-primary"/>
            </div>
          <CardTitle className="text-2xl">Sign Up for HealthAssist AI</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input id="first-name" placeholder="Max" required value={firstName} onChange={e => setFirstName(e.target.value)} disabled={isLoading} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input id="last-name" placeholder="Robinson" required value={lastName} onChange={e => setLastName(e.target.value)} disabled={isLoading} />
              </div>
            </div>
             <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="maxrobinson"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} disabled={isLoading} />
            </div>
            <div className="grid gap-2">
                <Label>I am a...</Label>
                 <RadioGroup defaultValue="patient" onValueChange={setRole} className="flex gap-4" disabled={isLoading}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="patient" id="patient" />
                        <Label htmlFor="patient">Patient</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="doctor" id="doctor" />
                        <Label htmlFor="doctor">Doctor</Label>
                    </div>
                </RadioGroup>
            </div>
            <Button type="submit" className="w-full" onClick={handleCreateAccount} disabled={isLoading}>
                {isLoading ? 'Creating Account...' : 'Create an account'}
            </Button>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                    Or sign up with
                    </span>
                </div>
            </div>
            <Button variant="outline" className="w-full" disabled={isLoading}>
              Sign up with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
