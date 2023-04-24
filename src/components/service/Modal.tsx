import { FC } from 'react'
import styled from 'styled-components'

const ModalStyled = styled.div`
  form {
    .modal-item {
      display: flex;
    }
  }
`
const ModalServices: FC = () => {
  return (
    <ModalServices>
      <table>
        <tbody>
          <tr>
            <th>Services</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </tbody>
      </table>
    </ModalServices>
  )
}