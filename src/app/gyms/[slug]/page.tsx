import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, Phone, AtSign, Globe, ShieldCheck, ArrowLeft } from 'lucide-react';

import { api, ApiError } from '@/lib/api';
import { getUser } from '@/lib/auth';
import type { GymModel } from '@/features/gyms/types';
import type { MembershipStatus } from '@/components/gyms/GymJoinButton';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { GymJoinButton } from '@/components/gyms/GymJoinButton';
import {MyMembership} from "@/features/gyms/types";


async function getGym(slug: string): Promise<GymModel> {
  try {
    return await api.get<GymModel>(`/gyms/${slug}`);
  } catch (e) {
    if (e instanceof ApiError && e.status === 404) notFound();
    throw e;
  }
}

type Props = { params: Promise<{ slug: string }> };

export default async function GymProfilePage({ params }: Props) {
  const { slug } = await params;
  const [gym, user] = await Promise.all([getGym(slug), getUser()]);

  const hasContact = gym.address || gym.city || gym.phone || gym.instagram || gym.website;
  const isOwner = user?.id === gym.ownerId;

  let membershipStatus: MembershipStatus = 'NONE';
  if (user && !isOwner) {
    const memberships = await api.get<MyMembership[]>('/users/me/memberships');
    const mine = memberships.find((m) => m.gym.slug === slug);
    if (mine?.status === 'APPROVED') membershipStatus = 'APPROVED';
    else if (mine?.status === 'PENDING') membershipStatus = 'PENDING';
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Hero poster */}
      {gym.poster && (
        <div className="relative w-full aspect-[21/9] rounded-xl overflow-hidden">
          <Image
            src={gym.poster}
            alt={gym.name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 896px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}

      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-3xl font-bold tracking-tight">{gym.name}</h1>
            {gym.verified && (
              <ShieldCheck className="size-6 text-primary shrink-0" />
            )}
          </div>
          {gym.city && (
            <p className="flex items-center gap-1.5 text-muted-foreground text-sm">
              <MapPin className="size-4" />
              {gym.city}
            </p>
          )}
          {gym.badges.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {gym.badges.map((badge) => (
                <Badge key={badge} variant="secondary">
                  {badge}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div className="shrink-0">
          {!user && (
            <Link href="/login" className={buttonVariants({ size: 'lg' })}>
              Login to join
            </Link>
          )}
          {user && !isOwner && (
            <GymJoinButton
              slug={slug}
              membershipStatus={membershipStatus}
              requiresApproval={gym.requiresApproval}
            />
          )}
        </div>
      </div>

      {/* Description */}
      {gym.description && (
        <p className="text-muted-foreground leading-relaxed">{gym.description}</p>
      )}

      {/* Contact info */}
      {hasContact && (
        <>
          <Separator />
          <Card>
            <CardContent className="pt-4">
              <h2 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">
                Contact & Location
              </h2>
              <ul className="space-y-2 text-sm">
                {gym.address && (
                  <li className="flex items-center gap-2">
                    <MapPin className="size-4 text-muted-foreground shrink-0" />
                    <span>{gym.address}{gym.city ? `, ${gym.city}` : ''}</span>
                  </li>
                )}
                {gym.phone && (
                  <li className="flex items-center gap-2">
                    <Phone className="size-4 text-muted-foreground shrink-0" />
                    <a href={`tel:${gym.phone}`} className="hover:underline">
                      {gym.phone}
                    </a>
                  </li>
                )}
                {gym.instagram && (
                  <li className="flex items-center gap-2">
                    <AtSign className="size-4 text-muted-foreground shrink-0" />
                    <a
                      href={`https://instagram.com/${gym.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {gym.instagram.startsWith('@') ? gym.instagram : `@${gym.instagram}`}
                    </a>
                  </li>
                )}
                {gym.website && (
                  <li className="flex items-center gap-2">
                    <Globe className="size-4 text-muted-foreground shrink-0" />
                    <a
                      href={gym.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline truncate"
                    >
                      {gym.website.replace(/^https?:\/\//, '')}
                    </a>
                  </li>
                )}
              </ul>
            </CardContent>
          </Card>
        </>
      )}

      {/* Back link */}
      <div className="pt-2">
        <Link href="/gyms" className={buttonVariants({ variant: 'ghost', size: 'sm' })}>
          <ArrowLeft className="size-4" />
          Back to gyms
        </Link>
      </div>
    </div>
  );
}
