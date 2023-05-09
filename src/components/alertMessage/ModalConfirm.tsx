import { FC, useEffect, MouseEvent } from 'react'
import styled from 'styled-components'
const ModalConfirmStyled = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(18 17 17 / 49%);
  .content {
    width: 30%;
    margin: auto;
    background: #fff;
  }
`
interface PropsFace {
  showForm: boolean
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>
}
const ModalConfirm: FC<PropsFace> = ({ showForm, setShowForm }) => {
  useEffect(() => {
    const element: HTMLElement | null = document.querySelector('.modal-create')
    function closeItem(e: MouseEvent<HTMLDivElement>) {
      if (e.target === element) {
        setShowForm(!showForm)
      }
    }
    window.addEventListener('click', closeItem as unknown as EventListener)
    return () => {
      window.removeEventListener('click', closeItem as unknown as EventListener)
    }
  })

  return (
    <ModalConfirmStyled className="modal-create">
      <div className="content shadow rounded-3 position-relative pt-3">
        <p className="text-center">Do you want to delete user?</p>
        <div className="d-flex justify-content-around py-5">
          <button onClick={() => setShowForm(!showForm)} className="btn btn-success">
            Cancel
          </button>
          <button className="btn btn-danger">Yes</button>
        </div>
      </div>
    </ModalConfirmStyled>
  )
}

export default ModalConfirm
