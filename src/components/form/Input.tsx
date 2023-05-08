import styled from 'styled-components'
const InputStyled = styled.input`
  width: 100%;
  border: 0.5px solid #ccc;
  background-color: #f5f5f5;
  padding: 5px 15px;
  border-radius: 50px;
  &:focus-within {
    outline: 0.5px solid rgb(202, 183, 183);
  }
`

export { InputStyled }
