import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
const PageNotFound: FC = () => {
  const Navigate = useNavigate()
  return (
    <div>
      <p>Page not found</p>
      <button
        onClick={() => {
          Navigate(`/`)
        }}
      >
        back to home
      </button>
    </div>
  )
}

export default PageNotFound
