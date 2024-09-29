import type { ReactNode } from 'react'

export type CommonButtonProps = {
  children?: ReactNode
  textColor?: string
  bgColor?: string
  fontSize?: string
  onClick?: () => void
}

export default function CommonButton({
  children,
  textColor = 'white',
  bgColor = '#AABFB2',
  fontSize = '1.25rem',
  onClick = () => {},
}: CommonButtonProps) {
  return (
    <button
      style={{ color: textColor, backgroundColor: bgColor, fontSize }}
      className={`flex-auto mx-15 my-2 py-4 rounded-full border-none outline-none`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
