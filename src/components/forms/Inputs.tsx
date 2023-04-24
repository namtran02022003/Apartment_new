import { FC, ChangeEvent } from 'react'

interface Props {
  name: string
  label: string
  placeholder: string
  value?: string | number
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  err?: string
  type: string
  onHandleChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Inputs: FC<Props> = (props) => {
  const { label, err, ...res } = props
  return (
    <div className="form-control">
      <label>{label}</label>
      <input {...res} />
      {err && <p className="err-message">{err}</p>}
    </div>
  )
}

export default Inputs
