"use client"

import type { Doctor } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Link from "next/link";

export function DoctorCard({ doctor }: { doctor: Doctor }) {
    return (
        <Card className="flex flex-col h-full overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-col items-center text-center p-6">
                <Avatar className="w-24 h-24 mb-4">
                    <AvatarImage src={doctor.avatarUrl} alt={doctor.name} />
                    <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">{doctor.name}</CardTitle>
                <p className="text-primary font-medium">{doctor.specialization}</p>
            </CardHeader>
            <CardContent className="flex-grow px-6 pb-4">
                <div className="flex justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-accent fill-accent" />
                        <span>{doctor.rating}</span>
                    </div>
                    <span>{doctor.experience} yrs exp.</span>
                    <span>${doctor.consultationFee}</span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-3">{doctor.bio}</p>
            </CardContent>
            <CardFooter className="p-4 bg-muted/50">
                <Button asChild className="w-full">
                    <Link href={`/doctors/${doctor.id}`}>View Profile</Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
