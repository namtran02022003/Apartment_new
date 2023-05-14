import { FC, useState, useEffect, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import ModalConfirm from '../alertMessage/ModalConfirm'
import FormCreateBuilding from '../form/FormCreateBuilding'
import baseAxios from '../../apis/ConfigAxios'
import { TonggleInput, PagingBar } from '../../common/CommonComponent'
import AlertMessage from '../alertMessage/AlertMessage'
import Loading from '../others/Loading'
interface buildingFace {
  id: number | string
  acreage: string
  actflg: string
  address: string
  buildingCode: string
  buildingName: string
  createdAt: string
  height: string
  note: string
  numberOfFloors: string | number
  numberOfApartments: string | number
  orderNo: string | number
}
interface BuildingsFace {
  item?: [buildingFace]
  message?: string | null
  totalRecords?: number | string
  errorCode?: string | number
  success?: boolean
}
const Buildings: FC = () => {
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [id, setId] = useState('')
  const [buildings, setBuildings] = useState<BuildingsFace>({})
  const [showModalConfirm, setShowModalConfirm] = useState(false)
  const [messages, setMessages] = useState('')
  const [showMessage, setShowMessage] = useState(false)
  const [params, setParams] = useState({
    pageSize: 10,
    pageNum: 1,
    searchInput: 'b'
  })
  const handleEditBuilding = (id: string) => {
    setId(id)
    setShowForm(true)
  }
  const getBuildings = useCallback(async () => {
    const res = await baseAxios.get('/buildings/list', {
      params: {
        pageSize: params.pageSize,
        pageNum: params.pageNum,
        searchInput: params.searchInput
      }
    })
    setBuildings(res.data)
  }, [params.pageSize, params.pageNum, params.searchInput])
  useEffect(() => {
    setTimeout(() => {
      getBuildings()
      setLoading(false)
    }, 500)
  }, [getBuildings])
  const setPageNum = (index: number) => {
    setParams({ ...params, pageNum: index })
  }
  const deleteBuilding = async () => {
    try {
      await baseAxios.delete(`/buildings/${id}`)
      setMessages('delete success')
      setShowMessage(true)
      getBuildings()
      setId('')
    } catch (error) {
      console.log(error)
      setMessages('err')
      setShowMessage(true)
    }
  }
  if (loading) return <Loading />
  return (
    <div className="rounded-4">
      {showMessage && <AlertMessage show={showMessage} setShow={setShowMessage} message={messages} color="green" />}
      {showModalConfirm && <ModalConfirm setId={setId} showForm={showModalConfirm} setShowForm={setShowModalConfirm} action={deleteBuilding} />}
      {showForm && (
        <FormCreateBuilding
          setMess={setMessages}
          setShowMes={setShowMessage}
          setId={setId}
          setShow={setShowForm}
          show={showForm}
          id={id}
          getBuildings={getBuildings}
        />
      )}
      <div className="shadow color-table">
        <div className="d-flex mb-4 bg-heading-table px-4 py-2 justify-content-between align-items-center mb-2">
          <h5>Buildings List</h5>
          <button onClick={() => setShowForm(true)} className="btn btn-primary px-3 me-3">
            Create
          </button>
        </div>
        <div className="table-scroll px-4">
          <table id="dtDynamicVerticalScrollExample" className="table color-table table-bordered table-sm">
            <thead>
              <tr>
                <th className="text-center">ID</th>
                <th>Building Code</th>
                <th>Building Name</th>
                <th>Acreage</th>
                <th>Height</th>
                <th>Address</th>
                <th className="text-center">Person Num</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {buildings.item?.map((data) => {
                return (
                  <tr key={data.id}>
                    <td className="text-center">{data.orderNo}</td>
                    <td>{data.buildingCode}</td>
                    <td>{data.buildingName}</td>
                    <td>{data.acreage}</td>
                    <td>{data.height}</td>
                    <td>{data.address}</td>
                    <td className="text-center">{data.numberOfApartments}</td>
                    <td className="d-flex justify-content-around td-action">
                      <FontAwesomeIcon
                        onClick={() => {
                          setShowModalConfirm(true)
                          setId(data.id.toString())
                        }}
                        className="btn-delete"
                        icon={faTrash}
                      />
                      <FontAwesomeIcon onClick={() => handleEditBuilding(data.id.toString())} className="btn-edit" icon={faEdit} />
                      <TonggleInput actflg={data.actflg} />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <div className="d-flex justify-content-between table-bottom">
            <div>
              {`Showing
              ${params.pageNum}
              to
              ${params.pageSize}
              of
              ${buildings.totalRecords}
              entries`}
            </div>
            <PagingBar currentPage={params.pageNum} totalPages={Math.ceil(Number(buildings.totalRecords) / 10)} onPageChange={setPageNum} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Buildings
