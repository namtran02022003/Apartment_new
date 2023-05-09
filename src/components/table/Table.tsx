import { FC, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import { ThStyled } from '../../assets/styles/Th'
import CreateUser from '../form/CreateUser'
import ModalConfirm from '../alertMessage/ModalConfirm'
const dataFake = [
  { userName: 'name1', email: 'position', fullName: 'fullname', actflg: 'Active', id: '1', orderNo: '1', createdAt: '2023-10-05', updatedAt: '2023-11-05' },
  { userName: 'name2', email: 'position', fullName: 'fullname', actflg: 'Active', id: '2', orderNo: '1', createdAt: '2023-10-05', updatedAt: '2023-11-05' },
  { userName: 'name3', email: 'position', fullName: 'fullname', actflg: 'Active', id: '3', orderNo: '1', createdAt: '2023-10-05', updatedAt: '2023-11-05' },
  { userName: 'name4', email: 'position', fullName: 'fullname', actflg: 'Active', id: '4', orderNo: '1', createdAt: '2023-10-05', updatedAt: '2023-11-05' },
  { userName: 'name5', email: 'position', fullName: 'fullname', actflg: 'Active', id: '5', orderNo: '1', createdAt: '2023-10-05', updatedAt: '2023-11-05' },
  { userName: 'name6', email: 'position', fullName: 'fullname', actflg: 'Active', id: '6', orderNo: '1', createdAt: '2023-10-05', updatedAt: '2023-11-05' },
  { userName: 'name7', email: 'position', fullName: 'fullname', actflg: 'Active', id: '7', orderNo: '1', createdAt: '2023-10-05', updatedAt: '2023-11-05' },
  { userName: 'name8', email: 'position', fullName: 'fullname', actflg: 'Active', id: '8', orderNo: '1', createdAt: '2023-10-05', updatedAt: '2023-11-05' },
  { userName: 'name9', email: 'position', fullName: 'fullname', actflg: 'Active', id: '9', orderNo: '1', createdAt: '2023-10-05', updatedAt: '2023-11-05' },
  { userName: 'name10', email: 'position', fullName: 'fullname', actflg: 'InActive', id: '10', orderNo: '1', createdAt: '2023-10-05', updatedAt: '2023-11-05' },
  { userName: 'name11', email: 'position', fullName: 'fullname', actflg: 'Active', id: '11', orderNo: '1', createdAt: '2023-10-05', updatedAt: '2023-11-05' },
  { userName: 'name22', email: 'position', fullName: 'fullname', actflg: 'Active', id: '12', orderNo: '1', createdAt: '2023-10-05', updatedAt: '2023-11-05' },
  { userName: 'name33', email: 'position', fullName: 'fullname', actflg: 'Active', id: '13', orderNo: '1', createdAt: '2023-10-05', updatedAt: '2023-11-05' },
  { userName: 'name44', email: 'position', fullName: 'fullname', actflg: 'Active', id: '14', orderNo: '1', createdAt: '2023-10-05', updatedAt: '2023-11-05' },
  { userName: 'name55', email: 'position', fullName: 'fullname', actflg: 'Active', id: '15', orderNo: '1', createdAt: '2023-10-05', updatedAt: '2023-11-05' }
]
const ToggleInputStyled = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;
  & input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }
  .slider:before {
    position: absolute;
    content: '';
    height: 20px;
    width: 18px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }
  input:checked + .slider {
    background-color: #2196f3;
  }
  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
  .slider.round {
    border-radius: 34px;
  }
  .slider.round:before {
    border-radius: 50%;
  }
`
const Table: FC = () => {
  const [showForm, setShowForm] = useState(false)
  const [showFormEdit, setShowFormEdit] = useState(false)
  const [id, setId] = useState('')
  const [showModalConfirm, setShowModalConfirm] = useState(false)
  const handleChangeStatus = (status: string) => {
    if (status == 'Active') {
      console.log('call api')
    } else {
      console.log('k ')
    }
  }
  const handleEditUser = (id: string) => {
    setId(id)
    setShowFormEdit(true)
  }
  return (
    <div className="rounded-4">
      {showModalConfirm && <ModalConfirm showForm={showModalConfirm} setShowForm={setShowModalConfirm} />}
      <div className="shadow color-table">
        <div className="d-flex mb-4 bg-heading-table px-4 py-2 justify-content-between align-items-center mb-2">
          <h5>User List</h5>
          <button onClick={() => setShowForm(true)} className="btn btn-primary px-3 me-3">
            Create
          </button>
        </div>
        <div className="px-4 table-scroll">
          <table id="dtDynamicVerticalScrollExample" className="table color-table table-bordered table-sm">
            <thead>
              <tr>
                <ThStyled width="5%" className="th-sm">
                  #
                </ThStyled>
                <ThStyled width="20%" className="th-sm">
                  User Name
                </ThStyled>
                <ThStyled width="20%" className="th-sm">
                  Full Name
                </ThStyled>
                <ThStyled width="20%" className="th-sm">
                  Email
                </ThStyled>
                <ThStyled width="10%" className="th-sm">
                  Created At
                </ThStyled>
                <ThStyled width="10%" className="th-sm">
                  Update dAt
                </ThStyled>
                <ThStyled width="15%" className="text-center th-sm">
                  Actions
                </ThStyled>
              </tr>
            </thead>
            <tbody>
              {dataFake.map((data) => {
                return (
                  <tr key={data.userName}>
                    <td>{data.orderNo}</td>
                    <td>{data.userName}</td>
                    <td>{data.fullName}</td>
                    <td>{data.email}</td>
                    <td>{data.createdAt}</td>
                    <td>{data.updatedAt}</td>
                    <td className="d-flex justify-content-around td-action">
                      <FontAwesomeIcon onClick={() => setShowModalConfirm(true)} className=" btn-delete" icon={faTrash} />
                      <FontAwesomeIcon onClick={() => handleEditUser(data.id)} className="btn-edit" icon={faEdit} />
                      <ToggleInputStyled className="switch">
                        <input
                          onChange={() => handleChangeStatus(data.actflg)}
                          disabled={data.actflg == 'InActive'}
                          type="checkbox"
                          title="s"
                          className="input-before"
                        />
                        <span className="slider slider-before round"></span>
                      </ToggleInputStyled>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <div className="d-flex justify-content-between table-bottom">
            <div>Showing 1 to 50 of 57 entries</div>
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item">
                  <a className="page-link" href="/">
                    Previous
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="/">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="/">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="/">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="/">
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      {showForm && <CreateUser setShow={setShowForm} show={showForm} />}
      {showFormEdit && <CreateUser setShow={setShowFormEdit} show={showFormEdit} id={id} />}
    </div>
  )
}

export default Table
