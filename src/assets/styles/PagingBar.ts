import styled from 'styled-components'

const PagingBarStyled = styled.div`
  .pagingBar {
    display: flex;
    justify-content: end;
    align-items: center;
    margin: 0 20px 0 0;
  }
  .pagingButton {
    background-color: #fff;
    border: 1px solid #ddd;
    color: #333;
    cursor: pointer;
    padding: 5px 10px;
    text-align: center;
    text-decoration: none;
    transition: background-color 0.3s ease;
  }

  .pagingButton:hover {
    background-color: #f5f5f5;
  }

  .pagingButton.active {
    background-color: #007bff;
    border-color: #007bff;
    color: #fff;
  }
  .a {
    border-radius: 4px;
  }
  .pagingButton:disabled {
    background-color: #fff;
    border-color: #ddd;
    color: #ddd;
    cursor: default;
  }
`

export { PagingBarStyled }
