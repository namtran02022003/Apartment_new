import { FC, useState } from 'react'
import styled from 'styled-components'

const ModalStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
`
const ServicePrice: FC = () => {
  const [electric, setElectric] = useState(false)
  const [water, setWater] = useState(false)
  const handleService = (service: string) => {
    if (service == 'electric') {
      setElectric((pre) => !pre)
    }
    if (service == 'water') {
      setWater((pre) => !pre)
    }
  }
  return (
    <ModalStyled>
      <table>
        <tbody>
          <tr>
            <th>Services</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
          <tr>
            <td>Electric</td>
            <td>{electric ? <input placeholder="ddd" type="text" /> : 3}</td>
            <td>
              <button onClick={() => handleService('electric')}>{electric ? 'save' : 'edit'}</button>
            </td>
          </tr>
          <tr>
            <td>Water</td>
            <td>{water ? <input placeholder="ddd" type="text" /> : 3}</td>
            <td>
              <button onClick={() => handleService('water')}>{water ? 'save' : 'edit'}</button>
            </td>
          </tr>
        </tbody>
      </table>
    </ModalStyled>
  )
}
export default ServicePrice
