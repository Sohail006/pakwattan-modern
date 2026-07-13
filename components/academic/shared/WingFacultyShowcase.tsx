import Image from 'next/image'
import { Award, BookOpen, GraduationCap, Sparkles, Users } from 'lucide-react'
import type { PakiansFacultyPublicMember } from '@/lib/api/pakiansFaculty'
import { getApiBaseUrl } from '@/lib/config'

function profileImageSrc(url?: string): string {
  if (!url) return ''
  if (url.startsWith('http')) return url
  return `${getApiBaseUrl()}${url.startsWith('/') ? url : `/${url}`}`
}

function experienceLabel(years: number): string {
  if (years === 1) return '1 year experience'
  return `${years} years experience`
}

function SectionHeadCard({ member }: { member: PakiansFacultyPublicMember }) {
  const imageSrc = profileImageSrc(member.profileImageUrl)

  return (
    <article className="relative w-full max-w-sm lg:max-w-md lg:ml-auto">
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-accent-400 via-primary-500 to-primary-700 opacity-80 blur-sm" />
      <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white shadow-2xl">
        <div className="bg-gradient-to-r from-primary-700 to-primary-600 px-5 py-3 text-white">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide">
            <Sparkles className="h-4 w-4 text-accent-300" />
            Wing Incharge
          </div>
        </div>
        <div className="p-5 sm:p-6">
          <div className="relative mx-auto mb-5 aspect-[4/5] w-full max-w-[240px] overflow-hidden rounded-2xl bg-gradient-to-br from-primary-50 to-accent-50 ring-4 ring-primary-100">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={member.name}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 240px, 280px"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center text-primary-300">
                <Users className="h-16 w-16" />
              </div>
            )}
          </div>
          <h3 className="text-center text-xl font-bold text-gray-900">{member.name}</h3>
          <p className="mt-1 text-center text-sm font-medium text-primary-700">Wing Incharge</p>
          <div className="mt-4 space-y-2 border-t border-gray-100 pt-4 text-sm text-gray-600">
            <p className="flex items-start gap-2">
              <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" />
              <span>{member.highestQualification}</span>
            </p>
            <p className="flex items-start gap-2">
              <Award className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" />
              <span>{experienceLabel(member.experienceYears)}</span>
            </p>
            {member.subjectTaught && (
              <p className="flex items-start gap-2">
                <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" />
                <span>{member.subjectTaught}</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

function FacultyCard({ member }: { member: PakiansFacultyPublicMember }) {
  const imageSrc = profileImageSrc(member.profileImageUrl)

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-primary-100/80 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-600 opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-primary-50 to-white">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={member.name}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-primary-200">
            <Users className="h-14 w-14" />
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-primary-950/75 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-lg font-bold text-white drop-shadow-sm">{member.name}</p>
        </div>
      </div>
      <div className="space-y-2 p-4 sm:p-5">
        {member.subjectTaught && (
          <p className="text-xs font-semibold uppercase tracking-wide text-accent-600">
            {member.subjectTaught}
          </p>
        )}
        <p className="flex items-start gap-2 text-sm text-gray-700">
          <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" />
          <span>{member.highestQualification}</span>
        </p>
        <p className="flex items-start gap-2 text-sm text-gray-600">
          <Award className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" />
          <span>{experienceLabel(member.experienceYears)}</span>
        </p>
      </div>
    </article>
  )
}

interface WingFacultyShowcaseProps {
  wingName: string
  members: PakiansFacultyPublicMember[]
  introTitle?: string
  introDescription?: string
}

export default function WingFacultyShowcase({
  wingName,
  members,
  introTitle = 'Meet Our Faculty',
  introDescription = 'Only admin-verified School Faculty who are marked active appear here.',
}: WingFacultyShowcaseProps) {
  const wingIncharge = members.find((m) => m.roleType === 'WingIncharge')
  const teachers = members.filter((m) => m.roleType === 'Teacher')

  if (!wingIncharge && teachers.length === 0) {
    return null
  }

  return (
    <section className="relative overflow-hidden py-16 sm:py-20">
      <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-accent-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-primary-200/30 blur-3xl" />

      <div className="container-custom relative px-4 sm:px-6">
        <div className="mb-10 lg:mb-14">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-start lg:gap-12">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-800">
                <Users className="h-3.5 w-3.5" />
                {wingName}
              </span>
              <h2 className="mt-4 font-josefin text-3xl font-bold text-gray-900 sm:text-4xl">
                {introTitle}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-gray-600 sm:text-lg">
                {introDescription}
              </p>
            </div>

            {wingIncharge && (
              <div className="order-first lg:order-none lg:sticky lg:top-24">
                <SectionHeadCard member={wingIncharge} />
              </div>
            )}
          </div>
        </div>

        {teachers.length > 0 && (
          <div>
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Teachers</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Verified School Faculty teachers in the {wingName.toLowerCase()}.
                </p>
              </div>
              <span className="hidden rounded-full bg-white px-3 py-1 text-sm font-semibold text-primary-700 shadow-sm ring-1 ring-primary-100 sm:inline-flex">
                {teachers.length} member{teachers.length === 1 ? '' : 's'}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {teachers.map((member) => (
                <FacultyCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
