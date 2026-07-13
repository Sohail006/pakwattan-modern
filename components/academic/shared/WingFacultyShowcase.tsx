import Image from 'next/image'
import { Award, GraduationCap, ShieldCheck, UserCircle2 } from 'lucide-react'
import type { PakiansFacultyPublicMember } from '@/lib/api/pakiansFaculty'
import { getApiBaseUrl } from '@/lib/config'

function profileImageSrc(url?: string): string {
  if (!url) return ''
  if (url.startsWith('http')) return url
  return `${getApiBaseUrl()}${url.startsWith('/') ? url : `/${url}`}`
}

function isWingIncharge(roleType?: string | null): boolean {
  return String(roleType ?? '').toLowerCase() === 'wingincharge'
}

function isTeacher(roleType?: string | null): boolean {
  return String(roleType ?? '').toLowerCase() === 'teacher'
}

function experienceLabel(years: number): string {
  if (years === 1) return '1 year'
  return `${years} years`
}

function FacultyPhoto({
  src,
  alt,
  variant = 'teacher',
}: {
  src: string
  alt: string
  variant?: 'incharge' | 'teacher'
}) {
  const size =
    variant === 'incharge'
      ? 'h-[68px] w-[56px] sm:h-[72px] sm:w-[60px]'
      : 'h-14 w-12 sm:h-[60px] sm:w-[50px]'

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-lg bg-gradient-to-b from-primary-50 to-white shadow-sm ring-1 ring-primary-100 ${size}`}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-top"
          sizes={variant === 'incharge' ? '60px' : '50px'}
          priority={variant === 'incharge'}
        />
      ) : (
        <div className="flex h-full items-center justify-center text-primary-200">
          <UserCircle2 className="h-6 w-6" />
        </div>
      )}
    </div>
  )
}

function WingInchargeCard({ member }: { member: PakiansFacultyPublicMember }) {
  const imageSrc = profileImageSrc(member.profileImageUrl)

  return (
    <article className="relative overflow-hidden rounded-2xl border border-primary-100 bg-white p-4 shadow-md shadow-primary-900/5 sm:min-w-[280px]">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-600" />
      <div className="flex items-start gap-3">
        <FacultyPhoto src={imageSrc} alt={member.name} variant="incharge" />
        <div className="min-w-0 flex-1 pt-0.5">
          <span className="inline-flex items-center rounded-full bg-primary-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary-700">
            Wing Incharge
          </span>
          <h3 className="mt-1.5 text-base font-bold text-gray-900">{member.name}</h3>
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-gray-600">
            {member.highestQualification}
          </p>
          <p className="mt-1 text-xs font-medium text-primary-600">
            {experienceLabel(member.experienceYears)} experience
          </p>
        </div>
      </div>
    </article>
  )
}

function TeacherCard({ member }: { member: PakiansFacultyPublicMember }) {
  const imageSrc = profileImageSrc(member.profileImageUrl)

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-md">
      <div className="flex flex-col items-center text-center">
        <FacultyPhoto src={imageSrc} alt={member.name} variant="teacher" />
        <h3 className="mt-3 line-clamp-1 text-sm font-semibold text-gray-900">{member.name}</h3>
        {member.subjectTaught && (
          <p className="mt-0.5 text-xs font-medium text-accent-600">{member.subjectTaught}</p>
        )}
      </div>
      <div className="mt-3 flex-1 space-y-1.5 border-t border-gray-50 pt-3">
        <p className="flex items-start gap-1.5 text-xs leading-snug text-gray-600">
          <GraduationCap className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary-500" />
          <span className="line-clamp-2">{member.highestQualification}</span>
        </p>
        <p className="flex items-center gap-1.5 text-xs text-gray-500">
          <Award className="h-3.5 w-3.5 shrink-0 text-primary-500" />
          <span>{experienceLabel(member.experienceYears)} experience</span>
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
  introTitle = 'Our Faculty',
  introDescription,
}: WingFacultyShowcaseProps) {
  const wingIncharge = members.find((m) => isWingIncharge(m.roleType))
  const teachers = members.filter((m) => isTeacher(m.roleType))

  if (!wingIncharge && teachers.length === 0) {
    return null
  }

  return (
    <section className="relative bg-gradient-to-b from-white via-primary-50/40 to-white pb-12 pt-2 sm:pb-16 sm:pt-4">
      <div className="container-custom px-4 sm:px-6">
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-lg">
            <div className="mb-2 flex items-center gap-2 text-xs font-medium text-primary-600">
              <ShieldCheck className="h-4 w-4" />
              <span>Verified School Faculty</span>
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary-500">
              {wingName}
            </p>
            <h2 className="mt-1 font-josefin text-2xl font-bold text-gray-900 sm:text-3xl">
              <span className="text-gradient">{introTitle}</span>
            </h2>
            {introDescription && (
              <p className="mt-2 text-sm leading-relaxed text-gray-500 sm:text-base">
                {introDescription}
              </p>
            )}
          </div>

          {wingIncharge && (
            <div className="shrink-0 lg:ml-auto">
              <WingInchargeCard member={wingIncharge} />
            </div>
          )}
        </div>

        {teachers.length > 0 && (
          <div>
            <div className="mb-5 flex items-center gap-3">
              <h3 className="font-josefin text-lg font-semibold text-gray-900">Our Teachers</h3>
              <span className="rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-semibold text-primary-700">
                {teachers.length}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
              {teachers.map((member) => (
                <TeacherCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
