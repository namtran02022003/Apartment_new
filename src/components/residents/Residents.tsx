import { FC, useCallback, useEffect, useState } from 'react'
import * as moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import { ThStyled } from '../../assets/styles/Th'
import ModalConfirm from '../alertMessage/ModalConfirm'
import baseAxios from '../../apis/ConfigAxios'
import Loading from '../others/Loading'
import { TonggleInput, PagingBar, HeadingPage, NodataMatching } from '../../common/CommonComponent'
import CreateResident from '../form/CreateResidents'
import { InputStyled } from '../../assets/styles/Input'
import { useDispatch } from 'react-redux'
import { showToast } from '../toasts/ToastActions'
import { useNavigate } from 'react-router-dom'
export interface User {
  id: number
  fullName: string
  email: string
  birthDate: string
  gender: number
  genderName: string
  phoneNumber: string
  idNo: string
  idDate: string
  idPlace: string
  nationId: number
  nationName: string
  provinceId: number
  provinceName: string
  districtId: number
  districtName: string
  wardId: number
  wardName: string
  address: string
  createdAt: string
  updatedAt: string
  residentType: number
  residentTypeName: string
  actflg: string
}
interface usersListFace {
  item?: [User]
  message?: string | null
  totalRecords?: number | string
  errorCode?: string | number
  success?: boolean
}

const Residents: FC = () => {
  const dispatch = useDispatch()
  const Navigate = useNavigate()
  const [showForm, setShowForm] = useState(false)
  const [id, setId] = useState('')
  const [showModalConfirm, setShowModalConfirm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [residents, setResidents] = useState<usersListFace>({})
  const [errorPage, setErrorPage] = useState('')
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
  const handleEditUser = (id: string) => {
    setId(id)
    setShowForm(true)
  }
  const getResidents = useCallback(async () => {
    try {
      const res = await baseAxios.get('/residents/list', {
        params: {
          pageNum: params.pageNum,
          pageSize: params.pageSize,
          searchInput: params.searchInput
        }
      })
      setResidents(res.data)
    } catch (error: unknown) {
      setErrorPage((error as Error).message)
    }
    setLoading(false)
  }, [params.pageNum, params.pageSize, params.searchInput])
  useEffect(() => {
    setTimeout(() => {
      getResidents()
    }, 500)
  }, [getResidents])
  const setPageNum = (index: number) => {
    setParams({ ...params, pageNum: index })
  }
  const deleteResident = async () => {
    try {
      const res = await baseAxios.delete(`/residents/${id}`)
      if (res.data.errorCode == 0) {
        showToasts('Delete success', 'green')
        getResidents()
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
  if (loading) return <Loading />
  if (errorPage) return <div>{errorPage}</div>
  return (
    <>
      {showModalConfirm && <ModalConfirm showForm={showModalConfirm} setId={setId} setShowForm={setShowModalConfirm} action={deleteResident} />}
      {showForm && <CreateResident setShow={setShowForm} show={showForm} id={id} getResidents={getResidents} setId={setId} />}
      <div className="shadow rounded-4 color-table">
        <HeadingPage setShowForm={setShowForm} heading="Resident List" />
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
        <div className="px-4 table-scroll-y">
          <div className="table-scroll-x">
            <table id="dtDynamicVerticalScrollExample" className="table color-table table-bordered table-sm">
              <thead>
                <tr>
                  <ThStyled className="text-center">#</ThStyled>
                  <ThStyled>Full Name</ThStyled>
                  <ThStyled>Email</ThStyled>
                  <ThStyled>Phone Number</ThStyled>
                  <ThStyled>ID Code</ThStyled>
                  <ThStyled>Address</ThStyled>
                  <ThStyled>Resident Type</ThStyled>
                  <ThStyled>Create dAt</ThStyled>
                  <ThStyled className="text-center t-stiky">Actions</ThStyled>
                </tr>
              </thead>
              {residents.totalRecords ? (
                <tbody>
                  {residents.item?.map((data) => {
                    return (
                      <tr key={data.id}>
                        <td className="text-center">{data.id}</td>
                        <td>{data.fullName}</td>
                        <td>{data.email}</td>
                        <td>{data.phoneNumber}</td>
                        <td>{data.idNo}</td>
                        <td>{data.address}</td>
                        <td>{data.residentTypeName}</td>
                        <td>{moment(data.createdAt).format('DD/MM/YYYY hh:mm:ss')}</td>
                        <td className="d-flex t-stiky justify-content-around td-action">
                          <FontAwesomeIcon
                            onClick={() => {
                              setShowModalConfirm(true)
                              setId(data.id.toString())
                            }}
                            className=" btn-delete"
                            icon={faTrash}
                          />
                          <FontAwesomeIcon onClick={() => handleEditUser(data.id.toString())} className="btn-edit" icon={faEdit} />
                          <TonggleInput actflg={data.actflg} />
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              ) : (
                <NodataMatching count={10} />
              )}
            </table>
          </div>
          {!!residents.totalRecords && (
            <div className="d-flex justify-content-between table-bottom">
              <div>
                {`Showing
            ${params.pageNum}
            to
            ${params.pageSize}
            of
            ${residents.totalRecords}
            entries`}
              </div>
              <PagingBar currentPage={params.pageNum} totalPages={Math.ceil(Number(residents.totalRecords) / params.pageSize)} onPageChange={setPageNum} />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Residents
