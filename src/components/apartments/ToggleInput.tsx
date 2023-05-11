import { ToggleInputStyled } from '../../assets/styles/Input'
import { FC, useState } from 'react'
interface Props {
  actflg: string
}
const TonggleInput: FC<Props> = ({ actflg }) => {
  const [check, setCheck] = useState(actflg == 'Active')
  const handleChangeStatus = () => {
    if (check) {
      setCheck(false)
      console.log('okkkkkk')
    }
  }
  return (
    <ToggleInputStyled className="switch">
      <input onChange={() => handleChangeStatus()} checked={check} type="checkbox" title="check user" />
      <span className="slider round"></span>
    </ToggleInputStyled>
  )
}

export default TonggleInput
