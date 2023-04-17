import styled from 'styled-components'

const ApartmentStyled = styled.div`
  .apartment-flex {
    display: flex;
    justify-content: space-between;
    padding: 15px 10px;
    align-items: center;
    &-item {
      form {
        margin: 0 10px;
        border: 1px solid #ccc;
        border-radius: 40px;
        position: relative;
        input {
          border: none;
          padding: 10px 15px;
          border-radius: 40px;
          &:focus-within {
            outline: 1px solid #6666;
          }
        }
        .btn-search {
          border: none;
          position: absolute;
          top: 0;
          right: 0;
          height: 100%;
          cursor: pointer;
          padding: 0px 15px 0px 10px;
          box-sizing: none;
          border-radius: 0 40px 40px 0;
          &:hover {
            background: #ccc;
          }
        }
      }
      .btn-create {
        border: none;
        padding: 10px 15px;
        border-radius: 40px;
        color: white;
        background: rgb(23, 53, 139);
        cursor: pointer;
        &:hover {
          background: rgb(19 32 68);
        }
      }
    }
  }
  .apartment-content {
    background: #fff;
    min-height: 500px;
    table {
      width: 100%;
      border-collapse: collapse;
      .td-action {
        display: flex;
        justify-content: space-around;
        button {
          border-radius: 50%;
          border: 1px solid #ccc;
          padding: 9px 9px;
          cursor: pointer;
          .icon-eye {
            color: blue;
          }
          &:disabled {
            opacity: 0.5;
          }
        }
      }
    }
    table,
    th,
    td {
      border: 1px solid #ccc;
      padding: 5px 10px;
    }
  }
`

export default ApartmentStyled
