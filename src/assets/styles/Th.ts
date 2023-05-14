import styled from 'styled-components'
interface Props {
  width?: string
}
const ThStyled = styled.th<Props>`
  width: ${(props) => props.width};
  white-space: nowrap;
`

export { ThStyled }
