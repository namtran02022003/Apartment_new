import { FC, useCallback, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import ModalConfirm from '../alertMessage/ModalConfirm'
import { TonggleInput, PagingBar } from '../../common/CommonComponent'
import baseAxios from '../../apis/ConfigAxios'
import AlertMessage from '../alertMessage/AlertMessage'
import FormCreateApartment from '../form/FormCreateApartment'
import Loading from '../others/Loading'
interface ApartmentsFace {
  item?: [Aaprtment]
  message?: string | null
  totalRecords?: number | string
  errorCode?: string | number
  success?: boolean
}
interface Aaprtment {
  id: number
  orderNo: number
  apartmentCode: string
  apartmentName: string
  location: string
  acreage: string
  roomNumber: string
  address: string
  note: string
  actflg: string
  buildingId: 0
  buildingName: string
  apartmentTypeId: 0
  apartmentTypeName: string
  createdAt: string
  updatedAt: string
}
const Apartments: FC = () => {
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [id, setId] = useState('')
  const [showModalConfirm, setShowModalConfirm] = useState(false)
  const [messages, setMessages] = useState('')
  const [showMessage, setShowMessage] = useState(false)
  const [apartments, setApartments] = useState<ApartmentsFace>({})
  const [params, setParams] = useState({
    pageSize: 10,
    pageNum: 1,
    searchInput: ''
  })
  const setPageNum = (index: number) => {
    setParams({ ...params, pageNum: index })
  }
  const handleEditApartment = (id: string) => {
    setId(id)
    setShowForm(true)
  }
  const getApartments = useCallback(async () => {
    try {
      const res = await baseAxios.get(`/apartment/list`, {
        params: {
          pageSize: params.pageSize,
          pageNum: params.pageNum,
          searchInput: params.searchInput
        }
      })
      setApartments(res.data)
    } catch (error) {
      console.log(error)
    }
  }, [params.pageSize, params.pageNum, params.searchInput])
  useEffect(() => {
    setTimeout(() => {
      getApartments()
      setLoading(false)
    }, 500)
  }, [getApartments])

  const deleteApartment = async () => {
    console.log(id)
    try {
      await baseAxios.delete(`/apartment/${id}`)
      setMessages('delete success')
      setShowMessage(true)
      getApartments()
    } catch (error) {
      console.log(error)
      setMessages('err')
      setShowMessage(true)
    }
    setId('')
  }
  if (loading) return <Loading />
  return (
    <div className="rounded-4">
      {showMessage && <AlertMessage show={showMessage} setShow={setShowMessage} message={messages} color="green" />}
      {showModalConfirm && <ModalConfirm setId={setId} showForm={showModalConfirm} setShowForm={setShowModalConfirm} action={deleteApartment} />}
      {showForm && (
        <FormCreateApartment
          setMess={setMessages}
          setShowMes={setShowMessage}
          setId={setId}
          setShow={setShowForm}
          show={showForm}
          id={id}
          getApartments={getApartments}
        />
      )}
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
                <th className="text-center">ID</th>
                <th>Apartment Code</th>
                <th>Apartment Name</th>
                <th>Acreage</th>
                <th>Location</th>
                <th>Address</th>
                <th className="text-center">Room Number</th>
                <th className="text-center th-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {apartments.item?.map((data) => {
                return (
                  <tr key={data.id}>
                    <td className="text-center">{data.id}</td>
                    <td>{data.apartmentCode}</td>
                    <td>{data.apartmentName}</td>
                    <td>{data.acreage}</td>
                    <td>{data.location}</td>
                    <td>{data.address}</td>
                    <td className="text-center">{data.roomNumber}</td>
                    <td className="d-flex justify-content-around td-action">
                      <FontAwesomeIcon
                        onClick={() => {
                          setShowModalConfirm(true)
                          setId(data.id.toString())
                        }}
                        className="btn-delete"
                        icon={faTrash}
                      />
                      <FontAwesomeIcon onClick={() => handleEditApartment(data.id.toLocaleString())} className="btn-edit" icon={faEdit} />
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
              ${apartments.totalRecords}
              entries`}
            </div>
            <PagingBar currentPage={params.pageNum} totalPages={Math.ceil(Number(apartments.totalRecords) / 10)} onPageChange={setPageNum} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Apartments
