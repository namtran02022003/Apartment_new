import styled from 'styled-components'

const ButtonSubmit = styled.button`
  text-decoration: none;
  border: 1px solid #084298;
  padding: 10px 20px;
  width: 30%;
  color: #f8f4f5;
  border-radius: 50px;
  background-color: #084298;
  margin: 20px 0;
  font-weight: bold;
  display: inline-block;
  &:hover {
    background-color: rgb(170 180 195);
  }
`
const BtnBackToHome = styled.button`
  text-decoration: none;
  border: 2px solid #e91e62;
  padding: 5px 20px;
  width: 100%;
  color: #f8f4f5;
  border-radius: 50px;
  background-color: #e91e62;
  margin: 20px 0;
  display: inline-block;
  &:hover {
    background-color: rgb(237 8 85);
  }
`

export { ButtonSubmit, BtnBackToHome }
