import { FC, Fragment } from 'react'
import DefaultLayout from './components/layouts/DefaultLayout'
import GlobalStyles from './assets/styles/GlobalStyled'
import PublicRouters from './routers/Routers'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UseAuth from './routers/UseAuth'
import Login from './components/form/Login'
// import Scv from './components/csv/Csv'
const App: FC = () => {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {PublicRouters.map((routes: any, index: number) => {
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
                  <UseAuth>
                    <Layout>
                      <Page />
                    </Layout>
                  </UseAuth>
                }
              />
            )
          })}
        </Routes>
      </BrowserRouter>
    </>
    // <Scv />
  )
}

export default App
