import { FC } from 'react'
import Navbars from '../navbar/Navbar'
import HeaderStyled from '../../assets/styles/Headers'
const Header: FC = () => {
  return (
    <HeaderStyled>
      <h1>Manage Apartments</h1>
      <Navbars />
    </HeaderStyled>
  )
}
export default Header
