import React from 'react'
import { CoolerComponent } from './components/cooler-component'

const App = () => {
  const onMount: Function = (element: HTMLElement) => {
    console.log('[App]: onMount(): ', element)

    return () => console.log('[App]: onUnmount(): ', element)
  }
  const onRender: Function = (element: HTMLElement) =>
    console.log('[App]: onRender(): ', element)
  return (
    <CoolerComponent lifecycle={{ onMount, onRender }}>
      <>Create React Library Example 😄</>
    </CoolerComponent>
  )
}

export default App
