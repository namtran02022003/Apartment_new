import DefaultLayoutStyled from '../../assets/styles/DefaultLayout'
import Sidebar from '../sidebar/Sidebar'
function DefaultLayout({ children }: { children: JSX.Element }) {
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
export default DefaultLayout
