
"use client";

import { mockPatientAppointments } from '@/lib/mock-data';
import type { Appointment } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, CheckCircle, XCircle, Bot, LineChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePatient } from '@/hooks/use-patient';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';

function AppointmentCard({ appointment }: { appointment: Appointment }) {
  const statusConfig = {
    upcoming: {
      icon: <Calendar className="h-5 w-5 text-primary" />,
      badge: <Badge variant="default">Upcoming</Badge>,
    },
    completed: {
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      badge: <Badge variant="secondary">Completed</Badge>,
    },
    cancelled: {
      icon: <XCircle className="h-5 w-5 text-destructive" />,
      badge: <Badge variant="destructive">Cancelled</Badge>,
    },
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-4">
            <Avatar className="h-10 w-10">
                <AvatarImage src={appointment.doctor.avatarUrl} alt={appointment.doctor.name} />
                <AvatarFallback>{appointment.doctor.name.charAt(0)}</AvatarFallback>
            </Avatar>
          <div>
            <CardTitle className="text-lg">{appointment.doctor.name}</CardTitle>
            <CardDescription>{appointment.doctor.specialization}</CardDescription>
          </div>
        </div>
        {statusConfig[appointment.status].badge}
      </CardHeader>
      <CardContent className="grid gap-2 pt-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {statusConfig[appointment.status].icon}
          <span>{new Date(appointment.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-5 w-5" />
          <span>{appointment.time}</span>
        </div>
      </CardContent>
    </Card>
  );
}

function StatCard({ title, value, icon }: { title: string, value: string | number, icon: React.ReactNode }) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
            </CardContent>
        </Card>
    )
}

export default function PatientDashboardPage() {
  const { patient, isLoading } = usePatient();
  const upcomingAppointments = mockPatientAppointments.filter(a => a.status === 'upcoming');
  const pastAppointments = mockPatientAppointments.filter(a => a.status !== 'upcoming');
  
  if (isLoading) {
    return (
        <div className="space-y-8">
            <div>
                <Skeleton className="h-9 w-64" />
                <Skeleton className="h-5 w-80 mt-2" />
            </div>
             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Skeleton className="h-[120px]" />
                <Skeleton className="h-[120px]" />
                <Skeleton className="h-[120px]" />
                <Skeleton className="h-[120px]" />
            </div>
        </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {patient?.name.split(' ')[0]}!</h1>
        <p className="text-muted-foreground">Here's your health dashboard for today.</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Appointments" value={mockPatientAppointments.length} icon={<LineChart className="h-4 w-4 text-muted-foreground" />} />
        <StatCard title="Upcoming" value={upcomingAppointments.length} icon={<Calendar className="h-4 w-4 text-muted-foreground" />} />
        <StatCard title="Completed" value={pastAppointments.filter(a => a.status === 'completed').length} icon={<CheckCircle className="h-4 w-4 text-muted-foreground" />} />
        <StatCard title="Cancelled" value={pastAppointments.filter(a => a.status === 'cancelled').length} icon={<XCircle className="h-4 w-4 text-muted-foreground" />} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map(app => <AppointmentCard key={app.id} appointment={app} />)
            ) : (
              <p className="text-muted-foreground">No upcoming appointments.</p>
            )}
          </CardContent>
        </Card>
        
        <Card className="bg-primary/10 border-primary/20">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <Bot className="h-8 w-8 text-primary"/>
                    <CardTitle>AI Health Assistant</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                    Have a health question or need help finding a specialist? Our AI assistant is here to help.
                </p>
                <Button asChild className="w-full">
                    <Link href="/chatbot">Start a Chat</Link>
                </Button>
                 <Button asChild className="w-full" variant="outline">
                    <Link href="/doctors">Book an Appointment</Link>
                </Button>
            </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Appointment History</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pastAppointments.length > 0 ? (
              pastAppointments.map(app => <AppointmentCard key={app.id} appointment={app} />)
            ) : (
              <p className="text-muted-foreground">No past appointments.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
