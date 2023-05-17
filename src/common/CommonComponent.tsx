import { ToggleInputStyled } from '../assets/styles/Input'
import { Dispatch, SetStateAction, FC, useState } from 'react'
import { PagingBarStyled } from '../assets/styles/PagingBar'
interface Props {
  actflg: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action?: any
}
const TonggleInput: FC<Props> = ({ actflg, action }) => {
  const [check, setCheck] = useState(actflg == 'Active' || actflg == 'Hoạt động')
  const handleChangeStatus = () => {
    if (check) {
      setCheck(false)
      action()
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

const MAX_BUTTONS = 5

const PagingBar: FC<{
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}> = (props) => {
  const { currentPage, totalPages, onPageChange } = props
  const pageButtons = []
  let startPage, endPage
  if (totalPages <= MAX_BUTTONS) {
    startPage = 1
    endPage = totalPages
  } else {
    if (currentPage <= Math.ceil(MAX_BUTTONS / 2)) {
      startPage = 1
      endPage = MAX_BUTTONS
    } else if (currentPage + Math.floor(MAX_BUTTONS / 2) >= totalPages) {
      startPage = totalPages - MAX_BUTTONS + 1
      endPage = totalPages
    } else {
      startPage = currentPage - Math.floor(MAX_BUTTONS / 2)
      endPage = currentPage + Math.floor(MAX_BUTTONS / 2)
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pageButtons.push(
      <button className={`pagingButton ${i === currentPage ? 'active' : ''}`} key={i} onClick={() => onPageChange(i)}>
        {i}
      </button>
    )
  }

  return (
    <PagingBarStyled>
      <div className="pagingBar">
        <button className="pagingButton a" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
          Prev
        </button>
        {pageButtons}
        <button className="pagingButton a" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
          Next
        </button>
      </div>
    </PagingBarStyled>
  )
}
interface HeadingPage {
  setShowForm: Dispatch<SetStateAction<boolean>>
  heading: string
  isDisable?: boolean
}
const HeadingPage: FC<HeadingPage> = ({ setShowForm, heading, isDisable }) => {
  return (
    <div className={`d-flex round-top ${isDisable ? '' : 'bg-heading-table py-2'} px-4  justify-content-between align-items-center mb-2`}>
      <h5>{heading}</h5>
      {!isDisable && (
        <button disabled={isDisable} onClick={() => setShowForm(true)} className="btn btn-primary px-3 ">
          Create
        </button>
      )}
    </div>
  )
}
interface NodataProps {
  count: number
}
const NodataMatching: FC<NodataProps> = ({ count }) => {
  return (
    <tbody>
      <tr>
        <td className="text-center" colSpan={count}>
          No data matching
        </td>
      </tr>
    </tbody>
  )
}

export { TonggleInput, PagingBar, HeadingPage, NodataMatching }
