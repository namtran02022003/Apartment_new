import { FC, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import ModalConfirm from '../alertMessage/ModalConfirm'
import FormCreateApartment from '../form/FormCreateApartment'
import TonggleInput from './ToggleInput'
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
    actflg: 'InActive',
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
    actflg: 'Active',
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
    actflg: 'Active',
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
    actflg: 'Active',
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
    actflg: 'Active',
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
    actflg: 'Active',
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
    actflg: 'Active',
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
    actflg: 'Active',
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
    actflg: 'Active',
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
    actflg: 'Active',
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
    actflg: 'Active',
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
    actflg: 'Active',
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
    actflg: 'Active',
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
    actflg: 'Active',
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
    actflg: 'Active',
    buildingId: 1,
    buildingName: 1,
    apartmentTypeId: 0,
    apartmentTypeName: 0
  }
]

const Apartments: FC = () => {
  const [showForm, setShowForm] = useState(false)
  const [id, setId] = useState('')
  const [showModalConfirm, setShowModalConfirm] = useState(false)

  const handleEditApartment = (id: string) => {
    setId(id)
    setShowForm(true)
  }
  console.log('render')
  return (
    <div className="rounded-4">
      {showModalConfirm && <ModalConfirm showForm={showModalConfirm} setShowForm={setShowModalConfirm} />}
      {showForm && <FormCreateApartment setShow={setShowForm} show={showForm} id={id} />}
      <div className="shadow color-table">
        <div className="d-flex mb-4 bg-heading-table px-4 py-2 justify-content-between align-items-center mb-2">
          <h5>Apartment List</h5>
          <div className="d-flex align-items-center justify-content-between">
            <input type="text" className="border rounded-2 py-1 px-2 me-2" placeholder="enter search" />
            <button onClick={() => setShowForm(true)} className="btn btn-primary px-3 me-3">
              Create
            </button>
          </div>
        </div>
        <div className="px-4 table-scroll">
          <table id="dtDynamicVerticalScrollExample" className="table color-table table-bordered table-sm">
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
                      <FontAwesomeIcon onClick={() => setShowModalConfirm(true)} className="btn-delete" icon={faTrash} />
                      <FontAwesomeIcon onClick={() => handleEditApartment(data.id.toLocaleString())} className="btn-edit" icon={faEdit} />
                      <TonggleInput actflg={data.actflg} />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <div className="d-flex justify-content-between table-bottom">
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
        </div>
      </div>
    </div>
  )
}

export default Apartments
