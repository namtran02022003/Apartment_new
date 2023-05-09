import styled from 'styled-components'

const ToggleInputStyled = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;
  & input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }
  .slider:before {
    position: absolute;
    content: '';
    height: 20px;
    width: 18px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }
  input:checked + .slider {
    background-color: #2196f3;
  }
  input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
  }
  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
  .slider.round {
    border-radius: 34px;
  }
  .slider.round:before {
    border-radius: 50%;
  }
`
const InputStyled = styled.input`
  width: 100%;
  border: 0.5px solid #ccc;
  background-color: #f5f5f5;
  padding: 5px 15px;
  border-radius: 5px;
  background: #fff;
  &:focus-within {
    outline: 0.5px solid rgb(202, 183, 183);
  }
`

export { ToggleInputStyled, InputStyled }
