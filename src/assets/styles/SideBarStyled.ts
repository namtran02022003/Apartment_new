import styled from 'styled-components'

const SideBarStyled = styled.ul`
  padding: 20px 30px;
  .sidebar-item {
    display: block;
    padding: 10px 15px;
    &:hover {
      background: #ccc;
      color: #333;
      border-radius: 5px;
    }
  }
`
export default SideBarStyled
