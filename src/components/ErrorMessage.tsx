import type { ReactNode } from "react"

type ErrorMessageProps = {
    children: ReactNode
}
export default function ErrorMessage({children} : ErrorMessageProps) {
  return (
    <p className="bg-red-600 font-bold text-white p-2 text-sm text-center">
        {children}
    </p>
  )
}
