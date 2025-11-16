import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
const ALL_TIMES = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
];
export function PractitionerAvailability() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  // Using a Map to store availability for each day (YYYY-MM-DD -> Set of times)
  const [availability, setAvailability] = useState<Map<string, Set<string>>>(new Map());
  const selectedDateKey = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';
  const availableTimesForSelectedDate = availability.get(selectedDateKey) || new Set<string>();
  const handleTimeToggle = (time: string) => {
    if (!selectedDate) return;
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    setAvailability(prev => {
      const newAvailability = new Map(prev);
      const timesForDate = new Set(newAvailability.get(dateKey) || []);
      if (timesForDate.has(time)) {
        timesForDate.delete(time);
      } else {
        timesForDate.add(time);
      }
      newAvailability.set(dateKey, timesForDate);
      return newAvailability;
    });
  };
  const handleSaveChanges = () => {
    // In a real app, this would be an API call.
    console.log('Saving availability:', availability);
    toast.success('Availability updated!', {
      description: 'Your changes have been saved and are reflected for seekers.',
    });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Availability</CardTitle>
        <CardDescription>Select a date and choose the time slots you are available for sessions.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 flex justify-center">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
            disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
          />
        </div>
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold mb-4 text-center">
            Available times for {selectedDate ? format(selectedDate, 'PPP') : '...'}
          </h3>
          {selectedDate ? (
            <>
              <div className="grid grid-cols-3 gap-2">
                {ALL_TIMES.map(time => (
                  <Button
                    key={time}
                    variant={availableTimesForSelectedDate.has(time) ? 'default' : 'outline'}
                    onClick={() => handleTimeToggle(time)}
                    className={cn(
                      "transition-all",
                      availableTimesForSelectedDate.has(time) && "shadow-md"
                    )}
                  >
                    {time}
                  </Button>
                ))}
              </div>
              <div className="mt-6 flex justify-end">
                <Button onClick={handleSaveChanges}>Save Changes</Button>
              </div>
            </>
          ) : (
            <p className="text-center text-muted-foreground py-8">Please select a date to set your availability.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}