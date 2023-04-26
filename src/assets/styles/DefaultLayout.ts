import styled from 'styled-components'

const DefaultLayoutStyled = styled.div`
  .layout-content {
    padding: 0 10px 0 0;
    background: rgba(241, 234, 234, 0.85);
    min-height: 550px;
    display: flex;
    flex-direction: row;
    .col-1 {
      width: 15%;
      height: 100vh;
    }
    .col-9 {
      width: 85%;
      padding: 0 20px;
      height: 100vh;
    }
  }
  th {
    font-size: 1.2rem;
    opacity: 0.9;
  }
  .td-action {
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
