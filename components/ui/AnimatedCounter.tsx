'use client'

import { useEffect, useState } from 'react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

type AnimatedCounterProps = {
  end: number
  suffix?: string
  duration?: number
  className?: string
}

const AnimatedCounter = ({
  end,
  suffix = '',
  duration = 1800,
  className = '',
}: AnimatedCounterProps) => {
  const [value, setValue] = useState(0)
  const [ref, entry] = useIntersectionObserver({
    threshold: 0.4,
    freezeOnceVisible: true,
  })

  useEffect(() => {
    if (!entry?.isIntersecting) return

    const start = performance.now()
    let frame = 0

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      setValue(Math.floor(end * eased))
      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      } else {
        setValue(end)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [entry?.isIntersecting, end, duration])

  return (
    <span ref={ref} className={className}>
      {value.toLocaleString()}
      {suffix}
    </span>
  )
}

export default AnimatedCounter
