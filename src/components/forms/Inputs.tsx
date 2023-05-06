import { FC, ChangeEvent } from 'react'
import styled from 'styled-components'
const LabelStyled = styled.label`
  font-weight: 600;
  margin: 7px 0 3px 0;
`
interface Props {
  name?: string
  label?: string
  placeholder?: string
  value?: string | number
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  err?: string
  type: string
  onHandleChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const Inputs: FC<Props> = (props) => {
  const { label, err, ...res } = props
  return (
    <div className="form-control">
      {label && <LabelStyled>{label}</LabelStyled>}
      <input {...res} />
      {err && <p className="err-message">{err}</p>}
    </div>
  )
}

export default Inputs
