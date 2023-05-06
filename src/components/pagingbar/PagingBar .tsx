import { FC } from 'react'
import styled from 'styled-components'

const PagingBarStyled = styled.div`
  .pagingBar {
    display: flex;
    justify-content: end;
    align-items: center;
    margin: 20px 200px 0 0;
  }
  .pagingButton {
    background-color: #fff;
    border: 1px solid #ddd;
    color: #333;
    cursor: pointer;
    margin: 0 5px;
    padding: 5px 10px;
    text-align: center;
    text-decoration: none;
    transition: background-color 0.3s ease;
  }

  .pagingButton:hover {
    background-color: #f5f5f5;
  }

  .pagingButton.active {
    background-color: #007bff;
    border-color: #007bff;
    color: #fff;
  }

  .pagingButton:disabled {
    background-color: #fff;
    border-color: #ddd;
    color: #ddd;
    cursor: default;
  }
`
const MAX_BUTTONS = 3

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
        <button className="pagingButton" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
          Prev
        </button>
        {pageButtons}
        <button className="pagingButton" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
          Next
        </button>
      </div>
    </PagingBarStyled>
  )
}

export default PagingBar
