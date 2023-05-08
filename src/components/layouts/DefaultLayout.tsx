import Header from '../header/Header'
import SideBar from '../sideBar/SideBar'
import styled from 'styled-components'
import { FC } from 'react'
interface Props {
  children?: JSX.Element
}
const DefaultLayoutStyled = styled.div`
  display: flex;
  .layout-container {
    flex: 1;
    &-content {
      padding: 20px;
    }
  }
`
const DefaultLayout: FC<Props> = ({ children }) => {
  return (
    <DefaultLayoutStyled>
      <div>
        <SideBar />
      </div>
      <div className="layout-container">
        <Header />
        <div className="layout-container-content">{children}</div>
      </div>
    </DefaultLayoutStyled>
  )
}
export default DefaultLayout
