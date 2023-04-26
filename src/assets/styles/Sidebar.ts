import styled from 'styled-components'

const SidebarStyled = styled.div`
  a {
    margin-bottom: 30px;
    color: #fff;
    font-weight: 400;
    cursor: pointer;
    display: block;
    .icon-home {
      margin-right: 10px;
      font-size: 20px;
    }
  }
  background: #00338d;
  margin: 0;
  height: 100%;
  padding: 0 20px;
  .content {
    .navbar-item {
      margin: 10px 0;
      display: block;
      padding: 10px 15px;
      border-radius: 5px;
      &:hover {
        background: rgb(55 16 173);
      }
    }
  }
  .active {
    background: rgb(55 16 173);
  }
  .logo-home {
    width: 75%;
    object-fit: cover;
    display: block;
    margin: auto;
    mix-blend-mode: screen;
  }
`
export default SidebarStyled
