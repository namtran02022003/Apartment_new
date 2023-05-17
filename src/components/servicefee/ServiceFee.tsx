import { FC, useCallback, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import ModalConfirm from '../alertMessage/ModalConfirm'
import { TonggleInput, PagingBar, HeadingPage, NodataMatching } from '../../common/CommonComponent'
import baseAxios from '../../apis/ConfigAxios'
import CreateServicesFee from '../form/CreateServiceFee'
import Loading from '../others/Loading'
import * as moment from 'moment'
import Select from 'react-select'
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
  electricityNumber: number
  waterMumber: number
  buildingName: string
  apartmentName: string
  residentName: string
  actflg: string
  periodName: string
  createdAt: string
  updatedAt: string
  carNumber: number
  cleaningNumber: number
  motorcycleNumber: number
}
const ServiceFee: FC = () => {
  const dispatch = useDispatch()
  const Navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [id, setId] = useState('')
  const [showModalConfirm, setShowModalConfirm] = useState(false)
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
  const handleEditServiceFee = (id: string) => {
    setId(id)
    setShowForm(true)
  }
  const getServicesFee = useCallback(async () => {
    try {
      const res = await baseAxios.get(`/summary/list`, {
        params: {
          pageSize: params.pageSize,
          pageNum: params.pageNum,
          buildingid: params.buildingId.value,
          apartmentId: params.apartmentId.value,
          periodId: params.periodId.value
        }
      })
      setServicesFee(res.data)
    } catch (error) {
      console.log(error)
    }
  }, [params.pageSize, params.pageNum, params.periodId.value, params.apartmentId.value, params.buildingId.value])
  useEffect(() => {
    setTimeout(() => {
      getServicesFee()
      setLoading(false)
    }, 500)
  }, [getServicesFee])
  const deleteServiceFee = async () => {
    try {
      const res = await baseAxios.delete(`/summary/${id}`)
      if (res.data.errorCode == 0) {
        showToasts('Delete success', 'green')
        getServicesFee()
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
  }, [params.buildingId.value, id])
  const ClearSearch = () => {
    setParams({
      ...params,
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
  }
  console.log(servicesFee)
  if (loading) return <Loading />
  return (
    <>
      {showModalConfirm && <ModalConfirm setId={setId} showForm={showModalConfirm} setShowForm={setShowModalConfirm} action={deleteServiceFee} />}
      {showForm && <CreateServicesFee setId={setId} setShow={setShowForm} show={showForm} id={id} getServicesFee={getServicesFee} />}
      <div className="shadow rounded-4 color-table">
        <HeadingPage setShowForm={setShowForm} heading="Service Fee List" />
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
            <Select
              placeholder="select building"
              options={masterDataSelects.buildingId}
              value={params.buildingId.value ? params.buildingId : 0}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onChange={(e: any) => {
                setParams({ ...params, buildingId: e })
              }}
              className="select-fee"
            />
            <Select
              placeholder="select apartment"
              options={masterDataSelects.apartmentId}
              value={params.apartmentId.value ? params.apartmentId : 0}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onChange={(e: any) => {
                setParams({ ...params, apartmentId: e })
              }}
              className="select-fee"
            />
            <button onClick={() => ClearSearch()} className="btn btn-primary px-3">
              Clear search
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
                  <th>Electricity Number</th>
                  <th>Water Number</th>
                  <th>Car Number</th>
                  <th>Motorcycle Number</th>
                  <th>Cleaning Number</th>
                  <th className="text-center">Create At</th>
                  {/* <th className="text-center">Update At</th> */}
                  <th className="text-center th-sm">Actions</th>
                </tr>
              </thead>
              {servicesFee.totalRecords ? (
                <tbody>
                  {servicesFee.item?.map((data) => {
                    return (
                      <tr key={data.id}>
                        <td className="text-center">{data.id}</td>
                        <td>{data.buildingName}</td>
                        <td>{data.apartmentName}</td>
                        <td>{data.periodName}</td>
                        <td>{data.residentName}</td>
                        <td className="text-center">{data.electricityNumber}</td>
                        <td className="text-center">{data.waterMumber}</td>
                        <td className="text-center">{data.carNumber}</td>
                        <td className="text-center">{data.motorcycleNumber}</td>
                        <td className="text-center">{data.cleaningNumber}</td>
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
                          <FontAwesomeIcon onClick={() => handleEditServiceFee(data.id.toString())} className="btn-edit" icon={faEdit} />
                          <TonggleInput actflg={data.actflg} />
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

export default ServiceFee
