import { FC } from 'react'
import styled from 'styled-components'

const HeaderStyled = styled.div`
  text-align: center;
`
const Header: FC = () => {
  return (
    <HeaderStyled>
      <h1>Manage Apartment</h1>
    </HeaderStyled>
  )
}
export default Header
