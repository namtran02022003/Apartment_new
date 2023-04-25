import { FC, Fragment } from 'react'
import GlobalStyles from './assets/styles/GlobalStyled'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PublicRouters from './routers'
import DefaultLayout from './components/layouts/DefaultLayout'

const App: FC = () => {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes>
          {PublicRouters.map((routes, index) => {
            let Layout = DefaultLayout
            const Page = routes.component
            if (routes.layout) {
              Layout = routes.layout
            } else if (routes.layout === null) {
              Layout = Fragment
            }
            return (
              <Route
                key={index}
                path={routes.path}
                element={
                  <Layout>
                    <Page type={routes.type} />
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
