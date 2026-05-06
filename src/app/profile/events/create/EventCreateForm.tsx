'use client';

import { useActionState, useState } from 'react';
import { format } from 'date-fns';
import { createEventAction } from '@/features/events/actions/event';
import { DISCIPLINES } from '@/features/events/constants/disciplines';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { DateTimePicker } from '@/components/ui/date-time-picker';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MapPin, AlertCircle, Calendar } from 'lucide-react';

interface GymOption {
  id: string;
  name: string;
  slug: string;
}

interface Props {
  gyms: GymOption[];
}

export default function EventCreateForm({ gyms }: Props) {
  const [state, action, pending] = useActionState(createEventAction, undefined);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [discipline, setDiscipline] = useState('');
  const [city, setCity] = useState('');
  const [date, setDate] = useState<Date | undefined>();
  const [poster, setPoster] = useState('');
  const [address, setAddress] = useState('');
  const [capacity, setCapacity] = useState('');
  const [registrationDeadline, setRegistrationDeadline] = useState<Date | undefined>();
  const [gymId, setGymId] = useState('none');
  const [posterError, setPosterError] = useState(false);

  const disciplineLabel = DISCIPLINES.find((d) => d.value === discipline)?.label ?? '';
  const formattedDate = date ? format(date, "d MMMM yyyy 'at' HH:mm") : null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      {/* ── Form ── */}
      <form action={action} className="space-y-8">
        {state?.error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{state.error}</AlertDescription>
          </Alert>
        )}

        {/* Required */}
        <div className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Event details
          </p>

          <div className="space-y-2">
            <Label htmlFor="title">
              Event title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              name="title"
              required
              placeholder="Belgrade Open BJJ 2026"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">
              Description <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="description"
              name="description"
              required
              rows={4}
              placeholder="What's happening, who it's for, format, rules, registration info…"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="discipline-select">
                Discipline <span className="text-destructive">*</span>
              </Label>
              <Select onValueChange={setDiscipline}>
                <SelectTrigger id="discipline-select">
                  <SelectValue placeholder="Select discipline" />
                </SelectTrigger>
                <SelectContent>
                  {DISCIPLINES.map((d) => (
                    <SelectItem key={d.value} value={d.value}>
                      {d.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <input type="hidden" name="discipline" value={discipline} readOnly />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">
                City <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="city"
                  name="city"
                  required
                  placeholder="Belgrade"
                  className="pl-9"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>
              Date &amp; time <span className="text-destructive">*</span>
            </Label>
            <DateTimePicker
              value={date}
              onChange={setDate}
              placeholder="Pick event date and time"
              disablePast
            />
            <input
              type="hidden"
              name="date"
              value={date ? date.toISOString() : ''}
              readOnly
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="poster">
              Poster URL <span className="text-destructive">*</span>
            </Label>
            <Input
              id="poster"
              name="poster"
              required
              type="url"
              placeholder="https://example.com/event-poster.jpg"
              value={poster}
              onChange={(e) => { setPoster(e.target.value); setPosterError(false); }}
            />
          </div>
        </div>

        <Separator />

        {/* Optional */}
        <div className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Optional details
          </p>

          <div className="space-y-2">
            <Label htmlFor="address">Venue address</Label>
            <Input
              id="address"
              name="address"
              placeholder="Sportski centar Olimp, hala 3"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="capacity">Max participants</Label>
              <Input
                id="capacity"
                name="capacity"
                type="number"
                min={1}
                placeholder="200"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Registration deadline</Label>
              <DateTimePicker
                value={registrationDeadline}
                onChange={setRegistrationDeadline}
                placeholder="No deadline"
              />
              <input
                type="hidden"
                name="registrationDeadline"
                value={registrationDeadline ? registrationDeadline.toISOString() : ''}
                readOnly
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="gym-select">Associated gym</Label>
            <Select defaultValue="none" onValueChange={setGymId}>
              <SelectTrigger id="gym-select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem key="none" value="none">No gym (standalone event)</SelectItem>
                {gyms.map((gym) => (
                  <SelectItem key={gym.id} value={gym.id}>
                    {gym.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <input
              type="hidden"
              name="gymId"
              value={gymId === 'none' ? '' : gymId}
              readOnly
            />
            <p className="text-xs text-muted-foreground">
              Link this event to a gym if it&apos;s hosted by or affiliated with one.
            </p>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? 'Creating event…' : 'Create event'}
        </Button>
      </form>

      {/* ── Live preview ── */}
      <div className="hidden md:block sticky top-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Preview
        </p>
        <Card className="overflow-hidden shadow-lg">
          <div className="aspect-video bg-muted relative">
            {poster && !posterError ? (
              <img
                src={poster}
                alt="Event poster"
                className="w-full h-full object-cover"
                onError={() => setPosterError(true)}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
                Poster image
              </div>
            )}
            {disciplineLabel && (
              <div className="absolute top-3 left-3">
                <Badge className="text-xs">{disciplineLabel}</Badge>
              </div>
            )}
          </div>

          <CardHeader className="pb-2">
            <CardTitle className="text-xl">
              {title || <span className="text-muted-foreground font-normal">Event title</span>}
            </CardTitle>
            <div className="space-y-1 text-sm text-muted-foreground">
              {city && (
                <p className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  {city}
                </p>
              )}
              {formattedDate && (
                <p className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 shrink-0" />
                  {formattedDate}
                </p>
              )}
            </div>
          </CardHeader>

          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground line-clamp-3">
              {description || <span className="italic">Your description will appear here</span>}
            </p>
            {capacity && (
              <p className="text-xs text-muted-foreground">
                Capacity: {capacity} participants
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
