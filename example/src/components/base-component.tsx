import React, { useRef, useEffect, MutableRefObject } from 'react'
import PropTypes from 'prop-types'
import { useStyle } from '@modular-ui-react/hooks'

/*
 *	All app components supposedly inherits this component
 */
export interface BaseComponentPropTypes {
  children?: JSX.Element | JSX.Element[]
  className?: string
  style?: object
  lifecycle?: {
    onMount?: Function
    onRender?: Function
    onStyleChange?: Function
  }
}

export const BaseComponent = ({
  children,
  className,
  style,
  lifecycle: { onMount, onRender, onStyleChange } = {},
  ...props
}: BaseComponentPropTypes) => {
  const ref: MutableRefObject<HTMLDivElement> = useRef()

  const [inlineStyle] = useStyle(style, onStyleChange)

  useEffect(() => {
    return onMount?.(ref.current)
  }, [onMount])

  useEffect(() => {
    onRender?.(ref.current)
  })

  return (
    <div
      ref={ref}
      className={['BaseComponent', className].join(' ')}
      style={inlineStyle}
      {...props}
    >
      {children}
    </div>
  )
}

BaseComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  className: PropTypes.string,
  lifecycle: PropTypes.shape({
    onRender: PropTypes.func,
    onMount: PropTypes.func,
    onStyleChange: PropTypes.func
  })
}
