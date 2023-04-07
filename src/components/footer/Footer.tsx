import { FC } from 'react'
import styled from 'styled-components'

const FooterStyled = styled.div`
  text-align: center;
  background: rgb(23, 53, 139);
  color: white;
  h1 {
    margin: 0;
  }
`
const Footer: FC = () => {
  return (
    <FooterStyled>
      <h1>Footer</h1>
    </FooterStyled>
  )
}
export default Footer
