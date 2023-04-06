import Header from '../header/Header'
import Footer from '../footer/Footer'

function DefaultLayout({ children }: { children: JSX.Element }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
export default DefaultLayout
