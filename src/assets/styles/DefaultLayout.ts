import styled from 'styled-components'

const DefaultLayoutStyled = styled.div`
  .layout-content {
    padding: 0 50px;
    background: #ccc;
    min-height: 550px;
  }
  th {
    font-size: 1.2rem;
    opacity: 0.9;
  }
  .td-action {
    display: flex;
    justify-content: space-around;
    button {
      border-radius: 50%;
      border: none;
      padding: 10px;
      cursor: pointer;
    }
    .btn-edit {
      border: 1px solid #007bff;
      color: #007bff;
    }
    .btn-delete {
      border: 1px solid red;
      color: red;
    }
  }
`

export default DefaultLayoutStyled
