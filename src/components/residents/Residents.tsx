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
  userName: string
  email: string
  createdAt: string
  updatedAt: string
  orderNo: number
  fullName: string
  id: string
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
      setLoading(false)
    } catch (error) {
      console.log('err', error)
      console.log(setParams)
    }
  }, [params.pageNum, params.pageSize, params.searchInput])
  useEffect(() => {
    setTimeout(() => {
      getResidents()
    }, 500)
  }, [getResidents])
  const setPageNum = (index: number) => {
    setParams({ ...params, pageNum: index })
  }
  const deleteUser = async () => {
    try {
      await baseAxios.delete(`/users/${id}`)
      setMessages('success')
      setShowMessage(true)
      getResidents()
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
      {showModalConfirm && <ModalConfirm showForm={showModalConfirm} setId={setId} setShowForm={setShowModalConfirm} action={deleteUser} />}
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
          <h5>Users List</h5>
          <button onClick={() => setShowForm(true)} className="btn btn-primary px-3 me-3">
            Create
          </button>
        </div>
        <div className="px-4 table-scroll">
          <table id="dtDynamicVerticalScrollExample" className="table color-table table-bordered table-sm">
            <thead>
              <tr>
                <ThStyled className="text-center" width="5%">
                  #
                </ThStyled>
                <ThStyled width="20%">User Name</ThStyled>
                <ThStyled width="20%">Full Name</ThStyled>
                <ThStyled width="20%">Email</ThStyled>
                <ThStyled width="10%">Created At</ThStyled>
                <ThStyled width="10%">Update dAt</ThStyled>
                <ThStyled width="15%" className="text-center">
                  Actions
                </ThStyled>
              </tr>
            </thead>
            <tbody>
              {residents.item?.map((data) => {
                return (
                  <tr key={data.userName}>
                    <td className="text-center">{data.orderNo}</td>
                    <td>{data.userName}</td>
                    <td>{data.fullName}</td>
                    <td>{data.email}</td>
                    <td>{moment(data.createdAt).format('DD/MM/YYYY hh:mm:ss')}</td>
                    <td>{moment(data.updatedAt).format('DD/MM/YYYY hh:mm:ss')}</td>
                    <td className="d-flex justify-content-around td-action">
                      <FontAwesomeIcon
                        onClick={() => {
                          setShowModalConfirm(true)
                          setId(data.id)
                        }}
                        className=" btn-delete"
                        icon={faTrash}
                      />
                      <FontAwesomeIcon onClick={() => handleEditUser(data.id)} className="btn-edit" icon={faEdit} />
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
              ${residents.totalRecords}
              entries`}
            </div>
            <PagingBar currentPage={params.pageNum} totalPages={Math.ceil(Number(residents.totalRecords) / 10)} onPageChange={setPageNum} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Residents
