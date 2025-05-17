
'use client';

import type { RecommendDoctorsOutput } from '@/ai/types/recommend-doctors.types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, MapPin, Phone, Stethoscope, Search } from 'lucide-react';
import Image from 'next/image';

interface DoctorRecommendationsDisplayProps {
  recommendations: RecommendDoctorsOutput;
  onSearchAnotherArea?: () => void;
}

export function DoctorRecommendationsDisplay({ recommendations, onSearchAnotherArea }: DoctorRecommendationsDisplayProps) {
  if (!recommendations.doctors || recommendations.doctors.length === 0) {
    return (
      <Card className="w-full shadow-lg mt-6">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center">
            <Users className="mr-2 h-6 w-6 text-primary" /> Doctor Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No doctors found matching your current criteria for the specified area.</p>
        </CardContent>
        {onSearchAnotherArea && (
          <CardFooter className="flex-col sm:flex-row items-start sm:items-center gap-2">
            <p className="text-sm text-muted-foreground flex-grow">You can try searching in a different area or broadening your criteria.</p>
            <Button onClick={onSearchAnotherArea} variant="outline">
              <Search className="mr-2 h-4 w-4" /> Search Another Area
            </Button>
          </CardFooter>
        )}
      </Card>
    );
  }

  return (
    <Card className="w-full shadow-lg mt-6">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center">
          <Users className="mr-2 h-6 w-6 text-primary" /> Doctor Recommendations
        </CardTitle>
        <CardDescription>
          Here are some doctors who might be able to help based on the suggested diagnoses. Please verify their suitability independently.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {recommendations.doctors.map((doctor) => (
          <Card key={doctor.id} className="overflow-hidden">
            <div className="md:flex">
              {doctor.imageUrl && (
                <div className="md:shrink-0">
                  <Image
                    src={doctor.imageUrl}
                    alt={`Image of ${doctor.name}`}
                    width={200}
                    height={150}
                    className="h-48 w-full object-cover md:h-full md:w-48"
                    data-ai-hint="clinic building"
                  />
                </div>
              )}
              <div className="p-4 md:p-6 flex-grow">
                <div className="flex items-center space-x-3 mb-2">
                   <Avatar>
                    {doctor.imageUrl ? <AvatarImage src={doctor.imageUrl} alt={doctor.name} /> : null }
                    <AvatarFallback>{doctor.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">{doctor.name}</h3>
                    <p className="text-sm text-primary flex items-center">
                      <Stethoscope className="mr-1 h-4 w-4" /> {doctor.specialty}
                    </p>
                  </div>
                </div>
                
                <div className="text-sm text-muted-foreground space-y-1 mt-3">
                  <p className="flex items-start">
                    <MapPin className="mr-2 h-4 w-4 mt-0.5 shrink-0" /> {doctor.address} ({doctor.area})
                  </p>
                  <p className="flex items-center">
                    <Phone className="mr-2 h-4 w-4 shrink-0" /> {doctor.phone}
                  </p>
                </div>

                {doctor.conditionsTreated && doctor.conditionsTreated.length > 0 && (
                  <div className="mt-3">
                    <h4 className="text-xs font-medium text-muted-foreground mb-1">Typically Treats:</h4>
                    <div className="flex flex-wrap gap-1">
                      {doctor.conditionsTreated.slice(0, 3).map((condition, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {condition}
                        </Badge>
                      ))}
                      {doctor.conditionsTreated.length > 3 && (
                         <Badge variant="outline" className="text-xs">
                          + {doctor.conditionsTreated.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </CardContent>
       <CardFooter className="flex-col sm:flex-row items-start sm:items-center gap-2">
        <p className="text-xs text-muted-foreground flex-grow">
          Please contact the clinics directly for appointments and to confirm if they treat your specific condition.
        </p>
        {onSearchAnotherArea && recommendations.doctors.length > 0 && (
            <Button onClick={onSearchAnotherArea} variant="outline" size="sm">
              <Search className="mr-2 h-4 w-4" /> Search Another Area
            </Button>
        )}
      </CardFooter>
    </Card>
  );
}
