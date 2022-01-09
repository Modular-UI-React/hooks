import { useLifecycle } from './use_lifecycle'
import { renderHook, act } from '@testing-library/react-hooks/native'

describe('useLifecycle hook', () => {
  const onInit = jest.fn(() => console.log('onInit()'))
  const onMount = jest.fn(() => console.log('onMount()'))
  const onRender = jest.fn(() => console.log('onRender()'))

  it('should return a copy of the input object containing the handler functions', () => {
    // const { result } = renderHook(() =>
    //   useLifecycle({ onInit, onMount, onRender })
    // )
    // console.log('result: ', result)
    // expect(result.current).toMatchObject({ onInit, onMount, onRender })
  })

  it('should allow modification of existing handler functions', () => {
    const { result } = renderHook(() =>
      useLifecycle({ onInit, onMount, onRender })
    )

    const onInit1 = jest.fn(() => console.log('onInit(): 1'))
    const onRender1 = jest.fn(() => console.log('onRender(): 1'))

    act(() => {
      result.current.onInit = onInit1
      result.current.onRender = onRender1

      result.current.onInit()
      result.current.onMount()
      result.current.onRender()
    })

    expect(onInit1).toHaveBeenCalled()
    expect(onRender1).toHaveBeenCalled()
    expect(onInit).toHaveBeenCalled()
    expect(onMount).toHaveBeenCalled()
    expect(onRender).toHaveBeenCalled()
  })
})
