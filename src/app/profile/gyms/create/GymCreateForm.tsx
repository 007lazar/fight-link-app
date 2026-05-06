'use client';

import { useActionState, useState, useRef } from 'react';
import { createGymAction } from '@/features/gyms/actions/gym';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { X, MapPin, Phone, AtSign, Globe, AlertCircle } from 'lucide-react';

export default function GymCreateForm() {
  const [state, action, pending] = useActionState(createGymAction, undefined);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [poster, setPoster] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [instagram, setInstagram] = useState('');
  const [website, setWebsite] = useState('');
  const [requiresApproval, setRequiresApproval] = useState(false);
  const [badges, setBadges] = useState<string[]>([]);
  const [badgeInput, setBadgeInput] = useState('');
  const [posterError, setPosterError] = useState(false);

  const badgeRef = useRef<HTMLInputElement>(null);

  function addBadge(value: string) {
    const trimmed = value.trim();
    if (!trimmed || badges.includes(trimmed) || badges.length >= 10 || trimmed.length > 32) return;
    setBadges((prev) => [...prev, trimmed]);
    setBadgeInput('');
  }

  function removeBadge(badge: string) {
    setBadges((prev) => prev.filter((b) => b !== badge));
  }

  function onBadgeKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addBadge(badgeInput);
    } else if (e.key === 'Backspace' && badgeInput === '') {
      setBadges((prev) => prev.slice(0, -1));
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      {/* Form */}
      <form action={action} className="space-y-6">
        {state?.error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{state.error}</AlertDescription>
          </Alert>
        )}

        {/* Required fields */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">
              Gym name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              required
              placeholder="Elite MMA Belgrade"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              placeholder="Tell fighters what makes your gym unique — disciplines, coaching style, atmosphere..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
              placeholder="https://example.com/your-gym-photo.jpg"
              value={poster}
              onChange={(e) => { setPoster(e.target.value); setPosterError(false); }}
            />
            <p className="text-xs text-muted-foreground">
              Direct link to your gym&apos;s main photo. Use a landscape image for best results.
            </p>
          </div>
        </div>

        <Separator />

        {/* Optional fields */}
        <div className="space-y-4">
          <p className="text-sm font-medium text-muted-foreground">Optional details</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="city"
                  name="city"
                  placeholder="Belgrade"
                  className="pl-9"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                placeholder="Knez Mihailova 1"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+381 11 123 4567"
                  className="pl-9"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram</Label>
              <div className="relative">
                <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="instagram"
                  name="instagram"
                  placeholder="@yourgym"
                  className="pl-9"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="website"
                name="website"
                type="url"
                placeholder="https://yourgym.rs"
                className="pl-9"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
          </div>

          {/* Badge chip input */}
          <div className="space-y-2">
            <Label>Tags / Disciplines</Label>
            <div
              className="flex flex-wrap gap-2 min-h-10 w-full rounded-md border border-input bg-background px-3 py-2 cursor-text"
              onClick={() => badgeRef.current?.focus()}
            >
              {badges.map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full"
                >
                  {badge}
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); removeBadge(badge); }}
                    className="hover:opacity-70 transition-opacity"
                    aria-label={`Remove ${badge}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              {badges.length < 10 && (
                <input
                  key="badge-input"
                  ref={badgeRef}
                  type="text"
                  value={badgeInput}
                  onChange={(e) => setBadgeInput(e.target.value)}
                  onKeyDown={onBadgeKeyDown}
                  onBlur={() => addBadge(badgeInput)}
                  placeholder={badges.length === 0 ? 'MMA, BJJ, Boxing… (Enter to add)' : ''}
                  className="flex-1 min-w-24 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
                />
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Press Enter or comma to add a tag. Max 10 tags.
            </p>
            {/* Hidden input so FormData picks up badges */}
            <input type="hidden" name="badges" value={JSON.stringify(badges)} readOnly />
          </div>

          {/* Requires approval */}
          <div className="flex items-start gap-3">
            <Checkbox
              id="requiresApproval"
              checked={requiresApproval}
              onCheckedChange={(val) => setRequiresApproval(val === true)}
            />
            {/* Hidden input for FormData */}
            <input type="hidden" name="requiresApproval" value={String(requiresApproval)} readOnly />
            <div className="space-y-1">
              <Label htmlFor="requiresApproval" className="cursor-pointer">
                Require approval to join
              </Label>
              <p className="text-xs text-muted-foreground">
                When enabled, you must approve each member request manually.
              </p>
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? 'Creating gym…' : 'Create gym'}
        </Button>
      </form>

      {/* Live preview — desktop only */}
      <div className="hidden md:block sticky top-8">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">Preview</p>
        <Card className="overflow-hidden">
          <div className="aspect-video bg-muted relative">
            {poster && !posterError ? (
              <img
                src={poster}
                alt="Gym poster"
                className="w-full h-full object-cover"
                onError={() => setPosterError(true)}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
                Poster image
              </div>
            )}
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">
              {name || <span className="text-muted-foreground font-normal">Gym name</span>}
            </CardTitle>
            {city && (
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {city}
              </p>
            )}
          </CardHeader>
          <CardContent className="space-y-3">
            {description ? (
              <p className="text-sm text-muted-foreground line-clamp-3">{description}</p>
            ) : (
              <p className="text-sm text-muted-foreground italic">Your description will appear here</p>
            )}
            {badges.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {badges.map((b) => (
                  <Badge key={b} variant="secondary" className="text-xs">
                    {b}
                  </Badge>
                ))}
              </div>
            )}
            {requiresApproval && (
              <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                Requires approval to join
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
