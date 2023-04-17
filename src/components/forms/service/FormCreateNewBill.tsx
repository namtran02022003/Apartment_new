import { FC } from 'react'
import styled from 'styled-components'
const FormCreateNewBillStyled = styled.div`
  background: rgb(204, 204, 204);
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .form-create {
    background: #fff;
    width: 600px;
    h2 {
      text-align: center;
    }
  }
`
const FormCreateNewBill: FC = () => {
  return (
    <FormCreateNewBillStyled>
      <form className="form-create">
        <h2>Create new bill</h2>
      </form>
    </FormCreateNewBillStyled>
  )
}

export default FormCreateNewBill
