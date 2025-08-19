
"use client";

import { mockDoctorAppointments } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Mail, Loader2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { sendEmail } from '@/ai/flows/send-email-flow';
import Link from 'next/link';
import { usePatient } from '@/hooks/use-patient';
import { Skeleton } from '@/components/ui/skeleton';


export default function DoctorDashboardPage() {
  const { patient, isLoading } = usePatient(); 
  const { toast } = useToast();
  const [isSending, setIsSending] = useState<string | null>(null);

  const handleContactPatient = async (patientName: string) => {
    if (!patient) return;
    setIsSending(patientName);
    try {
      await sendEmail({
        to: 'patient@example.com', // Use actual patient email in a real app
        subject: `A message from Dr. ${patient.name.split(' ').pop()}`,
        body: `This is a message from your doctor, ${patient.name}. Please log in to the portal to view details.`,
      });
      toast({
        title: "Email Sent",
        description: `An email has been sent to ${patientName}.`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send email.",
        variant: "destructive"
      });
    } finally {
      setIsSending(null);
    }
  };

  if (isLoading || !patient) {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-5 w-64 mt-2" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-48 w-full" />
                </CardContent>
            </Card>
        </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Welcome back, Dr. {patient.name.split(' ').pop()}!</CardTitle>
              <CardDescription>Here is your appointment schedule for today.</CardDescription>
            </div>
            <Button asChild>
              <Link href="/dashboard/doctor/profile">Manage Profile</Link>
            </Button>
          </CardHeader>
          <CardContent>
              <Table>
                  <TableHeader>
                      <TableRow>
                          <TableHead>Patient</TableHead>
                          <TableHead>Time</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead><span className="sr-only">Actions</span></TableHead>
                      </TableRow>
                  </TableHeader>
                  <TableBody>
                      {mockDoctorAppointments.map(appointment => (
                          <TableRow key={appointment.id}>
                              <TableCell>
                                  <div className="font-medium">{appointment.patientName}</div>
                                  <div className="text-sm text-muted-foreground">{appointment.notes}</div>
                              </TableCell>
                              <TableCell>{appointment.time}</TableCell>
                              <TableCell>
                                  <Badge variant={appointment.status === 'upcoming' ? 'default' : 'secondary'}>{appointment.status}</Badge>
                              </TableCell>
                              <TableCell>
                              <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                  <Button aria-haspopup="true" size="icon" variant="ghost">
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">Toggle menu</span>
                                  </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                      <DropdownMenuItem>View Details</DropdownMenuItem>
                                      <DropdownMenuItem
                                          onClick={() => handleContactPatient(appointment.patientName)}
                                          disabled={isSending === appointment.patientName}
                                      >
                                          {isSending === appointment.patientName ? (
                                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                          ) : (
                                              <Mail className="mr-2 h-4 w-4" />
                                          )}
                                          <span>Contact Patient</span>
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>Cancel</DropdownMenuItem>
                                  </DropdownMenuContent>
                              </DropdownMenu>
                              </TableCell>
                          </TableRow>
                      ))}
                  </TableBody>
              </Table>
          </CardContent>
      </Card>
    </div>
  );
}
