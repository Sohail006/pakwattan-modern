import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Heart, Sparkles, Target } from 'lucide-react'
import type { House } from '@/lib/houses-data'
import { HOUSES } from '@/lib/houses-data'

type HouseDetailProps = {
  house: House
}

export default function HouseDetail({ house }: HouseDetailProps) {
  const otherHouses = HOUSES.filter((item) => item.id !== house.id)

  return (
    <div className="min-h-screen">
      <section className={`relative overflow-hidden bg-gradient-to-br ${house.accentClass} text-white`}>
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,175,55,0.15),_transparent_60%)]"
          aria-hidden
        />
        <div className="container-custom relative py-16 sm:py-20 lg:py-24">
          <Link
            href="/school-life#house-system"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors hover:text-accent-200"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to House System
          </Link>

          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="relative h-52 w-44 sm:h-64 sm:w-52 shrink-0 overflow-hidden rounded-2xl bg-black/30 ring-2 ring-accent-400/40 shadow-2xl">
              <Image
                src={house.crest.src}
                alt={house.crest.alt}
                width={house.crest.width}
                height={house.crest.height}
                priority
                className="h-full w-full object-contain p-2"
                sizes="(max-width: 1024px) 176px, 208px"
              />
            </div>
            <div className="text-center lg:text-left max-w-2xl">
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent-300">
                PWSCS House
              </p>
              <h1 className="font-josefin text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
                {house.name}
              </h1>
              <p className="text-lg sm:text-xl font-semibold italic text-accent-200 mb-4">
                &ldquo;{house.motto}&rdquo;
              </p>
              <p className="text-base sm:text-lg text-white/85 leading-relaxed">{house.description}</p>
              <div className="mt-5 flex flex-wrap justify-center lg:justify-start gap-2">
                {house.values.map((value) => (
                  <span
                    key={value}
                    className="rounded-full border border-accent-400/30 bg-black/20 px-3 py-1 text-sm font-medium text-accent-100"
                  >
                    {value}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <div className="rounded-2xl border border-primary-100 bg-primary-50/40 p-6 sm:p-7">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
                  <Heart className="h-5 w-5" aria-hidden />
                </span>
                <h2 className="font-josefin text-xl font-bold text-secondary-900">Our Namesake</h2>
              </div>
              <p className="mb-2 text-sm font-semibold text-primary-700">{house.namesakeTitle}</p>
              <p className="text-secondary-600 leading-relaxed">{house.namesakeBio}</p>
            </div>

            <div className="rounded-2xl border border-accent-100 bg-accent-50/30 p-6 sm:p-7">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-100 text-accent-700">
                  <Target className="h-5 w-5" aria-hidden />
                </span>
                <h2 className="font-josefin text-xl font-bold text-secondary-900">House Focus</h2>
              </div>
              <ul className="space-y-2.5">
                {house.focusAreas.map((area) => (
                  <li key={area} className="flex gap-2 text-secondary-700">
                    <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent-600" aria-hidden />
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-br from-secondary-50 to-primary-50/40 border-t border-secondary-100">
        <div className="container-custom max-w-4xl">
          <h2 className="font-josefin text-2xl sm:text-3xl font-bold text-secondary-900 text-center mb-8">
            Explore Other Houses
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {otherHouses.map((item) => (
              <Link
                key={item.id}
                href={`/school-life/houses/${item.id}`}
                className="group flex items-center gap-3 rounded-xl border border-secondary-100 bg-white p-4 shadow-sm transition-all hover:border-primary-200 hover:shadow-md"
              >
                <div className="relative h-14 w-11 shrink-0 overflow-hidden rounded-lg bg-secondary-900">
                  <Image
                    src={item.crest.src}
                    alt=""
                    width={44}
                    height={56}
                    className="h-full w-full object-contain p-0.5"
                    aria-hidden
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-secondary-900 group-hover:text-primary-700">
                    {item.shortName}
                  </p>
                  <p className="truncate text-xs text-secondary-500">{item.motto}</p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-secondary-400 group-hover:text-primary-600" aria-hidden />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
