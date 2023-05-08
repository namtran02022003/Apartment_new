import styled from 'styled-components'
import { useEffect, FC } from 'react'
interface AlertMessageProps {
  message: string
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  show: boolean
  color: string
}

const AlertMessageContent = styled.div`
  position: fixed;
  top: 5%;
  right: 5%;
  min-width: 200px;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  border: ${(props) => `2px solid ${props.color}`};
  z-index: 1000;
  background: #fff;
  p {
    color: ${(props) => `${props.color}`};
  }
`

const AlertMessage: FC<AlertMessageProps> = ({ message, setShow, show, color }) => {
  useEffect(() => {
    setTimeout(() => {
      setShow(false)
    }, 2000)
  }, [setShow])

  return (
    <>
      {show && (
        <AlertMessageContent color={color}>
          <p>{message}</p>
        </AlertMessageContent>
      )}
    </>
  )
}

export default AlertMessage
