import React from 'react'
import PropTypes from 'prop-types'
import { CoolComponent, CoolComponentPropsTypes } from './cool-component'
import { useLifecycle } from '@modular-ui-react/hooks'

export interface CoolerComponentPropTypes extends CoolComponentPropsTypes {}

export const CoolerComponent = ({
  children,
  className,
  ...props
}: CoolerComponentPropTypes) => {
  props.lifecycle = useLifecycle(props.lifecycle)

  props.lifecycle.onMount = (element: HTMLElement) => {
    console.log('[CoolerComponent]: onMount()', element)

    return () => console.log('[CoolerComponent]: onUnmount()', element)
  }

  props.lifecycle.onRender = (element: HTMLElement) => {
    console.log('[CoolerComponent]: onRender()', element)
  }

  return (
    <CoolComponent
      className={['CoolerComponent', className].join(' ')}
      {...props}
    >
      {children}
    </CoolComponent>
  )
}

CoolerComponent.propTypes = {
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
