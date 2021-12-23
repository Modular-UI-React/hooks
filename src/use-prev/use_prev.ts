import { useRef, useEffect, MutableRefObject } from 'react'

export const usePrev = (value: any) => {
  const ref: MutableRefObject<any> = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}
