import { FC, Fragment } from 'react'
import DefaultLayout from './components/layouts/DefaultLayout'
import GlobalStyles from './assets/styles/GlobalStyled'
import PublicRouters from './routers/Routers'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
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
      <BrowserRouter>
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
      </BrowserRouter>
    </>
  )
}

export default App
