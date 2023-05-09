import styled from 'styled-components'
const ModalConfirmStyled = styled.div`
  position: fixed;
  z-index: 333;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(18 17 17 / 49%);
  .content {
    width: 30%;
    margin: auto;
    background: #fff;
  }
`

export { ModalConfirmStyled }
