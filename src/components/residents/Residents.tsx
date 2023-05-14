import { FC, useCallback, useEffect, useState } from 'react'
import * as moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import { ThStyled } from '../../assets/styles/Th'
import ModalConfirm from '../alertMessage/ModalConfirm'
import baseAxios from '../../apis/ConfigAxios'
import Loading from '../others/Loading'
import { TonggleInput, PagingBar } from '../../common/CommonComponent'
import AlertMessage from '../alertMessage/AlertMessage'
import CreateResident from '../form/CreateResidents'
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
  const [showForm, setShowForm] = useState(false)
  const [id, setId] = useState('')
  const [showModalConfirm, setShowModalConfirm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [residents, setResidents] = useState<usersListFace>({})
  const [messages, setMessages] = useState('')
  const [showMessage, setShowMessage] = useState(false)
  const [errorPage, setErrorPage] = useState('')
  const [params, setParams] = useState({
    pageSize: 10,
    pageNum: 1,
    searchInput: ''
  })
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
      await baseAxios.delete(`/residents/${id}`)
      setMessages('delete success')
      setShowMessage(true)
      getResidents()
      setId('')
    } catch (error) {
      console.log(error)
      setMessages('err')
      setShowMessage(true)
    }
  }
  if (loading) return <Loading />
  if (errorPage) return <div>{errorPage}</div>
  return (
    <div className="rounded-4">
      {showMessage && <AlertMessage show={showMessage} setShow={setShowMessage} message={messages} color="green" />}
      {showModalConfirm && <ModalConfirm showForm={showModalConfirm} setId={setId} setShowForm={setShowModalConfirm} action={deleteResident} />}
      {showForm && (
        <CreateResident
          setShowMes={setShowMessage}
          setMess={setMessages}
          setShow={setShowForm}
          show={showForm}
          id={id}
          getResidents={getResidents}
          setId={setId}
        />
      )}
      <div className="shadow color-table">
        <div className="d-flex mb-4 bg-heading-table px-4 py-2 justify-content-between align-items-center mb-2">
          <h5>Resident List</h5>
          <button onClick={() => setShowForm(true)} className="btn btn-primary px-3 me-3">
            Create
          </button>
        </div>
        {residents.totalRecords ? (
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
                    <ThStyled>Gender</ThStyled>
                    <ThStyled>Address</ThStyled>
                    <ThStyled>Resident Type</ThStyled>
                    <ThStyled>Create dAt</ThStyled>
                    <ThStyled className="text-center t-stiky">Actions</ThStyled>
                  </tr>
                </thead>
                <tbody>
                  {residents.item?.map((data) => {
                    return (
                      <tr key={data.id}>
                        <td className="text-center">{data.id}</td>
                        <td>{data.fullName}</td>
                        <td>{data.email}</td>
                        <td>{data.phoneNumber}</td>
                        <td>{data.idNo}</td>
                        <td>{data.genderName}</td>
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
              </table>
            </div>
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
              <PagingBar currentPage={params.pageNum} totalPages={Math.ceil(Number(residents.totalRecords) / 10)} onPageChange={setPageNum} />
            </div>
          </div>
        ) : (
          <div className="p-4">No data matching</div>
        )}
      </div>
    </div>
  )
}

export default Residents