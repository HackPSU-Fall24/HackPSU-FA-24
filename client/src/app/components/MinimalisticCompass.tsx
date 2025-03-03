import type React from "react"

interface MinimalisticCompassProps {
  className?: string
}

const MinimalisticCompass: React.FC<MinimalisticCompassProps> = ({ className }) => {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" />
      <path d="M50 5 L50 95 M5 50 L95 50" stroke="currentColor" strokeWidth="2" />
      <path d="M50 50 L75 25" stroke="#1E407C" strokeWidth="4" strokeLinecap="round" />
      <path d="M50 50 L25 75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="50" cy="50" r="3" fill="currentColor" />
    </svg>
  )
}

export default MinimalisticCompass

