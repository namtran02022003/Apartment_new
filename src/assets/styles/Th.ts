import styled from 'styled-components'
interface Props {
  width?: string
}
const ThStyled = styled.th<Props>`
  width: ${(props) => props.width};
`

export { ThStyled }
