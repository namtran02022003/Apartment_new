import { FC, useCallback, useEffect, useState } from 'react'
import * as moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import { ThStyled } from '../../assets/styles/Th'
import CreateContracts from '../form/CreateContracts'
import ModalConfirm from '../alertMessage/ModalConfirm'
import baseAxios from '../../apis/ConfigAxios'
import Loading from '../others/Loading'
import { TonggleInput, PagingBar } from '../../common/CommonComponent'
import AlertMessage from '../alertMessage/AlertMessage'
import { InputStyled } from '../../assets/styles/Input'
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
  const [showForm, setShowForm] = useState(false)
  const [id, setId] = useState('')
  const [showModalConfirm, setShowModalConfirm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [contracts, setContractsList] = useState<contractsList>({})
  const [messages, setMessages] = useState('')
  const [showMessage, setShowMessage] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [params, setParams] = useState({
    pageSize: 10,
    pageNum: 1,
    searchInput: ''
  })
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
  const deleteUser = async () => {
    try {
      await baseAxios.delete(`/users/${id}`)
      setMessages('success')
      setShowMessage(true)
      getContracts()
      setId('')
    } catch (error) {
      console.log(error)
      setMessages('err')
      setShowMessage(true)
    }
  }
  console.log(contracts)
  if (loading) return <Loading />
  return (
    <>
      {showMessage && <AlertMessage show={showMessage} setShow={setShowMessage} message={messages} color="green" />}
      {showModalConfirm && <ModalConfirm showForm={showModalConfirm} setId={setId} setShowForm={setShowModalConfirm} action={deleteUser} />}
      {showForm && (
        <CreateContracts
          disabled={disabled}
          setShowMes={setShowMessage}
          setMess={setMessages}
          setShow={setShowForm}
          show={showForm}
          id={id}
          getContracts={getContracts}
          setId={setId}
        />
      )}
      <div className="shadow rounded-4 color-table">
        <div className="d-flex round-top mb-4 bg-heading-table px-4 py-2 justify-content-between align-items-center mb-2">
          <h5>Contract List</h5>
          <button
            onClick={() => {
              setShowForm(true)
              setDisabled(false)
            }}
            className="btn btn-primary px-3 me-3"
          >
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
        {contracts.totalRecords ? (
          <div className="px-4 table-scroll">
            <table id="dtDynamicVerticalScrollExample" className="table color-table table-bordered table-sm">
              <thead>
                <tr>
                  <ThStyled>Contract No</ThStyled>
                  <ThStyled>Building Name</ThStyled>
                  <ThStyled>Apartment Name</ThStyled>
                  <ThStyled>Resident Name</ThStyled>
                  <ThStyled>Start Date</ThStyled>
                  <ThStyled>End Date</ThStyled>
                  <ThStyled className="text-center">Actions</ThStyled>
                </tr>
              </thead>
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
                      <td className="d-flex justify-content-around td-action">
                        <FontAwesomeIcon
                          onClick={() => {
                            setShowModalConfirm(true)
                            setId(data.id.toString())
                          }}
                          className=" btn-delete"
                          icon={faTrash}
                        />
                        <FontAwesomeIcon onClick={() => handleEditContract(data.id.toString(), data.actflg)} className="btn-edit" icon={faEdit} />
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
             ${contracts.totalRecords}
             entries`}
              </div>
              <PagingBar currentPage={params.pageNum} totalPages={Math.ceil(Number(contracts.totalRecords) / 10)} onPageChange={setPageNum} />
            </div>
          </div>
        ) : (
          <div className="p-4">No data matching</div>
        )}
      </div>
    </>
  )
}

export default Contracts
