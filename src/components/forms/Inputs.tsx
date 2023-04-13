import { FC } from 'react'
interface Props {
  name: string
  label: string
  placeholder: string
  value?: string | number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  err?: string
  type: unknown
  onHandleChange: unknown
}

const Inputs: FC = (props: Props) => {
  const { name, err, label, type, placeholder, value, onHandleChange } = props
  return (
    <div className="form-control">
      <label>{label}</label>
      <input name={name} value={value} onChange={onHandleChange} type={type} placeholder={placeholder} />
      <p className="err-message">{err}</p>
    </div>
  )
}
export default Inputs
