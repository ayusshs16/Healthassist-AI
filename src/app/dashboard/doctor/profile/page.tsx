
"use client";

import { mockDoctors } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import React, { useRef, useState, useEffect } from 'react';

export default function DoctorProfilePage() {
  const [doctor, setDoctor] = useState(mockDoctors[0]);
  const [name, setName] = useState(doctor.name);
  const [specialization, setSpecialization] = useState(doctor.specialization);
  const [bio, setBio] = useState(doctor.bio);
  const [avatar, setAvatar] = useState(doctor.avatarUrl);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleSaveChanges = () => {
    setDoctor(prev => ({...prev!, name, specialization, bio, avatarUrl: avatar}));
    toast({
        title: "Profile Updated",
        description: "Your information has been successfully saved.",
    });
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Doctor Profile</CardTitle>
            <CardDescription>Update your professional information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={avatar} />
                <AvatarFallback>{name.charAt(0)}</AvatarFallback>
              </Avatar>
              <input type="file" ref={fileInputRef} onChange={handlePhotoUpload} className="hidden" accept="image/*" />
              <Button variant="outline" onClick={() => fileInputRef.current?.click()}>Change Photo</Button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialization">Specialization</Label>
              <Input id="specialization" value={specialization} onChange={e => setSpecialization(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" value={bio} onChange={e => setBio(e.target.value)} rows={5} />
            </div>
            <div className="flex justify-end">
                <Button onClick={handleSaveChanges}>Save Changes</Button>
            </div>
          </CardContent>
        </Card>
      </div>
       <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Manage your account preferences.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full">Change Password</Button>
            <Button variant="destructive" className="w-full">Delete Account</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
