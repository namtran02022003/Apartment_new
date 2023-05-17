import { FC, useCallback, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import ModalConfirm from '../alertMessage/ModalConfirm'
import { TonggleInput, PagingBar, HeadingPage, NodataMatching } from '../../common/CommonComponent'
import baseAxios from '../../apis/ConfigAxios'
import FormCreateApartment from '../form/FormCreateApartment'
import Loading from '../others/Loading'
import { useDispatch } from 'react-redux'
import { showToast } from '../toasts/ToastActions'
import { InputStyled } from '../../assets/styles/Input'
import { useNavigate } from 'react-router-dom'
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
  const dispatch = useDispatch()
  const Navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [id, setId] = useState('')
  const [showModalConfirm, setShowModalConfirm] = useState(false)
  const [apartments, setApartments] = useState<ApartmentsFace>({})
  const [params, setParams] = useState({
    pageSize: 10,
    pageNum: 1,
    searchInput: ''
  })
  const showToasts = (message: string, color: string) => {
    dispatch(
      showToast({
        message: message,
        color: color
      })
    )
  }
  const setPageNum = (index: number) => {
    setParams({ ...params, pageNum: index })
  }
  const handleEditApartment = (id: string) => {
    console.log('apartment', id)
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
    try {
      const res = await baseAxios.delete(`/apartment/${id}`)
      if (res.data.errorCode == 0) {
        showToasts('Delete success', 'green')
        getApartments()
      } else if (res.data.errorCode == 401) {
        Navigate('/login')
      } else {
        showToasts(res.data.message, 'green')
      }
      setId('')
    } catch (error) {
      showToasts(error as string, 'red')
    }
  }
  const ChangeStatus = async (id: number) => {
    await baseAxios.post(`/apartment/active-inactive`, {
      id: id,
      actflg: 'I'
    })
  }

  if (loading) return <Loading />
  return (
    <>
      {showModalConfirm && (
        <ModalConfirm
          text="Do you want to deldete apartment"
          setId={setId}
          showForm={showModalConfirm}
          setShowForm={setShowModalConfirm}
          action={deleteApartment}
        />
      )}
      {showForm && <FormCreateApartment setId={setId} setShow={setShowForm} show={showForm} id={id} getApartments={getApartments} />}
      <div className="shadow rounded-4 color-table">
        <HeadingPage setShowForm={setShowForm} heading="Apartment List" />
        <div className="d-flex mb-4 px-4 justify-content-between align-items-center">
          <div>
            Show
            <select
              onChange={(e) => {
                setParams({ ...params, pageSize: Number(e.target.value) })
              }}
              value={params.pageSize}
              className="select-show-item-page mx-1"
              title="show total item"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            entries
          </div>
          <form>
            <label className="me-1" htmlFor="search">
              Search
            </label>
            <InputStyled
              onChange={(e) => setParams({ ...params, searchInput: e.target.value })}
              className="d-inline-block w-auto"
              id="search"
              type="text"
              placeholder="enter search"
            />
          </form>
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
            {apartments.totalRecords ? (
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
                        <FontAwesomeIcon onClick={() => handleEditApartment(data.id.toString())} className="btn-edit" icon={faEdit} />
                        <TonggleInput action={() => ChangeStatus(data.id)} actflg={data.actflg} />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            ) : (
              <NodataMatching count={8} />
            )}
          </table>
          {!!apartments.totalRecords && (
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
              <PagingBar currentPage={params.pageNum} totalPages={Math.ceil(Number(apartments.totalRecords) / params.pageSize)} onPageChange={setPageNum} />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Apartments
