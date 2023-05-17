import { FC, useCallback, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import ModalConfirm from '../alertMessage/ModalConfirm'
import { PagingBar, HeadingPage, NodataMatching } from '../../common/CommonComponent'
import baseAxios from '../../apis/ConfigAxios'
import AlertMessage from '../alertMessage/AlertMessage'
import CreateServicesFee from '../form/CreateServiceFee'
import Loading from '../others/Loading'
import * as moment from 'moment'
import Select from 'react-select'
import { saveAs } from 'file-saver'
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
  periodId: number
  fromDate: string
  periodName: string
  residentId: number
  residentName: string
  email: string
  buildingId: number
  buildingName: string
  apartmentId: number
  apartmentName: string
  electricityNumber: number
  electricityMoney: number
  waterMumber: number
  waterMoney: number
  motorcycleNumber: number
  motorcycleDeposit: number
  carNumber: number
  carDeposit: number
  serviceFee: number
  cleaningNumber: number
  cleaningFee: number
  createdAt: string
  updatedAt: string
}
const ServiceManagement: FC = () => {
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [id, setId] = useState('')
  const [showModalConfirm, setShowModalConfirm] = useState(false)
  const [messages, setMessages] = useState('')
  const [showMessage, setShowMessage] = useState(false)
  const [servicesFee, setServicesFee] = useState<Services>({})
  const [masterDataSelects, setMasterDataSelects] = useState({
    periodId: [],
    buildingId: [],
    apartmentId: []
  })
  const [params, setParams] = useState({
    pageSize: 10,
    pageNum: 1,
    periodId: {
      label: '',
      value: 0
    },
    buildingId: {
      label: '',
      value: 0
    },
    apartmentId: {
      label: '',
      value: 0
    }
  })
  const setPageNum = (index: number) => {
    setParams({ ...params, pageNum: index })
  }
  const getServicesFee = useCallback(async () => {
    try {
      const res = await baseAxios.get(`/summary/list`, {
        params: {
          pageSize: params.pageSize,
          pageNum: params.pageNum,
          buildingid: 0,
          apartmentId: 0,
          periodId: params.periodId.value
        }
      })
      setServicesFee(res.data)
    } catch (error) {
      console.log(error)
    }
  }, [params.pageSize, params.pageNum, params.periodId.value])
  useEffect(() => {
    setTimeout(() => {
      getServicesFee()
      setLoading(false)
    }, 500)
  }, [getServicesFee])
  const deleteServiceFee = async () => {
    try {
      await baseAxios.delete(`/summary/${id}`)
      setMessages('delete success')
      setShowMessage(true)
      getServicesFee()
    } catch (error) {
      console.log(error)
      setMessages('err')
      setShowMessage(true)
    }
    setId('')
  }
  useEffect(() => {
    const getPeriods = async () => {
      const res = await baseAxios.get('/master-data/period')
      const newData = res.data.item.map((period: { name: string; id: number }) => ({
        label: period.name,
        value: period.id
      }))
      setMasterDataSelects((preData) => ({
        ...preData,
        periodId: newData
      }))
    }
    getPeriods()
  }, [])
  useEffect(() => {
    const getBuildings = async () => {
      const res = await baseAxios.get('/master-data/building')
      const newData = res.data.item.map((building: { name: string; id: number }) => ({
        label: building.name,
        value: building.id
      }))
      setMasterDataSelects((preData) => ({
        ...preData,
        buildingId: newData
      }))
    }
    getBuildings()
  }, [])
  useEffect(() => {
    const getApartments = async () => {
      const res = await baseAxios.get('/master-data/apartment', {
        params: {
          buildingId: params.buildingId.value
        }
      })
      const newData = res.data.item.map((apartment: { name: string; id: number }) => ({
        label: apartment.name,
        value: apartment.id
      }))
      setMasterDataSelects((preData) => ({
        ...preData,
        apartmentId: newData
      }))
      if (!res.data.item.length) {
        setParams((pre) => ({
          ...pre,
          apartmentId: {
            label: '',
            value: 0
          }
        }))
      }
    }
    getApartments()
  }, [params.buildingId.value])

  const exportCsv = async () => {
    const res = await baseAxios.get('/summary/export-csv', {
      params: {
        periodId: params.periodId.value
      }
    })
    try {
      const csvContent = '\ufeff' + res.data
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      saveAs(blob, 'building-services.csv')
      setMessages('dowaload success')
      setShowMessage(true)
    } catch (error) {
      setMessages(error as string)
      setShowMessage(true)
    }
  }
  const sendAllEmail = async () => {
    await baseAxios.get('/summary/sendmail-list', {
      params: {
        periodId: params.periodId.value
      }
    })
    setMessages('send email success')
    setShowMessage(true)
  }
  const sendMail = async (id: number) => {
    await baseAxios.get('/summary/sendmail', {
      params: {
        summaryId: id
      }
    })
    setMessages('send email success')
    setShowMessage(true)
  }
  console.log(servicesFee)
  if (loading) return <Loading />
  return (
    <>
      {showMessage && <AlertMessage show={showMessage} setShow={setShowMessage} message={messages} color="green" />}
      {showModalConfirm && <ModalConfirm setId={setId} showForm={showModalConfirm} setShowForm={setShowModalConfirm} action={deleteServiceFee} />}
      {showForm && (
        <CreateServicesFee
          setMess={setMessages}
          setShowMes={setShowMessage}
          setId={setId}
          setShow={setShowForm}
          show={showForm}
          id={id}
          getServicesFee={getServicesFee}
        />
      )}
      <div className="shadow rounded-4 color-table">
        <HeadingPage isDisable={true} setShowForm={setShowForm} heading="Service Management List" />
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
          <div className="d-flex flex-grow-02 justify-content-around">
            <Select
              placeholder="select period"
              options={masterDataSelects.periodId}
              value={params.periodId.value ? params.periodId : 0}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onChange={(e: any) => {
                setParams({ ...params, periodId: e })
              }}
              className="select-fee"
            />
            <button
              onClick={() => {
                setParams({
                  ...params,
                  periodId: {
                    label: '',
                    value: 0
                  }
                })
              }}
              className="btn btn-primary px-3"
            >
              Clear search
            </button>
            <button onClick={() => exportCsv()} disabled={!params.periodId.value} className="btn btn-primary px-3">
              Export csv
            </button>
            <button className="btn btn-primary px-3">Calculator</button>
            <button onClick={() => sendAllEmail()} disabled={!params.periodId.value} className="btn btn-primary px-3">
              Send Email
            </button>
          </div>
        </div>
        <div className="px-4 table-scroll">
          <div className="table-scroll-content">
            <table id="dtDynamicVerticalScrollExample" className="table color-table table-bordered table-sm">
              <thead>
                <tr>
                  <th className="text-center">#</th>
                  <th>Building Name</th>
                  <th>Apartment Name</th>
                  <th>Period</th>
                  <th>Resident Name</th>
                  <th>Electricity Price</th>
                  <th>Water Price</th>
                  <th>Cleaning Price</th>
                  <th>Motorcycle Price</th>
                  <th>Car Price</th>
                  <th className="text-center">Create At</th>
                  {/* <th className="text-center">Update At</th> */}
                  <th className="text-center th-sm">Actions</th>
                </tr>
              </thead>
              {servicesFee.totalRecords ? (
                <tbody>
                  {servicesFee.item?.map((data) => {
                    return (
                      <tr key={data.orderNo}>
                        <td className="text-center">{data.orderNo}</td>
                        <td>{data.buildingName}</td>
                        <td>{data.apartmentName}</td>
                        <td>{data.periodName}</td>
                        <td>{data.residentName}</td>
                        <td className="text-center">{data.electricityNumber}</td>
                        <td className="text-center">{data.waterMumber}</td>
                        <td className="text-center">{data.cleaningFee}</td>
                        <td className="text-center">{data.motorcycleDeposit}</td>
                        <td className="text-center">{data.carDeposit}</td>
                        <td>{moment(data.createdAt).format('DD/MM/YYYY hh:mm:ss')}</td>
                        {/* <td>{moment(data.updatedAt).format('DD/MM/YYYY hh:mm:ss')}</td> */}
                        <td className="d-flex justify-content-around td-action">
                          {/* <FontAwesomeIcon
                          onClick={() => {
                            setShowModalConfirm(true)
                            setId(data.id.toString())
                          }}
                          className="btn-delete"
                          icon={faTrash}
                        /> */}
                          <FontAwesomeIcon onClick={() => sendMail(data.id)} title="send all email" className="btn-edit" icon={faEnvelope} />
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              ) : (
                <NodataMatching count={9} />
              )}
            </table>
          </div>
          {!!servicesFee.totalRecords && (
            <div className="d-flex justify-content-between table-bottom">
              <div>
                {`Showing
            ${params.pageNum}
            to
            ${params.pageSize}
            of
            ${servicesFee.totalRecords}
            entries`}
              </div>
              <PagingBar currentPage={params.pageNum} totalPages={Math.ceil(Number(servicesFee.totalRecords) / params.pageSize)} onPageChange={setPageNum} />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ServiceManagement
