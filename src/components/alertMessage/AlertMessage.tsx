import styled from 'styled-components'
import { useEffect, FC } from 'react'
interface AlertMessageProps {
  message: string
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  show: boolean
}

const AlertMessageWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const AlertMessageContent = styled.div`
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  border-radius: 10px;
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
        <AlertMessageWrapper>
          <AlertMessageContent>
            <p>{message}</p>
          </AlertMessageContent>
        </AlertMessageWrapper>
      )}
    </>
  )
}

export default AlertMessage
