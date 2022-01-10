import { useState, useRef, MutableRefObject } from 'react'

export const useData = (
  initialState: any
): [any, Function, MutableRefObject<any>] => {
  const stateRef = useRef(initialState)
  const [state, setState] = useState(initialState)

  return [
    state,
    (stateUpdate: any, render = true) => {
      if (typeof stateUpdate === 'function') {
        if (render) {
          setState((prevState: any) => {
            const updated = stateUpdate(prevState)
            stateRef.current = updated
            return updated
          })
        } else {
          stateRef.current = stateUpdate(stateRef.current)
        }
      } else {
        stateRef.current = stateUpdate
        if (render) {
          setState(stateUpdate)
        }
      }
    },
    stateRef
  ]
}
