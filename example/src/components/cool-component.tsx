import React from 'react'
import PropTypes from 'prop-types'
import { BaseComponent, BaseComponentPropTypes } from './base-component'
import { useLifecycle } from '@modular-ui-react/hooks'

export interface CoolComponentPropsTypes extends BaseComponentPropTypes {}

export const CoolComponent = ({
  children,
  className,
  ...props
}: CoolComponentPropsTypes) => {
  props.lifecycle = useLifecycle(props.lifecycle)

  props.lifecycle.onMount = (element: HTMLElement) => {
    console.log('[CoolComponent]: onMount()', element)

    return () => console.log('[CoolComponent]: onUnmount()', element)
  }

  props.lifecycle.onRender = (element: HTMLElement) => {
    console.log('[CoolComponent]: onRender()', element)
  }

  return (
    <BaseComponent
      className={['CoolComponent', className].join(' ')}
      {...props}
    >
      {children}
    </BaseComponent>
  )
}

CoolComponent.propTypes = {
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
