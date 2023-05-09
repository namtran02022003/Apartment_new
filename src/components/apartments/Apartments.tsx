import { FC, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import ModalConfirm from '../alertMessage/ModalConfirm'
const dataFake = [
  {
    id: 1,
    orderNo: 1,
    apartmentCode: 'string',
    apartmentName: 'string',
    location: 'string',
    acreage: 'string',
    roomNumber: 'string',
    address: 'string',
    note: 'string',
    actflg: 'string',
    buildingId: 1,
    buildingName: 1,
    apartmentTypeId: 0,
    apartmentTypeName: 0
  },
  {
    id: 2,
    orderNo: 1,
    apartmentCode: 'string',
    apartmentName: 'string',
    location: 'string',
    acreage: 'string',
    roomNumber: 'string',
    address: 'string',
    note: 'string',
    actflg: 'string',
    buildingId: 1,
    buildingName: 1,
    apartmentTypeId: 0,
    apartmentTypeName: 0
  },
  {
    id: 3,
    orderNo: 1,
    apartmentCode: 'string',
    apartmentName: 'string',
    location: 'string',
    acreage: 'string',
    roomNumber: 'string',
    address: 'string',
    note: 'string',
    actflg: 'string',
    buildingId: 1,
    buildingName: 1,
    apartmentTypeId: 0,
    apartmentTypeName: 0
  },
  {
    id: 4,
    orderNo: 1,
    apartmentCode: 'string',
    apartmentName: 'string',
    location: 'string',
    acreage: 'string',
    roomNumber: 'string',
    address: 'string',
    note: 'string',
    actflg: 'string',
    buildingId: 1,
    buildingName: 1,
    apartmentTypeId: 0,
    apartmentTypeName: 0
  },
  {
    id: 5,
    orderNo: 1,
    apartmentCode: 'string',
    apartmentName: 'string',
    location: 'string',
    acreage: 'string',
    roomNumber: 'string',
    address: 'string',
    note: 'string',
    actflg: 'string',
    buildingId: 1,
    buildingName: 1,
    apartmentTypeId: 0,
    apartmentTypeName: 0
  },
  {
    id: 6,
    orderNo: 1,
    apartmentCode: 'string',
    apartmentName: 'string',
    location: 'string',
    acreage: 'string',
    roomNumber: 'string',
    address: 'string',
    note: 'string',
    actflg: 'string',
    buildingId: 1,
    buildingName: 1,
    apartmentTypeId: 0,
    apartmentTypeName: 0
  },
  {
    id: 7,
    orderNo: 1,
    apartmentCode: 'string',
    apartmentName: 'string',
    location: 'string',
    acreage: 'string',
    roomNumber: 'string',
    address: 'string',
    note: 'string',
    actflg: 'string',
    buildingId: 1,
    buildingName: 1,
    apartmentTypeId: 0,
    apartmentTypeName: 0
  },
  {
    id: 8,
    orderNo: 1,
    apartmentCode: 'string',
    apartmentName: 'string',
    location: 'string',
    acreage: 'string',
    roomNumber: 'string',
    address: 'string',
    note: 'string',
    actflg: 'string',
    buildingId: 1,
    buildingName: 1,
    apartmentTypeId: 0,
    apartmentTypeName: 0
  },
  {
    id: 9,
    orderNo: 1,
    apartmentCode: 'string',
    apartmentName: 'string',
    location: 'string',
    acreage: 'string',
    roomNumber: 'string',
    address: 'string',
    note: 'string',
    actflg: 'string',
    buildingId: 1,
    buildingName: 1,
    apartmentTypeId: 0,
    apartmentTypeName: 0
  },
  {
    id: 10,
    orderNo: 1,
    apartmentCode: 'string',
    apartmentName: 'string',
    location: 'string',
    acreage: 'string',
    roomNumber: 'string',
    address: 'string',
    note: 'string',
    actflg: 'string',
    buildingId: 1,
    buildingName: 1,
    apartmentTypeId: 0,
    apartmentTypeName: 0
  },
  {
    id: 11,
    orderNo: 1,
    apartmentCode: 'string',
    apartmentName: 'string',
    location: 'string',
    acreage: 'string',
    roomNumber: 'string',
    address: 'string',
    note: 'string',
    actflg: 'string',
    buildingId: 1,
    buildingName: 1,
    apartmentTypeId: 0,
    apartmentTypeName: 0
  },
  {
    id: 12,
    orderNo: 1,
    apartmentCode: 'string',
    apartmentName: 'string',
    location: 'string',
    acreage: 'string',
    roomNumber: 'string',
    address: 'string',
    note: 'string',
    actflg: 'string',
    buildingId: 1,
    buildingName: 1,
    apartmentTypeId: 0,
    apartmentTypeName: 0
  },
  {
    id: 13,
    orderNo: 1,
    apartmentCode: 'string',
    apartmentName: 'string',
    location: 'string',
    acreage: 'string',
    roomNumber: 'string',
    address: 'string',
    note: 'string',
    actflg: 'string',
    buildingId: 1,
    buildingName: 1,
    apartmentTypeId: 0,
    apartmentTypeName: 0
  },
  {
    id: 14,
    orderNo: 1,
    apartmentCode: 'string',
    apartmentName: 'string',
    location: 'string',
    acreage: 'string',
    roomNumber: 'string',
    address: 'string',
    note: 'string',
    actflg: 'string',
    buildingId: 1,
    buildingName: 1,
    apartmentTypeId: 0,
    apartmentTypeName: 0
  },
  {
    id: 15,
    orderNo: 1,
    apartmentCode: 'string',
    apartmentName: 'string',
    location: 'string',
    acreage: 'string',
    roomNumber: 'string',
    address: 'string',
    note: 'string',
    actflg: 'string',
    buildingId: 1,
    buildingName: 1,
    apartmentTypeId: 0,
    apartmentTypeName: 0
  }
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
  input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
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
const Apartments: FC = () => {
  const [showForm, setShowForm] = useState(false)
  const handleChangeStatus = (status: string) => {
    if (status == 'Active') {
      console.log('call api')
    } else {
      console.log('k ')
    }
  }
  return (
    <div className="shadow p-4">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h3>Apartment List</h3>
        <button onClick={() => setShowForm(true)} className="btn btn-primary px-3 me-3">
          Create
        </button>
      </div>
      <table id="dtDynamicVerticalScrollExample" className="table table-striped table-bordered table-sm">
        <thead>
          <tr>
            <th className="th-sm">ID</th>
            <th className="th-sm">Apartment Code</th>
            <th className="th-sm">Apartment Name</th>
            <th className="th-sm">Acreage</th>
            <th className="th-sm">Location</th>
            <th className="th-sm">Address</th>
            <th className="th-sm">Room Number</th>
            <th className="text-center th-sm">Actions</th>
          </tr>
        </thead>
        <tbody>
          {dataFake.map((data) => {
            return (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.apartmentCode}</td>
                <td>{data.apartmentName}</td>
                <td>{data.acreage}</td>
                <td>{data.location}</td>
                <td>{data.address}</td>
                <td>{data.roomNumber}</td>
                <td className="d-flex justify-content-around td-action">
                  <button title="delete" className=" btn-delete">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  <button title="edit" className="btn-edit">
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <ToggleInputStyled className="switch">
                    <input onChange={() => handleChangeStatus(data.actflg)} checked={data.actflg == 'Active' ? true : false} type="checkbox" title="s" />
                    <span className="slider round"></span>
                  </ToggleInputStyled>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="d-flex justify-content-between">
        <div>Table</div>
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
      {showForm && <ModalConfirm showForm={showForm} setShowForm={setShowForm} />}
    </div>
  )
}

export default Apartments
