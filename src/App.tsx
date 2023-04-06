import { FC } from 'react'
import GlobalStyles from './assets/styles/GlobalStyled'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PublicRouters from './Routers'
import DefaultLayout from './components/layouts/DefaultLayout'
const App: FC = () => {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes>
          {PublicRouters.map((routes, index) => {
            const Layout = DefaultLayout
            const Page = routes.component
            return (
              <Route
                key={index}
                path={routes.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            )
          })}
        </Routes>
      </Router>
    </>
  )
}
export default App
