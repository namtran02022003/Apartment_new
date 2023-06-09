import { FC, useState, useEffect } from 'react'
import { InputStyled } from '../../assets/styles/Input'
import { Forms } from '../../assets/styles/Forms'
import { ValidateContract } from './Validates'
import baseAxios from '../../apis/ConfigAxios'
import * as moment from 'moment'
import Select from 'react-select'
import { useDispatch } from 'react-redux'
import { showToast } from '../toasts/ToastActions'
import { useNavigate } from 'react-router-dom'
interface ContractProps {
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  setId: React.Dispatch<React.SetStateAction<string>>
  show: boolean
  id?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getContracts: any
  disabled: boolean
  setDisable: React.Dispatch<React.SetStateAction<boolean>>
}
const CreateContracts: FC<ContractProps> = ({ show, setShow, id, getContracts, setId, disabled, setDisable }) => {
  const dispatch = useDispatch()
  const Navigate = useNavigate()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [errors, setError] = useState<any>({})
  const [contracts, setContracts] = useState({
    id: 0,
    contractNo: '',
    startDate: '',
    endDate: '',
    numberPeple: 0,
    rentalPurpose: '',
    rentalUnitPrice: 0,
    residentId: {
      value: 0,
      label: ''
    },
    signerDate: '',
    contractType: {
      value: 0,
      label: ''
    },
    buildingId: {
      value: 0,
      label: ''
    },
    apartmentId: {
      value: 0,
      label: ''
    }
  })
  const [masterDatas, setMasterDatas] = useState({
    residentId: [],
    buildingId: [],
    contractType: [],
    apartmentId: []
  })
  const showToasts = (message: string, color: string) => {
    dispatch(
      showToast({
        message: message,
        color: color
      })
    )
  }
  const onSubmit = async () => {
    if (!(Object.keys(ValidateContract(contracts, setError)).length > 0)) {
      const newData = {
        ...contracts,
        residentId: contracts.residentId.value,
        buildingId: contracts.buildingId.value,
        contractType: contracts.contractType.value,
        apartmentId: contracts.apartmentId.value
      }
      try {
        const res = await baseAxios.post('/contracts/insert-update', newData)
        if (res.data.success && res.data.errorCode == 0) {
          getContracts()
          if (id) {
            showToasts('Edit success', 'green')
          } else {
            showToasts('Create success', 'green')
          }
          setShow(!show)
          if (id) {
            setId('')
          }
        } else if (res.data.errorCode == 401) {
          Navigate('/login')
        } else {
          showToasts(res.data.message, 'red')
        }
      } catch (error) {
        showToasts(error as string, 'red')
      }
    }
  }
  useEffect(() => {
    const getContrac = async () => {
      const res = await baseAxios.get(`/contracts/${id}`)
      const data = res.data.item
      console.log(data)
      const preData = {
        id: data.id,
        contractNo: data.contractNo,
        endDate: data.endDate,
        startDate: data.startDate,
        signerDate: data.signerDate,
        numberPeple: data.numberPeple,
        rentalPurpose: data.rentalPurpose,
        rentalUnitPrice: data.rentalUnitPrice,
        residentId: {
          value: data.residentId,
          label: data.residentName
        },
        contractType: {
          value: data.contractType,
          label: data.contractTypeName
        },
        buildingId: {
          value: data.buildingId,
          label: data.buildingName
        },
        apartmentId: {
          value: data.apartmentId,
          label: data.apartmentName
        }
      }
      setContracts(preData)
    }
    if (id) {
      getContrac()
    }
  }, [id])
  useEffect(() => {
    const getResidents = async () => {
      const res = await baseAxios.get('master-data/resident')
      const newData = res.data.item.map((resident: { id: number; name: string }) => ({
        label: resident.name,
        value: resident.id
      }))
      setMasterDatas((preData) => ({
        ...preData,
        residentId: newData
      }))
    }
    const getBuildingId = async () => {
      const res = await baseAxios.get('master-data/building')
      const newData = res.data.item.map((building: { id: number; name: string }) => ({
        label: building.name,
        value: building.id
      }))
      setMasterDatas((preData) => ({
        ...preData,
        buildingId: newData
      }))
    }
    const getContractType = async () => {
      const res = await baseAxios.get('master-data/contract-type')
      const newData = res.data.item.map((contract: { id: number; name: string }) => ({
        label: contract.name,
        value: contract.id
      }))
      setMasterDatas((preData) => ({
        ...preData,
        contractType: newData
      }))
    }
    try {
      getResidents()
      getBuildingId()
      getContractType()
    } catch (error) {
      console.log(error)
    }
  }, [])
  useEffect(() => {
    const getApartmentId = async () => {
      const res = await baseAxios.get('master-data/apartment-data', {
        params: {
          buildingId: contracts.buildingId.value
        }
      })
      const newData = res.data.item.map((apartment: { id: number; name: string }) => ({
        label: apartment.name,
        value: apartment.id
      }))
      setMasterDatas((preData) => ({
        ...preData,
        apartmentId: newData
      }))
    }
    getApartmentId()
  }, [contracts.buildingId.value])
  console.log(masterDatas)
  return (
    <Forms className="bg-form">
      <div className="w-75 animate bg-white rounded-3 form-content">
        <h5 className="title_page px-3 rounded-3 py-2 bg-heading-table pt-2">{id ? 'Edit' : 'Create new'} Contract</h5>
        <div>
          <form className="p-3 login">
            <div className="row">
              <div className="col-6">
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="contractNo">
                    Contract No:
                    <span className="color-red">*</span>
                  </label>
                  <InputStyled
                    disabled={disabled}
                    id="contractNo"
                    type="text"
                    placeholder="Enter contract no"
                    value={contracts.contractNo}
                    maxLength={50}
                    onChange={(e) => {
                      setContracts({ ...contracts, contractNo: e.target.value })
                      setError({ ...errors, contractNo: '' })
                    }}
                  />
                  {errors.contractNo && <p className="m-0 message_form">{errors.contractNo}</p>}
                </div>
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="startDate">
                    Start Date:
                    <span className="color-red">*</span>
                  </label>
                  <InputStyled
                    max={contracts.endDate}
                    disabled={disabled}
                    id="startDate"
                    type="date"
                    placeholder="Enter startDate"
                    value={moment(contracts.startDate).format('YYYY-MM-DD')}
                    onChange={(e) => {
                      setContracts({ ...contracts, startDate: e.target.value })
                      setError({ ...errors, startDate: '' })
                    }}
                  />
                  {errors.startDate && <p className="m-0 message_form">{errors.startDate}</p>}
                </div>
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="buildingId">
                    Building Name:
                    <span className="color-red">*</span>
                  </label>
                  <Select
                    isDisabled={disabled}
                    placeholder="Select a building name"
                    value={contracts.buildingId.value ? contracts.buildingId : 0}
                    options={masterDatas.buildingId}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onChange={(e: any) => {
                      setContracts({ ...contracts, buildingId: e })
                      setError({ ...errors, buildingId: '' })
                    }}
                    id="buildingId"
                  />
                  {errors.buildingId && <p className="m-0 message_form">{errors.buildingId}</p>}
                </div>
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="contractType">
                    Contract Type:
                    <span className="color-red">*</span>
                  </label>
                  <Select
                    isDisabled={disabled}
                    placeholder="Select a contract type name"
                    value={contracts.contractType.value ? contracts.contractType : 0}
                    options={masterDatas.contractType}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onChange={(e: any) => {
                      setContracts({ ...contracts, contractType: e })
                      setError({ ...errors, contractType: '' })
                    }}
                    id="contractType"
                  />
                  {errors.contractType && <p className="m-0 message_form">{errors.contractType}</p>}
                </div>
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="rentalUnitPrice">
                    Rental UnitPrice:
                    <span className="color-red">*</span>
                  </label>
                  <InputStyled
                    disabled={disabled}
                    id="rentalUnitPrice"
                    type="number"
                    min={0}
                    placeholder="Enter contract no"
                    value={contracts.rentalUnitPrice}
                    maxLength={50}
                    onChange={(e) => {
                      setContracts({ ...contracts, rentalUnitPrice: Number(e.target.value) })
                      setError({ ...errors, rentalUnitPrice: '' })
                    }}
                  />
                  {errors.rentalUnitPrice && <p className="m-0 message_form">{errors.rentalUnitPrice}</p>}
                </div>
              </div>
              <div className="col-6">
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="residentId">
                    Resident Name:
                    <span className="color-red">*</span>
                  </label>
                  <Select
                    isDisabled={disabled}
                    placeholder="Select a resident name"
                    value={contracts.residentId.value ? contracts.residentId : 0}
                    options={masterDatas.residentId}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onChange={(e: any) => {
                      setContracts({ ...contracts, residentId: e })
                      setError({ ...errors, residentId: '' })
                    }}
                    id="residentId"
                  />
                  {errors.residentId && <p className="m-0 message_form">{errors.residentId}</p>}
                </div>
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="endDate">
                    End Date:
                    <span className="color-red">*</span>
                  </label>
                  <InputStyled
                    min={contracts.startDate}
                    disabled={disabled}
                    id="endDate"
                    type="date"
                    placeholder="Enter end date"
                    value={moment(contracts.endDate).format('YYYY-MM-DD')}
                    onChange={(e) => {
                      setContracts({ ...contracts, endDate: e.target.value })
                      setError({ ...errors, endDate: '' })
                    }}
                  />
                  {errors.endDate && <p className="m-0 message_form">{errors.endDate}</p>}
                </div>
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="apartmentId">
                    Apartment Name:
                    <span className="color-red">*</span>
                  </label>
                  <Select
                    isDisabled={disabled}
                    placeholder="Select a apartment name"
                    value={contracts.apartmentId.value ? contracts.apartmentId : 0}
                    options={masterDatas.apartmentId}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onChange={(e: any) => {
                      setContracts({ ...contracts, apartmentId: e })
                      setError({ ...errors, apartmentId: '' })
                    }}
                    id="apartmentId"
                  />
                  {errors.apartmentId && <p className="m-0 message_form">{errors.apartmentId}</p>}
                </div>
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="signerDate">
                    Signer Date:
                    <span className="color-red">*</span>
                  </label>
                  <InputStyled
                    min={contracts.startDate}
                    max={contracts.endDate}
                    disabled={disabled}
                    id="signerDate"
                    type="date"
                    placeholder="Enter signer date"
                    value={moment(contracts.signerDate).format('YYYY-MM-DD')}
                    onChange={(e) => {
                      setContracts({ ...contracts, signerDate: e.target.value })
                      setError({ ...errors, signerDate: '' })
                    }}
                  />
                  {errors.signerDate && <p className="m-0 message_form">{errors.signerDate}</p>}
                </div>
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="numberPeple">
                    Number Peple:
                    <span className="color-red">*</span>
                  </label>
                  <InputStyled
                    disabled={disabled}
                    id="numberPeple"
                    type="number"
                    min={0}
                    placeholder="Enter number peple"
                    value={contracts.numberPeple}
                    maxLength={50}
                    onChange={(e) => {
                      setContracts({ ...contracts, numberPeple: Number(e.target.value) })
                      setError({ ...errors, numberPeple: '' })
                    }}
                  />
                  {errors.numberPeple && <p className="m-0 message_form">{errors.numberPeple}</p>}
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-end mt-3">
              <button
                onClick={() => {
                  setShow(!show)
                  setId('')
                  setDisable(false)
                }}
                type="button"
                className="mx-3 btn border"
              >
                Cancel
              </button>
              <button disabled={disabled} onClick={() => onSubmit()} type="button" className="btn mx-3  btn-success">
                {id ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Forms>
  )
}

export default CreateContracts
