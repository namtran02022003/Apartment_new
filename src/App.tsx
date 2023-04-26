import { FC, Fragment } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PublicRouters from './routers'
import DefaultLayout from './components/layouts/DefaultLayout'
import GlobalStyles from './assets/styles/GlobalStyled'
interface face {
  component: React.FC
  layout?: React.FC | null
  type?: string
  path: string
}
const App: FC = () => {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes>
          {PublicRouters.map((routes: face, index: number) => {
            let Layout: React.FC | typeof Fragment = DefaultLayout
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
