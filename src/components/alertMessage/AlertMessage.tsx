import styled from 'styled-components'
import { useEffect, FC } from 'react'
interface AlertMessageProps {
  message: string
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  show: boolean
}

const AlertMessageContent = styled.div`
  position: fixed;
  top: 10%;
  right: 10%;
  min-width: 300px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  border-radius: 10px;
  border: 1px solid red;
  z-index: 1000;
  background: #fff;
`

const AlertMessage: FC<AlertMessageProps> = ({ message, setShow, show }) => {
  console.log(show)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShow(false)
      console.log('run')
    }, 2000)
    return () => clearTimeout(timeoutId)
  }, [setShow])

  return (
    <>
      {show && (
        <AlertMessageContent>
          <p>{message}</p>
        </AlertMessageContent>
      )}
    </>
  )
}

export default AlertMessage
