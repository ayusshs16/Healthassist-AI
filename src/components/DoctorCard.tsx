
"use client"

import type { Doctor } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function DoctorCard({ doctor }: { doctor: Doctor }) {
    return (
        <Card className="flex flex-col h-full overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="p-0 relative h-48 w-full">
                <Image 
                  src={doctor.avatarUrl} 
                  alt={doctor.name}
                  layout="fill"
                  objectFit="cover"
                  className="w-full h-full"
                />
            </CardHeader>
            <CardContent className="flex-grow p-4">
                 <CardTitle className="text-xl mb-1">{doctor.name}</CardTitle>
                <p className="text-primary font-medium mb-2">{doctor.specialization}</p>
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-accent fill-accent" />
                        <span>{doctor.rating}</span>
                    </div>
                    <span>{doctor.experience} yrs exp.</span>
                    <span>${doctor.consultationFee}</span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{doctor.bio}</p>
            </CardContent>
            <CardFooter className="p-4 bg-muted/50 mt-auto">
                <Button asChild className="w-full">
                    <Link href={`/doctors/${doctor.id}`}>View Profile</Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
