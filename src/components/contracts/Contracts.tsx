import { FC, useCallback, useEffect, useState } from 'react'
import * as moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit, faCircleCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { ThStyled } from '../../assets/styles/Th'
import CreateContracts from '../form/CreateContracts'
import ModalConfirm from '../alertMessage/ModalConfirm'
import baseAxios from '../../apis/ConfigAxios'
import Loading from '../others/Loading'
import { PagingBar, HeadingPage, NodataMatching } from '../../common/CommonComponent'
import { InputStyled } from '../../assets/styles/Input'
import { useDispatch } from 'react-redux'
import { showToast } from '../toasts/ToastActions'
import { useNavigate } from 'react-router-dom'
export interface Contract {
  id: number
  contractNo: string
  startDate: string
  endDate: string
  residentName: string
  signerDate: string
  contractType: number
  contractTypeName: string
  buildingName: string
  apartmentName: string
  actflg: string
}
interface contractsList {
  item?: [Contract]
  message?: string | null
  totalRecords?: number | string
  errorCode?: string | number
  success?: boolean
}

const Contracts: FC = () => {
  const dispatch = useDispatch()
  const Navigate = useNavigate()
  const [showForm, setShowForm] = useState(false)
  const [id, setId] = useState('')
  const [showModalConfirm, setShowModalConfirm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [contracts, setContractsList] = useState<contractsList>({})
  const [disabled, setDisabled] = useState(false)
  const [showConfirmChangeStatus, setShowConfirmChangeStatus] = useState(false)
  const [typeAction, setTypeAction] = useState('')
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
  const handleEditContract = (id: string, flag: string | null) => {
    setDisabled(!!flag)
    setId(id)
    setShowForm(true)
  }
  const getContracts = useCallback(async () => {
    try {
      const res = await baseAxios.get('/contracts/list', {
        params: {
          pageNum: params.pageNum,
          pageSize: params.pageSize,
          searchInput: params.searchInput
        }
      })
      setContractsList(res.data)
      setLoading(false)
    } catch (error) {
      console.log('err', error)
      console.log(setParams)
    }
  }, [params.pageNum, params.pageSize, params.searchInput])
  useEffect(() => {
    setTimeout(() => {
      getContracts()
    }, 500)
  }, [getContracts])
  const setPageNum = (index: number) => {
    setParams({ ...params, pageNum: index })
  }
  const deleteContact = async () => {
    try {
      const res = await baseAxios.delete(`/contracts/${id}`)
      if (res.data.errorCode == 0) {
        showToasts('Delete success', 'green')
        getContracts()
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
  const ChangeStatusContract = async () => {
    try {
      const res = await baseAxios.post(`/contracts/active-inactive`, {
        id: Number(id),
        actflg: typeAction
      })
      if (res.data.errorCode == 0) {
        showToasts('Success', 'green')
        getContracts()
      } else {
        showToasts(res.data.message, 'green')
      }
      setId('')
    } catch (error) {
      showToasts(error as string, 'red')
    }
  }
  if (loading) return <Loading />
  return (
    <>
      {showModalConfirm && (
        <ModalConfirm
          text="Do you want to delete contract?"
          showForm={showModalConfirm}
          setId={setId}
          setShowForm={setShowModalConfirm}
          action={deleteContact}
        />
      )}
      {showConfirmChangeStatus && (
        <ModalConfirm
          text={typeAction == 'A' ? 'Do you want to approve the contract?' : 'Do you want to terminate the contract?'}
          showForm={showConfirmChangeStatus}
          setId={setId}
          setShowForm={setShowConfirmChangeStatus}
          action={ChangeStatusContract}
        />
      )}
      {showForm && (
        <CreateContracts setDisable={setDisabled} disabled={disabled} setShow={setShowForm} show={showForm} id={id} getContracts={getContracts} setId={setId} />
      )}
      <div className="shadow rounded-4 color-table">
        <HeadingPage setShowForm={setShowForm} heading="Contract List" />
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
                <ThStyled className="text-center">#</ThStyled>
                <ThStyled>Building Name</ThStyled>
                <ThStyled>Apartment Name</ThStyled>
                <ThStyled>Resident Name</ThStyled>
                <ThStyled>Start Date</ThStyled>
                <ThStyled>End Date</ThStyled>
                <ThStyled>Status</ThStyled>
                <ThStyled className="text-center">Actions</ThStyled>
              </tr>
            </thead>
            {contracts.totalRecords ? (
              <tbody>
                {contracts.item?.map((data) => {
                  return (
                    <tr key={data.id}>
                      <td className="text-center">{data.contractNo}</td>
                      <td>{data.buildingName}</td>
                      <td>{data.apartmentName}</td>
                      <td>{data.residentName}</td>
                      <td>{moment(data.startDate).format('DD/MM/YYYY hh:mm:ss')}</td>
                      <td>{moment(data.endDate).format('DD/MM/YYYY hh:mm:ss')}</td>
                      <td>{data.actflg ? data.actflg : 'Pendding'}</td>
                      <td className="d-flex justify-content-around td-action">
                        <FontAwesomeIcon
                          title="Delete contract"
                          onClick={() => {
                            setShowModalConfirm(true)
                            setId(data.id.toString())
                          }}
                          className=" btn-delete"
                          icon={faTrash}
                        />
                        <FontAwesomeIcon
                          title="Edit contract"
                          onClick={() => handleEditContract(data.id.toString(), data.actflg)}
                          className="btn-edit"
                          icon={faEdit}
                        />
                        <FontAwesomeIcon
                          onClick={() => {
                            setId(data.id.toString())
                            setTypeAction('A')
                            setShowConfirmChangeStatus(true)
                          }}
                          title="Confirm contract"
                          className="btn-check-contract"
                          icon={faCircleCheck}
                        />
                        <FontAwesomeIcon
                          onClick={() => {
                            setId(data.id.toString())
                            setTypeAction('I')
                            setShowConfirmChangeStatus(true)
                          }}
                          title="Remove contract"
                          className="btn-remove-contract"
                          icon={faXmark}
                        />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            ) : (
              <NodataMatching count={7} />
            )}
          </table>
          {!!contracts.totalRecords && (
            <div className="d-flex justify-content-between table-bottom">
              <div>
                {`Showing
             ${params.pageNum}
             to
             ${params.pageSize}
             of
             ${contracts.totalRecords}
             entries`}
              </div>
              <PagingBar currentPage={params.pageNum} totalPages={Math.ceil(Number(contracts.totalRecords) / params.pageSize)} onPageChange={setPageNum} />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Contracts
