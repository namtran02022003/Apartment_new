import { FC, useState, useEffect } from 'react'
import { InputStyled } from '../../assets/styles/Input'
import AlertMessage from '../alertMessage/AlertMessage'
import { Forms } from '../../assets/styles/Forms'
import { ValidateServiceFee } from './Validates'
import baseAxios from '../../apis/ConfigAxios'
import Select from 'react-select'
interface SignUpProps {
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  setShowMes: React.Dispatch<React.SetStateAction<boolean>>
  setId: React.Dispatch<React.SetStateAction<string>>
  setMess: React.Dispatch<React.SetStateAction<string>>
  show: boolean
  id?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getServicesFee: any
}
const CreateServicesFee: FC<SignUpProps> = ({ show, setShow, id, getServicesFee, setId, setMess, setShowMes }) => {
  const [showMessage, setShowMessage] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [errors, setError] = useState<any>({})
  const [servicesFee, setServicesFee] = useState({
    id: 0,
    periodId: {
      label: '',
      value: 0
    },
    residentId: {
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
    },
    electricityNumber: 0,
    waterMumber: 0,
    carNumber: 0,
    motorcycleNumber: 0,
    cleaningNumber: 0
  })
  const [masterDataSelects, setMasterDataSelects] = useState({
    periodId: [],
    residentId: [],
    buildingId: [],
    apartmentId: []
  })

  const onSubmit = async () => {
    if (!(Object.keys(ValidateServiceFee(servicesFee, setError)).length > 0)) {
      const newServiceFee = {
        ...servicesFee,
        periodId: servicesFee.periodId.value,
        residentId: servicesFee.residentId.value,
        buildingId: servicesFee.buildingId.value,
        apartmentId: servicesFee.apartmentId.value
      }
      try {
        await baseAxios.post('/summary/insert-update', newServiceFee)
        getServicesFee()
        setMess(id ? 'Edit success' : 'Create success')
        setShowMes(true)
        setShow(!show)
        if (id) {
          setId('')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
  useEffect(() => {
    const getServiceFee = async () => {
      const res = await baseAxios.get(`/summary/${id}`)
      const data = res.data.item
      const newData = {
        id: data.id,
        periodId: {
          label: data.periodName,
          value: data.periodId
        },
        residentId: {
          label: data.residentName,
          value: data.residentId
        },
        buildingId: {
          label: data.buildingName,
          value: data.buildingId
        },
        apartmentId: {
          label: data.apartmentName,
          value: data.apartmentId
        },
        electricityNumber: data.electricityNumber,
        waterMumber: data.waterMumber,
        carNumber: data.carNumber,
        motorcycleNumber: data.motorcycleNumber,
        cleaningNumber: data.cleaningNumber
      }
      setServicesFee(newData)
    }
    if (id) {
      getServiceFee()
    }
  }, [id])
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
          buildingId: servicesFee.buildingId.value
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
        setServicesFee((pre) => ({
          ...pre,
          apartmentId: {
            label: '',
            value: 0
          }
        }))
      }
    }
    getApartments()
  }, [servicesFee.buildingId.value])
  useEffect(() => {
    const getResidents = async () => {
      const res = await baseAxios.get('master-data/resident')
      const newData = res.data.item.map((resident: { id: number; name: string }) => ({
        label: resident.name,
        value: resident.id
      }))
      setMasterDataSelects((preData) => ({
        ...preData,
        residentId: newData
      }))
    }
    getResidents()
  }, [])
  console.log(servicesFee.apartmentId)
  return (
    <Forms className="bg-form">
      {showMessage && <AlertMessage color={'green'} message="ok" show={showMessage} setShow={setShowMessage} />}
      <div className="w-50 animate bg-white rounded-3 form-content">
        <h5 className="title_page px-3 rounded-3 py-2 bg-heading-table pt-2">{id ? 'Edit' : 'Create new'} Service Fee</h5>
        <div>
          <form className="p-3 login">
            <div className="row">
              <div className="col-6">
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="period">
                    Period:
                    <span className="color-red">*</span>
                  </label>
                  <Select
                    placeholder="Select a period"
                    value={servicesFee.periodId.value ? servicesFee.periodId : 0}
                    options={masterDataSelects.periodId}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onChange={(e: any) => {
                      setServicesFee({ ...servicesFee, periodId: e })
                      setError({ ...errors, periodId: '' })
                    }}
                    id="apartmentId"
                  />
                  {errors.periodId && <p className="m-0 message_form">{errors.periodId}</p>}
                </div>
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="apartmentname">
                    Apartment Name:
                    <span className="color-red">*</span>
                  </label>
                  <Select
                    placeholder="Select a period"
                    value={servicesFee.apartmentId.value ? servicesFee.apartmentId : 0}
                    options={masterDataSelects.apartmentId}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onChange={(e: any) => {
                      setServicesFee({ ...servicesFee, apartmentId: e })
                      setError({ ...errors, apartmentId: '' })
                    }}
                    id="apartmentname"
                  />
                  {errors.apartmentId && <p className="m-0 message_form">{errors.apartmentId}</p>}
                </div>
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="servicesPrice">
                    Electricity Number:
                    <span className="color-red">*</span>
                  </label>
                  <InputStyled
                    id="servicesPrice"
                    type="number"
                    placeholder="Enter service price"
                    value={servicesFee.electricityNumber}
                    maxLength={50}
                    min={0}
                    onChange={(e) => {
                      setServicesFee({ ...servicesFee, electricityNumber: Number(e.target.value) })
                      setError({ ...errors, electricityNumber: '' })
                    }}
                  />
                  {errors.electricityNumber && <p className="m-0 message_form">{errors.electricityNumber}</p>}
                </div>
              </div>
              <div className="col-6">
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="servicesPrice">
                    Building Name:
                    <span className="color-red">*</span>
                  </label>
                  <Select
                    placeholder="Select a period"
                    value={servicesFee.buildingId.value ? servicesFee.buildingId : 0}
                    options={masterDataSelects.buildingId}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onChange={(e: any) => {
                      setServicesFee({ ...servicesFee, buildingId: e })
                      setError({ ...errors, buildingId: '' })
                    }}
                    id="apartmentId"
                  />
                  {errors.buildingId && <p className="m-0 message_form">{errors.buildingId}</p>}
                </div>
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="serviceName">
                    Resident Name:
                    <span className="color-red">*</span>
                  </label>
                  <Select
                    placeholder="Select a period"
                    value={servicesFee.residentId.value ? servicesFee.residentId : 0}
                    options={masterDataSelects.residentId}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onChange={(e: any) => {
                      setServicesFee({ ...servicesFee, residentId: e })
                      setError({ ...errors, residentId: '' })
                    }}
                    id="apartmentId"
                  />
                  {errors.residentId && <p className="m-0 message_form">{errors.residentId}</p>}
                </div>
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="waterNum">
                    Water Number:
                    <span className="color-red">*</span>
                  </label>
                  <InputStyled
                    id="waterNum"
                    type="number"
                    placeholder="Enter service price"
                    value={servicesFee.waterMumber}
                    maxLength={50}
                    min={0}
                    onChange={(e) => {
                      setServicesFee({ ...servicesFee, waterMumber: Number(e.target.value) })
                      setError({ ...errors, waterMumber: '' })
                    }}
                  />
                  {errors.waterMumber && <p className="m-0 message_form">{errors.waterMumber}</p>}
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <div className="my-2 position-relative pb-1">
                    <label htmlFor="carnumber">
                      Car Number:
                      <span className="color-red">*</span>
                    </label>
                    <InputStyled
                      id="carnumber"
                      type="number"
                      placeholder="Enter car number"
                      value={servicesFee.carNumber}
                      maxLength={50}
                      min={0}
                      onChange={(e) => {
                        setServicesFee({ ...servicesFee, carNumber: Number(e.target.value) })
                        setError({ ...errors, carNumber: '' })
                      }}
                    />
                    {errors.carNumber && <p className="m-0 message_form">{errors.carNumber}</p>}
                  </div>
                </div>
                <div className="col-4">
                  <div className="my-2 position-relative pb-1">
                    <label htmlFor="motorcycleNumber">
                      Motorcycle Number:
                      <span className="color-red">*</span>
                    </label>
                    <InputStyled
                      id="motorcycleNumber"
                      type="number"
                      placeholder="Enter motorcycle number"
                      value={servicesFee.motorcycleNumber}
                      maxLength={50}
                      min={0}
                      onChange={(e) => {
                        setServicesFee({ ...servicesFee, motorcycleNumber: Number(e.target.value) })
                        setError({ ...errors, motorcycleNumber: '' })
                      }}
                    />
                    {errors.motorcycleNumber && <p className="m-0 message_form">{errors.motorcycleNumber}</p>}
                  </div>
                </div>
                <div className="col-4">
                  <div className="my-2 position-relative pb-1">
                    <label htmlFor="cleaningNumber">
                      Cleaning Number:
                      <span className="color-red">*</span>
                    </label>
                    <InputStyled
                      id="cleaningNumber"
                      type="number"
                      placeholder="Enter cleaning number"
                      value={servicesFee.cleaningNumber}
                      maxLength={50}
                      min={0}
                      onChange={(e) => {
                        setServicesFee({ ...servicesFee, cleaningNumber: Number(e.target.value) })
                        setError({ ...errors, cleaningNumber: '' })
                      }}
                    />
                    {errors.cleaningNumber && <p className="m-0 message_form">{errors.cleaningNumber}</p>}
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-end mt-3">
              <button
                onClick={() => {
                  setShow(!show)
                  setId('')
                }}
                type="button"
                className="mx-3 btn border"
              >
                Cancel
              </button>
              <button onClick={() => onSubmit()} type="button" className="btn mx-3  btn-success">
                {id ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Forms>
  )
}

export default CreateServicesFee
