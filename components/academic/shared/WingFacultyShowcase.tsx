import Image from 'next/image'
import { Award, GraduationCap, UserCircle2 } from 'lucide-react'
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

/** Small portrait frame — sized to match card text, not oversized */
function FacultyPhoto({
  src,
  alt,
  variant = 'teacher',
}: {
  src: string
  alt: string
  variant?: 'incharge' | 'teacher'
}) {
  const frameClass =
    variant === 'incharge'
      ? 'h-14 w-12 sm:h-[58px] sm:w-[50px]'
      : 'h-12 w-10 sm:h-[52px] sm:w-[44px]'

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-md bg-primary-50 ring-1 ring-gray-200/80 ${frameClass}`}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-top"
          sizes={variant === 'incharge' ? '50px' : '44px'}
          priority={variant === 'incharge'}
        />
      ) : (
        <div className="flex h-full items-center justify-center text-primary-200">
          <UserCircle2 className={variant === 'incharge' ? 'h-6 w-6' : 'h-5 w-5'} />
        </div>
      )}
    </div>
  )
}

function WingInchargeCard({ member }: { member: PakiansFacultyPublicMember }) {
  const imageSrc = profileImageSrc(member.profileImageUrl)

  return (
    <article className="flex max-w-[260px] items-start gap-2.5 rounded-lg border border-primary-100/80 bg-primary-50/40 p-2.5 sm:gap-3 sm:p-3">
      <FacultyPhoto src={imageSrc} alt={member.name} variant="incharge" />
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-primary-600">
          Wing Incharge
        </p>
        <h3 className="mt-0.5 truncate text-sm font-semibold text-gray-900">{member.name}</h3>
        <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-gray-600">
          {member.highestQualification}
        </p>
        <p className="mt-0.5 text-[11px] text-gray-500">
          {experienceLabel(member.experienceYears)} exp.
        </p>
      </div>
    </article>
  )
}

function TeacherCard({ member }: { member: PakiansFacultyPublicMember }) {
  const imageSrc = profileImageSrc(member.profileImageUrl)

  return (
    <article className="flex items-start gap-2.5 rounded-lg border border-gray-100 bg-white p-2.5 transition-colors hover:border-primary-100 hover:bg-primary-50/20 sm:gap-3 sm:p-3">
      <FacultyPhoto src={imageSrc} alt={member.name} variant="teacher" />
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-medium text-gray-900">{member.name}</h3>
        {member.subjectTaught && (
          <p className="truncate text-[11px] text-primary-600">{member.subjectTaught}</p>
        )}
        <p className="mt-1 flex items-start gap-1 text-[11px] leading-snug text-gray-600">
          <GraduationCap className="mt-0.5 h-3 w-3 shrink-0 text-primary-400" />
          <span className="line-clamp-2">{member.highestQualification}</span>
        </p>
        <p className="mt-0.5 flex items-center gap-1 text-[11px] text-gray-500">
          <Award className="h-3 w-3 shrink-0 text-primary-400" />
          <span>{experienceLabel(member.experienceYears)} exp.</span>
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
    <section className="border-b border-gray-100 bg-white py-8 sm:py-10">
      <div className="container-custom px-4 sm:px-6">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-6">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary-600">
              {wingName}
            </p>
            <h2 className="mt-1 font-josefin text-2xl font-bold text-gray-900 sm:text-3xl">
              {introTitle}
            </h2>
            {introDescription && (
              <p className="mt-2 text-sm leading-relaxed text-gray-500">{introDescription}</p>
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
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="text-base font-semibold text-gray-900">Teachers</h3>
              <span className="text-xs text-gray-400">{teachers.length} verified</span>
            </div>

            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 xl:grid-cols-4">
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
