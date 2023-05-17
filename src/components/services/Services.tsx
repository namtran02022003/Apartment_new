import { FC, useCallback, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import ModalConfirm from '../alertMessage/ModalConfirm'
import { TonggleInput, PagingBar, HeadingPage, NodataMatching } from '../../common/CommonComponent'
import baseAxios from '../../apis/ConfigAxios'
import CreateServices from '../form/CreateServices'
import Loading from '../others/Loading'
import * as moment from 'moment'
import { InputStyled } from '../../assets/styles/Input'
import { useDispatch } from 'react-redux'
import { showToast } from '../toasts/ToastActions'
import { useNavigate } from 'react-router-dom'
interface Services {
  item?: [Service]
  message?: string | null
  totalRecords?: number | string
  errorCode?: string | number
  success?: boolean
}
interface Service {
  id: number
  orderNo: number
  servicesCode: string
  servicesName: string
  note: string
  actflg: string
  servicesPrice: string
  createdAt: string
  updatedAt: string
}
const Services: FC = () => {
  const dispatch = useDispatch()
  const Navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [id, setId] = useState('')
  const [showModalConfirm, setShowModalConfirm] = useState(false)
  const [services, setServices] = useState<Services>({})
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
    setId(id)
    setShowForm(true)
  }
  const getServices = useCallback(async () => {
    try {
      const res = await baseAxios.get(`/services/list`, {
        params: {
          pageSize: params.pageSize,
          pageNum: params.pageNum,
          searchInput: params.searchInput
        }
      })
      setServices(res.data)
    } catch (error) {
      console.log(error)
    }
  }, [params.pageSize, params.pageNum, params.searchInput])
  useEffect(() => {
    setTimeout(() => {
      getServices()
      setLoading(false)
    }, 500)
  }, [getServices])
  const deleteService = async () => {
    try {
      const res = await baseAxios.delete(`/services/${id}`)
      if (res.data.errorCode == 0) {
        showToasts('Delete success', 'green')
        getServices()
      } else if (res.data.errorCode == 401) {
        Navigate('/login')
      } else {
        showToasts(res.data.message, 'green')
      }
      setId('')
    } catch (error) {
      showToasts(error as string, 'red')
    }
    setId('')
  }
  if (loading) return <Loading />
  return (
    <>
      {showModalConfirm && <ModalConfirm setId={setId} showForm={showModalConfirm} setShowForm={setShowModalConfirm} action={deleteService} />}
      {showForm && <CreateServices setId={setId} setShow={setShowForm} show={showForm} id={id} getServices={getServices} />}
      <div className="shadow rounded-4 color-table">
        <div className="bg-heading-table py-2">
          <HeadingPage isDisable={true} setShowForm={setShowForm} heading="Service List" />
        </div>
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
                <th className="text-center">#</th>
                <th>Service Code</th>
                <th>Service Name</th>
                <th>Service Price (VND)</th>
                <th>Note</th>
                <th className="text-center">Create At</th>
                <th className="text-center">Update At</th>
                <th className="text-center th-sm">Actions</th>
              </tr>
            </thead>
            {services.totalRecords ? (
              <tbody>
                {services.item?.map((data) => {
                  return (
                    <tr key={data.id}>
                      <td className="text-center">{data.orderNo}</td>
                      <td>{data.servicesCode}</td>
                      <td>{data.servicesName}</td>
                      <td className="text-end">{data.servicesPrice.toLocaleString()}</td>
                      <td>{data.note}</td>
                      <td>{moment(data.createdAt).format('DD/MM/YYYY hh:mm:ss')}</td>
                      <td>{moment(data.updatedAt).format('DD/MM/YYYY hh:mm:ss')}</td>
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
            ) : (
              <NodataMatching count={8} />
            )}
          </table>
          {!!services.totalRecords && (
            <div className="d-flex justify-content-between table-bottom">
              <div>
                {`Showing
            ${params.pageNum}
            to
            ${params.pageSize}
            of
            ${services.totalRecords}
            entries`}
              </div>
              <PagingBar currentPage={params.pageNum} totalPages={Math.ceil(Number(services.totalRecords) / params.pageSize)} onPageChange={setPageNum} />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Services
