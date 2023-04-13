import { FC } from 'react'
import styled from 'styled-components'
import Navbars from '../navbar/Navbar'
const HeaderStyled = styled.div`
  text-align: center;
  background: rgb(23, 53, 139);
  color: white;
  h1 {
    margin: 0;
    padding: 20px 0;
  }
`
const Header: FC = () => {
  return (
    <HeaderStyled>
      <h1>Manage Apartment</h1>
      <Navbars />
    </HeaderStyled>
  )
}
export default Header
