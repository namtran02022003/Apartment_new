import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function withAuthorization(WrappedComponent: FC) {
  function AuthorizedComponent(props: object) {
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

    return flag ? <WrappedComponent {...props} /> : ''
  }

  return AuthorizedComponent
}

export default withAuthorization
