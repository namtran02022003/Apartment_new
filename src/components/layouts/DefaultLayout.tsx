import Header from '../header/Header'
import Footer from '../footer/Footer'
import DefaultLayoutStyled from '../../assets/styles/DefaultLayout'

function DefaultLayout({ children }: { children: JSX.Element }) {
  return (
    <DefaultLayoutStyled>
      <Header />
      <div className="layout-content"> {children}</div>
      <Footer />
    </DefaultLayoutStyled>
  )
}
export default DefaultLayout
