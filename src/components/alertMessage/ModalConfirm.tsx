import { FC, useEffect, MouseEvent } from 'react'
import { ModalConfirmStyled } from '../../assets/styles/Modal'
interface PropsFace {
  showForm: boolean
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action?: any
  setId?: React.Dispatch<React.SetStateAction<string>>
  text?: string
}
const ModalConfirm: FC<PropsFace> = ({ showForm, setId, setShowForm, action, text }) => {
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
      <div className="content animate shadow rounded-3 position-relative pt-3">
        <p className="text-center">{text ? text : 'Do you want to delete user?'}</p>
        <div className="d-flex justify-content-center py-5">
          <button
            onClick={() => {
              setShowForm(!showForm)
              if (setId) {
                setId('')
              }
            }}
            className="btn w-25 mx-2 btn-success"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              action()
              setShowForm(!showForm)
            }}
            className="btn w-25 mx-2 btn-danger"
          >
            Yes
          </button>
        </div>
      </div>
    </ModalConfirmStyled>
  )
}

export default ModalConfirm
