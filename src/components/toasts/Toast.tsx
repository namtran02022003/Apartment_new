import { FC, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { hideToast } from './ToastActions'
import styled from 'styled-components'

const ToastStyled = styled.div`
  position: fixed;
  top: 5%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  border: ${(props) => `2px solid ${props.color}`};
  z-index: 1000;
  background: #fff;
  p {
    color: ${(props) => `${props.color}`};
  }
`
const Toast: FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const toast = useSelector((state: any) => state.toast)
  const dispatch = useDispatch()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  useEffect(() => {
    if (toast.visible) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => {
        console.log('oki')
        dispatch(hideToast())
      }, 3000)
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [toast.visible, dispatch])
  return (
    <>
      {toast.visible && (
        <ToastStyled color={toast.color}>
          <p>{toast.message}</p>
        </ToastStyled>
      )}
    </>
  )
}

export default Toast
