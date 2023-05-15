import { FC, useCallback, useEffect, useState } from 'react'
import * as moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import { ThStyled } from '../../assets/styles/Th'
import CreateUser from '../form/CreateUser'
import ModalConfirm from '../alertMessage/ModalConfirm'
import baseAxios from '../../apis/ConfigAxios'
import Loading from '../others/Loading'
import { TonggleInput, PagingBar } from '../../common/CommonComponent'
import AlertMessage from '../alertMessage/AlertMessage'
import { InputStyled } from '../../assets/styles/Input'
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

const ListUser: FC = () => {
  const [showForm, setShowForm] = useState(false)
  const [id, setId] = useState('')
  const [showModalConfirm, setShowModalConfirm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [usersList, setUsersList] = useState<usersListFace>({})
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
  const getUsersList = useCallback(async () => {
    try {
      const res = await baseAxios.get('/users/list', {
        params: {
          pageNum: params.pageNum,
          pageSize: params.pageSize,
          searchInput: params.searchInput
        }
      })
      setUsersList(res.data)
      setLoading(false)
    } catch (error) {
      console.log('err', error)
      console.log(setParams)
    }
  }, [params.pageNum, params.pageSize, params.searchInput])
  useEffect(() => {
    setTimeout(() => {
      getUsersList()
    }, 500)
  }, [getUsersList])
  const setPageNum = (index: number) => {
    setParams({ ...params, pageNum: index })
  }
  const deleteUser = async () => {
    try {
      await baseAxios.delete(`/users/${id}`)
      setMessages('success')
      setShowMessage(true)
      getUsersList()
      setId('')
    } catch (error) {
      console.log(error)
      setMessages('err')
      setShowMessage(true)
    }
  }
  if (loading) return <Loading />
  return (
    <>
      {showMessage && <AlertMessage show={showMessage} setShow={setShowMessage} message={messages} color="green" />}
      {showModalConfirm && <ModalConfirm showForm={showModalConfirm} setId={setId} setShowForm={setShowModalConfirm} action={deleteUser} />}
      {showForm && (
        <CreateUser setShowMes={setShowMessage} setMess={setMessages} setShow={setShowForm} show={showForm} id={id} getUsers={getUsersList} setId={setId} />
      )}
      <div className="shadow rounded-4 color-table">
        <div className="d-flex mb-4 round-top bg-heading-table px-4 py-2 justify-content-between align-items-center">
          <h5>Users List</h5>
          <button onClick={() => setShowForm(true)} className="btn btn-primary px-3 me-3">
            Create
          </button>
        </div>
        <div className="d-flex mb-4 px-4 justify-content-between align-items-center">
          <div>
            show
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
        {usersList.totalRecords ? (
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
                {usersList.item?.map((data) => {
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
             ${usersList.totalRecords}
             entries`}
              </div>
              <PagingBar currentPage={params.pageNum} totalPages={Math.ceil(Number(usersList.totalRecords) / 10)} onPageChange={setPageNum} />
            </div>
          </div>
        ) : (
          <div className="p-4">No data matching </div>
        )}
      </div>
    </>
  )
}

export default ListUser
