import { AppLayout } from "@/components/shared/AppLayout";
import { mockDoctors } from "@/lib/mock-data";
import { DoctorCard } from "@/components/DoctorCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export default function DoctorsPage() {
  const specializations = [...new Set(mockDoctors.map(d => d.specialization))];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Find a Doctor</h1>
          <p className="text-muted-foreground">Search for specialists and book your appointment.</p>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Search by name or specialization..." className="pl-10" />
          </div>
          <Select>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="All Specializations" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All Specializations</SelectItem>
                {specializations.map(spec => (
                    <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mockDoctors.map(doctor => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
