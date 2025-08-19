import { AppLayout } from "@/components/shared/AppLayout";
import { mockDoctors } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Star, Briefcase, Award, BadgeDollarSign, Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function DoctorProfilePage({ params }: { params: { id: string } }) {
  const doctor = mockDoctors.find(d => d.id === params.id);

  if (!doctor) {
    notFound();
  }

  return (
    <AppLayout>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
            <Card>
                <CardHeader className="flex flex-col md:flex-row gap-6 items-start">
                    <Avatar className="w-32 h-32 border-4 border-primary/20">
                        <AvatarImage src={doctor.avatarUrl} alt={doctor.name} />
                        <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1.5">
                        <CardTitle className="text-3xl font-bold">{doctor.name}</CardTitle>
                        <CardDescription className="text-lg text-primary">{doctor.specialization}</CardDescription>
                        <div className="flex items-center gap-4 pt-2 text-muted-foreground">
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
                            <Button key={index} variant="outline" className="w-full justify-start gap-2">
                                <Clock className="w-4 h-4" />
                                {slot}
                            </Button>
                        ))}
                    </div>
                    <Button className="w-full">Confirm Booking</Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </AppLayout>
  );
}
