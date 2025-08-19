
"use client";

import { AppLayout } from "@/components/shared/AppLayout";
import { mockDoctors } from "@/lib/mock-data";
import { notFound, useParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Star, Briefcase, Award, BadgeDollarSign, Calendar, Clock, Loader2, CheckCircle, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import { sendEmail } from "@/ai/flows/send-email-flow";
import { useToast } from "@/hooks/use-toast";
import { usePatient } from "@/hooks/use-patient";
import Image from "next/image";

export default function DoctorProfilePage() {
  const params = useParams();
  const doctorId = typeof params.id === 'string' ? params.id : '';
  const doctor = mockDoctors.find(d => d.id === doctorId);
  const { patient } = usePatient();
  const [isBooking, setIsBooking] = useState(false);
  const { toast } = useToast();

  if (!doctor) {
    notFound();
  }

  const handleBooking = async (slot: string) => {
    if (!patient) return;
    setIsBooking(true);
    try {
      // Email to patient
      await sendEmail({
        to: patient.email,
        subject: `Appointment Confirmed with ${doctor.name}`,
        body: `Hi ${patient.name},\n\nYour appointment with ${doctor.name} for ${slot} has been confirmed.\n\nThank you,\nHealthAssist AI`,
      });
      // Email to doctor
      await sendEmail({
        to: 'doctor@example.com', // In a real app, use doctor.email
        subject: `New Appointment with ${patient.name}`,
        body: `Hi ${doctor.name},\n\nYou have a new appointment with ${patient.name} for ${slot}.\n\nThank you,\nHealthAssist AI`,
      });

      toast({
        title: "Booking Successful",
        description: `Your appointment with ${doctor.name} has been booked.`,
      });
    } catch (error) {
      console.error("Failed to book appointment", error);
      toast({
        title: "Booking Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsBooking(false);
    }
  };
  
  const getDoctorHint = (name: string) => {
    if (name.includes('Sarah') || name.includes('Emily') || name.includes('Jessica') || name.includes('Laura') || name.includes('Linda') || name.includes('Jane')) {
        return "woman doctor";
    }
    return "man doctor";
  }

  return (
    <AppLayout>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
            <Card>
                <CardHeader className="flex flex-col md:flex-row gap-6 items-start">
                    <Avatar className="w-32 h-32" data-ai-hint={getDoctorHint(doctor.name)}>
                        <Image src={doctor.avatarUrl} alt={doctor.name} width={128} height={128} className="rounded-full object-cover" />
                        <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1.5">
                        <CardTitle className="text-3xl font-bold">{doctor.name}</CardTitle>
                        <CardDescription className="text-lg text-primary">{doctor.specialization}</CardDescription>
                        <div className="flex items-center gap-4 pt-2 text-muted-foreground flex-wrap">
                            <div className="flex items-center gap-1">
                                <Star className="w-5 h-5 text-accent fill-accent" />
                                <span>{doctor.rating}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Briefcase className="w-5 h-5"/>
                                <span>{doctor.experience} years of experience</span>
                            </div>
                             <div className="flex items-center gap-1.5">
                                <BadgeDollarSign className="w-5 h-5"/>
                                <span>${doctor.consultationFee} consultation fee</span>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Separator className="my-4"/>
                    <h3 className="text-xl font-semibold mb-2">About {doctor.name}</h3>
                    <p className="text-muted-foreground">{doctor.bio}</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><GraduationCap /> Education & Experience</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">Dr. {doctor.name.split(' ').pop()} is a highly qualified professional with a degree from a prestigious institution and extensive experience in the field.</p>
                     <ul className="space-y-2">
                        <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> Board-certified in {doctor.specialization}.</li>
                        <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> Fellow of the American College of Physicians.</li>
                    </ul>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Award /> Awards & Recognitions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">Recognized for excellence in patient care and medical research.</p>
                    <ul className="space-y-2">
                        <li className="flex items-center gap-2"><Award className="h-5 w-5 text-accent" /> Top Doctor Award - 2023</li>
                        <li className="flex items-center gap-2"><Award className="h-5 w-5 text-accent" /> Patient's Choice Award - 2022</li>
                    </ul>
                </CardContent>
            </Card>

        </div>
        <div className="md:col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Calendar className="w-6 h-6"/> Book an Appointment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">Select an available time slot to book your consultation.</p>
                    <div className="space-y-2">
                        {doctor.availability.map((slot, index) => (
                            <Button 
                                key={index} 
                                variant="outline" 
                                className="w-full justify-start gap-2"
                                onClick={() => handleBooking(slot)}
                                disabled={isBooking}
                            >
                                {isBooking ? <Loader2 className="w-4 h-4 animate-spin" /> : <Clock className="w-4 h-4" />}
                                {slot}
                            </Button>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </AppLayout>
  );
}
