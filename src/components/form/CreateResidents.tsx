import { FC, useState, useEffect } from 'react'
import { InputStyled } from '../../assets/styles/Input'
import AlertMessage from '../alertMessage/AlertMessage'
import { Forms } from '../../assets/styles/Forms'
// import { ValidateServices } from './Validates'
import baseAxios from '../../apis/ConfigAxios'
import { SelectStyled } from './FormCreateApartment'
import Select from 'react-select'
interface SignUpProps {
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  setShowMes: React.Dispatch<React.SetStateAction<boolean>>
  setId: React.Dispatch<React.SetStateAction<string>>
  setMess: React.Dispatch<React.SetStateAction<string>>
  show: boolean
  id?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getResidents: any
}
interface OptionSelect {
  id: number
  name: string
}
const CreateResident: FC<SignUpProps> = ({ show, setShow, id, getResidents, setId, setMess, setShowMes }) => {
  const [showMessage, setShowMessage] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [errors, setError] = useState<any>({})
  const [residents, setResidents] = useState({
    id: 0,
    fullName: '',
    email: '',
    birthDate: '',
    gender: 0,
    phoneNumber: '',
    idNo: '',
    idDate: '',
    idPlace: '',
    nationId: {
      value: 0,
      label: ''
    },
    provinceId: {
      value: 0,
      label: ''
    },
    districtId: {
      value: 0,
      label: ''
    },
    wardId: {
      value: 0,
      label: ''
    },
    address: '',
    residentType: 0
  })
  const [masterDatas, setMasterDatas] = useState({
    genders: [],
    nations: [],
    provinces: [],
    districts: [],
    wards: [],
    residentTypes: []
  })
  const onSubmit = async () => {
    console.log(residents)
    // if (!(Object.keys(ValidateServices(residents, setError)).length > 0)) {
    //   try {
    //     await baseAxios.post('/services/insert-update', residents)
    //     getResidents()
    //     setMess(id ? 'Edit success' : 'Create success')
    //     setShowMes(true)
    //     setShow(!show)
    //     if (id) {
    //       setId('')
    //     }
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
  }
  // useEffect(() => {
  //   const getService = async () => {
  //     const res = await baseAxios.get(`/residents/${id}`)
  //     setResidents(res.data.item)
  //   }
  //   if (id) {
  //     getService()
  //   }
  // }, [id])
  // useEffect(() => {
  //   const getDataMasters = async () => {
  //     try {
  //       const resGender = await baseAxios.get('master-data/gender')
  //       const resNation = await baseAxios.get('master-data/nation')
  //       const resProvince = await baseAxios.get('master-data/province')
  //       const resDistrict = await baseAxios.get('master-data/district')
  //       const resWard = await baseAxios.get('master-data/ward')
  //       const resResidentType = await baseAxios.get('master-data/resident-type')
  //       console.log(resGender.data)
  //       console.log(resNation.data)
  //       console.log(resProvince.data)
  //       console.log(resDistrict.data)
  //       console.log(resWard.data)
  //       console.log(resResidentType.data)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   getDataMasters()
  // }, [])
  useEffect(() => {
    const getGender = async () => {
      const res = await baseAxios.get('master-data/gender')
      setMasterDatas((preData) => ({
        ...preData,
        genders: res.data.item
      }))
    }
    const getResidentType = async () => {
      const res = await baseAxios.get('master-data/resident-type')
      setMasterDatas((preData) => ({
        ...preData,
        residentTypes: res.data.item
      }))
    }
    try {
      getResidentType()
      getGender()
    } catch (error) {
      console.log('err get data type', error)
    }
  }, [])
  useEffect(() => {
    const getNation = async () => {
      const res = await baseAxios.get('master-data/nation')
      const newData = res.data.item.map((nation: OptionSelect) => ({
        label: nation.name,
        value: nation.id
      }))
      setMasterDatas((preData) => ({
        ...preData,
        nations: newData
      }))
    }
    getNation()
  }, [])
  useEffect(() => {
    const getProvince = async () => {
      const res = await baseAxios.get('master-data/province', {
        params: {
          nationId: residents.nationId.value
        }
      })
      const newData = res.data.item.map((nation: OptionSelect) => ({
        label: nation.name,
        value: nation.id
      }))
      setMasterDatas((preData) => ({
        ...preData,
        provinces: newData
      }))
    }
    if (residents.nationId) {
      getProvince()
    }
  }, [residents.nationId])
  useEffect(() => {
    const getDistrict = async () => {
      const res = await baseAxios.get('master-data/district', {
        params: {
          provinceId: residents.provinceId.value
        }
      })
      const newData = res.data.item.map((nation: OptionSelect) => ({
        label: nation.name,
        value: nation.id
      }))
      setMasterDatas((preData) => ({
        ...preData,
        districts: newData
      }))
    }
    if (residents.provinceId) {
      getDistrict()
    }
  }, [residents.provinceId])
  useEffect(() => {
    const getWard = async () => {
      const res = await baseAxios.get('master-data/ward', {
        params: {
          districtId: residents.districtId.value
        }
      })
      const newData = res.data.item.map((nation: OptionSelect) => ({
        label: nation.name,
        value: nation.id
      }))
      setMasterDatas((preData) => ({
        ...preData,
        wards: newData
      }))
    }
    if (residents.districtId) {
      getWard()
    }
  }, [residents.districtId])
  return (
    <Forms className="bg-form">
      {showMessage && <AlertMessage color={'green'} message="ok" show={showMessage} setShow={setShowMessage} />}
      <div className="w-75 animate bg-white rounded-3 form-content">
        <h5 className="title_page px-3 rounded-3 py-2 bg-heading-table pt-2">{id ? 'Edit' : 'Create new'} Resident</h5>
        <div>
          <form className="p-3 login">
            <div className="row">
              <div className="col-4">
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="fullName">
                    Full Name:
                    <span className="color-red">*</span>
                  </label>
                  <InputStyled
                    id="fullName"
                    type="text"
                    placeholder="Enter full name"
                    value={residents.fullName}
                    onChange={(e) => {
                      setResidents({ ...residents, fullName: e.target.value })
                      setError({ ...errors, fullName: '' })
                    }}
                  />
                  {errors.servicesCode && <p className="m-0 message_form">{errors.servicesCode}</p>}
                </div>
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="email">
                    Email:
                    <span className="color-red">*</span>
                  </label>
                  <InputStyled
                    id="email"
                    type="text"
                    placeholder="Enter email"
                    value={residents.email}
                    onChange={(e) => {
                      setResidents({ ...residents, email: e.target.value })
                      setError({ ...errors, email: '' })
                    }}
                  />
                  {errors.servicesCode && <p className="m-0 message_form">{errors.servicesCode}</p>}
                </div>
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="birthDate">
                    Birth of Date:
                    <span className="color-red">*</span>
                  </label>
                  <InputStyled
                    id="birthDate"
                    type="date"
                    placeholder="Enter birthDate"
                    value={residents.birthDate}
                    onChange={(e) => {
                      setResidents({ ...residents, birthDate: e.target.value })
                      setError({ ...errors, birthDate: '' })
                    }}
                  />
                  {errors.birthDate && <p className="m-0 message_form">{errors.birthDate}</p>}
                </div>
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="gender">Gender</label>
                  <SelectStyled
                    id="gender"
                    value={residents.gender}
                    onChange={(e) => {
                      setResidents({ ...residents, gender: Number(e.target.value) })
                    }}
                    title="Apartment type"
                  >
                    <option value={''}>Gender</option>
                    {masterDatas.genders.map((gender: { id: number; name: string }) => {
                      return (
                        <option value={gender.id} key={gender.id}>
                          {gender.name}
                        </option>
                      )
                    })}
                  </SelectStyled>
                  {errors.gender && <p className="m-0 message_form">{errors.gender}</p>}
                </div>
              </div>
              <div className="col-4">
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="phoneNumber">
                    Phone Number:
                    <span className="color-red">*</span>
                  </label>
                  <InputStyled
                    id="phoneNumber"
                    type="text"
                    placeholder="Enter phone number"
                    value={residents.phoneNumber}
                    maxLength={50}
                    onChange={(e) => {
                      setResidents({ ...residents, phoneNumber: e.target.value })
                      setError({ ...errors, phoneNumber: '' })
                    }}
                  />
                  {errors.phoneNumber && <p className="m-0 message_form">{errors.phoneNumber}</p>}
                </div>
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="idNo">
                    ID Code:
                    <span className="color-red">*</span>
                  </label>
                  <InputStyled
                    id="idNo"
                    type="text"
                    placeholder="Enter id code"
                    value={residents.idNo}
                    onChange={(e) => {
                      setResidents({ ...residents, idNo: e.target.value })
                      setError({ ...errors, idNo: '' })
                    }}
                  />
                  {errors.idNo && <p className="m-0 message_form">{errors.idNo}</p>}
                </div>
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="address">
                    Address:
                    <span className="color-red">*</span>
                  </label>
                  <InputStyled
                    id="address"
                    type="text"
                    placeholder="Enter address"
                    value={residents.address}
                    onChange={(e) => {
                      setResidents({ ...residents, address: e.target.value })
                      setError({ ...errors, address: '' })
                    }}
                  />
                  {errors.address && <p className="m-0 message_form">{errors.address}</p>}
                </div>
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="residentType">Resident Type:</label>
                  <SelectStyled
                    id="residentType"
                    value={residents.residentType}
                    onChange={(e) => {
                      setResidents({ ...residents, residentType: Number(e.target.value) })
                    }}
                    title="Apartment type"
                  >
                    <option value={0}>Resident type</option>
                    {masterDatas.residentTypes.map((type: { id: number; name: string }) => {
                      return (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      )
                    })}
                  </SelectStyled>
                  {errors.residentType && <p className="m-0 message_form">{errors.residentType}</p>}
                </div>
              </div>
              <div className="col-4">
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="nation">Nation:</label>
                  <Select
                    placeholder="Select a nation"
                    value={residents.nationId.value ? residents.nationId : 0}
                    options={masterDatas.nations}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onChange={(e: any) => {
                      setResidents({ ...residents, nationId: e })
                      setError({ ...errors, nationId: '' })
                    }}
                    id="nation"
                  />
                  {errors.nationId && <p className="m-0 message_form">{errors.nationId}</p>}
                </div>
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="provinceId">Province:</label>
                  <Select
                    placeholder="Select a province"
                    value={residents.provinceId.value ? residents.provinceId : 0}
                    options={masterDatas.provinces}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onChange={(e: any) => {
                      setResidents({ ...residents, provinceId: e })
                      setError({ ...errors, provinceId: '' })
                    }}
                    id="provinceId"
                  />
                  {errors.provinceId && <p className="m-0 message_form">{errors.provinceId}</p>}
                </div>
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="districtId">District:</label>
                  <Select
                    placeholder="Select a province"
                    value={residents.districtId.value ? residents.districtId : 0}
                    options={masterDatas.districts}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onChange={(e: any) => {
                      setResidents({ ...residents, districtId: e })
                      setError({ ...errors, districtId: '' })
                    }}
                    id="districtId"
                  />
                  {errors.districtId && <p className="m-0 message_form">{errors.districtId}</p>}
                </div>
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="wardId">WardI:</label>
                  <Select
                    placeholder="Select a ward"
                    value={residents.wardId.value ? residents.wardId : 0}
                    options={masterDatas.wards}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onChange={(e: any) => {
                      setResidents({ ...residents, wardId: e })
                      setError({ ...errors, wardId: '' })
                    }}
                    id="wardId"
                  />
                  {errors.wardId && <p className="m-0 message_form">{errors.wardId}</p>}
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

export default CreateResident
