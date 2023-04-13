import styled from 'styled-components'

const DefaultLayoutStyled = styled.div`
  .layout-flex {
    display: flex;
    min-height: 80vh;
    background: rgb(23, 53, 139);
    &-w-2 {
      width: 15%;
      background: rgb(23, 53, 139);
      color: white;
    }
    &-w-8 {
      padding: 20px 50px;
      background: rgb(241, 242, 245);
      width: 80%;
      border-radius: 5px 0 0 5px;
    }
  }
`

export default DefaultLayoutStyled
