import styled from 'styled-components'

const NavbarStyled = styled.ul`
  padding: 20px 30px;
  display: flex;
  width: 50%;
  margin: auto;
  justify-content: space-around;
  .navbar-item {
    display: block;
    padding: 10px 15px;
    border-radius: 5px;
    margin: 10px 0;
    &:hover {
      background: rgb(55 16 173);
      color: #333;
    }
  }
  .active {
    background: rgb(55 16 173);
  }
`
export default NavbarStyled
