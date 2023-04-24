import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function withAuthorization(WrappedComponent: FC) {
  function AuthorizedComponent(props: object) {
    const navigate = useNavigate()
    useEffect(() => {
      const tokenLocal: null | string = localStorage.getItem('token') || ''
      console.log(tokenLocal)
      if (!tokenLocal) {
        navigate('/login')
      }
    }, [navigate])

    return <WrappedComponent {...props} />
  }

  return AuthorizedComponent
}

export default withAuthorization
