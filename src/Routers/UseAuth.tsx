import { FC, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
type UseAuthProps = {
  children: React.ReactNode
}
const UseAuth: FC<UseAuthProps> = ({ children }) => {
  const navigate = useNavigate()
  const [flag, setFlag] = useState(false)
  useEffect(() => {
    const tokenLocal: null | string = localStorage.getItem('token') || ''
    if (!tokenLocal) {
      navigate('/login')
    } else {
      setFlag(true)
    }
  }, [navigate])

  return flag ? <>{children}</> : <></>
}

export default UseAuth
