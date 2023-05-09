import { FC, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import ModalConfirm from '../alertMessage/ModalConfirm'
import { ToggleInputStyled } from '../../assets/styles/Input'
import FormCreateBuilding from '../form/FormCreateBuilding'
const dataFake = [
  {
    id: 1,
    orderNo: 0,
    buildingCode: 'string',
    buildingName: 'string',
    numberOfFloors: 0,
    height: 'string',
    acreage: 'string',
    numberOfApartments: 0,
    address: 'string',
    note: 'string',
    actflg: 'string'
  },
  {
    id: 2,
    orderNo: 0,
    buildingCode: 'string',
    buildingName: 'string',
    numberOfFloors: 0,
    height: 'string',
    acreage: 'string',
    numberOfApartments: 0,
    address: 'string',
    note: 'string',
    actflg: 'string'
  },
  {
    id: 3,
    orderNo: 0,
    buildingCode: 'string',
    buildingName: 'string',
    numberOfFloors: 0,
    height: 'string',
    acreage: 'string',
    numberOfApartments: 0,
    address: 'string',
    note: 'string',
    actflg: 'string'
  },
  {
    id: 4,
    orderNo: 0,
    buildingCode: 'string',
    buildingName: 'string',
    numberOfFloors: 0,
    height: 'string',
    acreage: 'string',
    numberOfApartments: 0,
    address: 'string',
    note: 'string',
    actflg: 'string'
  },
  {
    id: 5,
    orderNo: 0,
    buildingCode: 'string',
    buildingName: 'string',
    numberOfFloors: 0,
    height: 'string',
    acreage: 'string',
    numberOfApartments: 0,
    address: 'string',
    note: 'string',
    actflg: 'string'
  },
  {
    id: 6,
    orderNo: 0,
    buildingCode: 'string',
    buildingName: 'string',
    numberOfFloors: 0,
    height: 'string',
    acreage: 'string',
    numberOfApartments: 0,
    address: 'string',
    note: 'string',
    actflg: 'string'
  },
  {
    id: 7,
    orderNo: 0,
    buildingCode: 'string',
    buildingName: 'string',
    numberOfFloors: 0,
    height: 'string',
    acreage: 'string',
    numberOfApartments: 0,
    address: 'string',
    note: 'string',
    actflg: 'string'
  },
  {
    id: 8,
    orderNo: 0,
    buildingCode: 'string',
    buildingName: 'string',
    numberOfFloors: 0,
    height: 'string',
    acreage: 'string',
    numberOfApartments: 0,
    address: 'string',
    note: 'string',
    actflg: 'string'
  },
  {
    id: 9,
    orderNo: 0,
    buildingCode: 'string',
    buildingName: 'string',
    numberOfFloors: 0,
    height: 'string',
    acreage: 'string',
    numberOfApartments: 0,
    address: 'string',
    note: 'string',
    actflg: 'string'
  },
  {
    id: 10,
    orderNo: 0,
    buildingCode: 'string',
    buildingName: 'string',
    numberOfFloors: 0,
    height: 'string',
    acreage: 'string',
    numberOfApartments: 0,
    address: 'string',
    note: 'string',
    actflg: 'string'
  },
  {
    id: 11,
    orderNo: 0,
    buildingCode: 'string',
    buildingName: 'string',
    numberOfFloors: 0,
    height: 'string',
    acreage: 'string',
    numberOfApartments: 0,
    address: 'string',
    note: 'string',
    actflg: 'string'
  },
  {
    id: 12,
    orderNo: 0,
    buildingCode: 'string',
    buildingName: 'string',
    numberOfFloors: 0,
    height: 'string',
    acreage: 'string',
    numberOfApartments: 0,
    address: 'string',
    note: 'string',
    actflg: 'string'
  },
  {
    id: 13,
    orderNo: 0,
    buildingCode: 'string',
    buildingName: 'string',
    numberOfFloors: 0,
    height: 'string',
    acreage: 'string',
    numberOfApartments: 0,
    address: 'string',
    note: 'string',
    actflg: 'string'
  },
  {
    id: 14,
    orderNo: 0,
    buildingCode: 'string',
    buildingName: 'string',
    numberOfFloors: 0,
    height: 'string',
    acreage: 'string',
    numberOfApartments: 0,
    address: 'string',
    note: 'string',
    actflg: 'string'
  },
  {
    id: 15,
    orderNo: 0,
    buildingCode: 'string',
    buildingName: 'string',
    numberOfFloors: 0,
    height: 'string',
    acreage: 'string',
    numberOfApartments: 0,
    address: 'string',
    note: 'string',
    actflg: 'string'
  }
]
const Buildings: FC = () => {
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
  const handleEditBuilding = (id: string) => {
    setId(id)
    setShowFormEdit(true)
  }
  return (
    <div className="rounded-4">
      {showModalConfirm && <ModalConfirm showForm={showModalConfirm} setShowForm={setShowModalConfirm} />}
      {showForm && <FormCreateBuilding setShow={setShowForm} show={showForm} />}
      {showFormEdit && <FormCreateBuilding setShow={setShowFormEdit} show={showFormEdit} id={id} />}
      <div className="shadow color-table">
        <div className="d-flex mb-4 bg-heading-table px-4 py-2 justify-content-between align-items-center mb-2">
          <h5>Building List</h5>
          <button onClick={() => setShowForm(true)} className="btn btn-primary px-3 me-3">
            Create
          </button>
        </div>
        <div className="table-scroll px-4">
          <table id="dtDynamicVerticalScrollExample" className="table color-table table-bordered table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Building Code</th>
                <th>Building Name</th>
                <th>Acreage</th>
                <th>Height</th>
                <th>Address</th>
                <th>Person Num</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dataFake.map((data) => {
                return (
                  <tr key={data.id}>
                    <td>{data.id}</td>
                    <td>{data.buildingCode}</td>
                    <td>{data.buildingName}</td>
                    <td>{data.acreage}</td>
                    <td>{data.height}</td>
                    <td>{data.address}</td>
                    <td>{data.numberOfApartments}</td>
                    <td className="d-flex justify-content-around td-action">
                      <FontAwesomeIcon onClick={() => setShowModalConfirm(true)} className="btn-delete" icon={faTrash} />
                      <FontAwesomeIcon onClick={() => handleEditBuilding(data.id.toString())} className="btn-edit" icon={faEdit} />
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

export default Buildings
