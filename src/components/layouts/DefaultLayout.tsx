import DefaultLayoutStyled from '../../assets/styles/DefaultLayout'
import Sidebar from '../sidebar/Sidebar'
import withAuthorization from '../../routers/WithAuthorization'
import { FC } from 'react'
interface Props {
  children?: JSX.Element
}
const DefaultLayout: FC<Props> = ({ children }) => {
  console.log('run')
  return (
    <DefaultLayoutStyled>
      <div className="layout-content">
        <div className="col-1">
          <Sidebar />
        </div>
        <div className="col-9">{children}</div>
      </div>
    </DefaultLayoutStyled>
  )
}
export default withAuthorization(DefaultLayout)
