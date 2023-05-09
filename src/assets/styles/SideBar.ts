import styled from 'styled-components'
const SideBarStyled = styled.div`
  color: #fff;
  height: 100%;
  min-height: 100vh;
  width: 14rem;
  background-color: rgb(78, 115, 223);
  padding: 20px 15px;
  .logo-home {
    display: flex;
    cursor: pointer;
    justify-content: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
    align-items: center;
    padding-bottom: 20px;
    &-icon {
      font-size: 2rem;
      transform: rotate(-15deg);
      margin-right: 10px;
    }
    span {
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05rem;
    }
  }
  .bd-bottom {
    border-bottom: 1px solid rgb(204 204 204 / 32%);
  }
  .div-icon {
    opacity: 0.8;
    padding: 20px 0;
    cursor: pointer;
    position: relative;
    &:hover,
    &:hover svg {
      opacity: 1;
    }
    svg {
      margin-right: 10px;
      opacity: 0.6;
    }
  }
  .menu-item {
    font-size: 0.8rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
    padding: 10px 0;
    p {
      font-size: 0.6rem;
      font-weight: 600;
      opacity: 0.6;
    }
    .menu-toggle {
      animation: slideDown 0.3s ease-out forwards;
      transform-origin: top;
      display: none;
      background: #fff;
      padding: 10px 20px;
      border-radius: 5px;
      &-content {
        p {
          color: #ccc;
          padding: 0 5px;
        }
        a {
          display: block;
          width: 100%;
          cursor: pointer;
          padding: 10px 5px;
          border-radius: 4px;
          color: #333;
          &:hover {
            background: #ccc;
          }
        }
      }
    }
    .toggle-display {
      display: block;
    }
  }
  @keyframes slideDown {
    from {
      transform: scaleY(0);
    }
    to {
      transform: scaleY(1);
    }
  }
`

export { SideBarStyled }
