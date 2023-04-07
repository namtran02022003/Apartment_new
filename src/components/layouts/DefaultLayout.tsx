import Header from '../header/Header'
import Footer from '../footer/Footer'
import SideBar from '../sideBar/SideBar'
import DefaultLayoutStyled from '../../assets/styles/DefaultLayout'

function DefaultLayout({ children }: { children: JSX.Element }) {
  return (
    <DefaultLayoutStyled>
      <Header />
      <div className="layout-flex">
        <div className="layout-flex-w-2">
          <SideBar />
        </div>
        <div className="layout-flex-w-8">{children}</div>
      </div>
      <Footer />
    </DefaultLayoutStyled>
  )
}
export default DefaultLayout
