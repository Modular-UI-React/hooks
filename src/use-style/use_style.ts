import {
  useState,
  useEffect,
  useRef,
  useCallback,
  MutableRefObject
} from 'react'
import isDeepEqual from 'fast-deep-equal/react'
import { mergeObjects } from '@modular-ui-react/utils'
import { usePrev } from '../use-prev/use_prev'

export const useStyle = (style: object, onChange: Function) => {
  style = style ?? {}

  const styleObserverRef = useRef(style)

  if (!isDeepEqual(styleObserverRef.current, style)) {
    styleObserverRef.current = style
  }

  const styleRef: MutableRefObject<object> = useRef(style)
  const prevStyle: MutableRefObject<object> = usePrev(style)
  const [inlineStyle, setInlineStyle] = useState(style)

  const updateStyle = useCallback((styleUpdate) => {
    const merged = mergeObjects(styleRef.current, styleUpdate)
    onChange?.(styleRef.current, styleUpdate, merged)
    styleRef.current = merged
    return merged
  }, [])

  useEffect(() => {
    if (prevStyle != null) {
      setInlineStyle(() => updateStyle(styleObserverRef.current))
    }
  }, [styleObserverRef.current])

  return [
    inlineStyle,
    (styleUpdate: Function | object, render = true) => {
      if (render) {
        if (typeof styleUpdate === 'function') {
          setInlineStyle(() => updateStyle(styleUpdate(styleRef.current)))
        } else {
          setInlineStyle(() => updateStyle(styleUpdate))
        }
      } else {
        if (typeof styleUpdate === 'function') {
          styleRef.current = mergeObjects(
            styleRef.current,
            styleUpdate(styleRef.current)
          )
        } else {
          styleRef.current = mergeObjects(styleRef.current, styleUpdate)
        }
      }
    },
    styleRef
  ]
}
