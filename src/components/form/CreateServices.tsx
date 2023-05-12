import { FC, useState, useEffect } from 'react'
import { InputStyled } from '../../assets/styles/Input'
import AlertMessage from '../alertMessage/AlertMessage'
import { Forms } from '../../assets/styles/Forms'
import { ValidateServices } from './Validates'
import baseAxios from '../../apis/ConfigAxios'

interface SignUpProps {
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  setShowMes: React.Dispatch<React.SetStateAction<boolean>>
  setId: React.Dispatch<React.SetStateAction<string>>
  setMess: React.Dispatch<React.SetStateAction<string>>
  show: boolean
  id?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getServices: any
}
const CreateServices: FC<SignUpProps> = ({ show, setShow, id, getServices, setId, setMess, setShowMes }) => {
  console.log(id)
  const [showMessage, setShowMessage] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [errors, setError] = useState<any>({})
  const [services, setServices] = useState({
    servicesCode: '',
    servicesName: '',
    servicesPrice: 0,
    note: '',
    id: 0
  })

  const onSubmit = async () => {
    if (!(Object.keys(ValidateServices(services, setError)).length > 0)) {
      try {
        await baseAxios.post('/services/insert-update', services)
        getServices()
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
    const getService = async () => {
      const res = await baseAxios.get(`/services/${id}`)
      setServices(res.data.item)
    }
    if (id) {
      getService()
    }
  }, [id])
  return (
    <Forms className="bg-form">
      {showMessage && <AlertMessage color={'green'} message="ok" show={showMessage} setShow={setShowMessage} />}
      <div className="w-75 animate bg-white rounded-3 form-content">
        <h5 className="title_page px-3 rounded-3 py-2 bg-heading-table pt-2">{id ? 'Edit' : 'Create new'} Apartment</h5>
        <div>
          <form className="p-3 login">
            <div className="row">
              <div className="col-6">
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="serviceCode">
                    Service Code:
                    <span className="color-red">*</span>
                  </label>
                  <InputStyled
                    id="serviceCode"
                    type="text"
                    placeholder="Enter service code"
                    value={services.servicesCode}
                    maxLength={50}
                    onChange={(e) => {
                      setServices({ ...services, servicesCode: e.target.value })
                      setError({ ...errors, servicesCode: '' })
                    }}
                  />
                  {errors.servicesCode && <p className="m-0 message_form">{errors.servicesCode}</p>}
                </div>
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="serviceName">
                    Service Name:
                    <span className="color-red">*</span>
                  </label>
                  <InputStyled
                    id="serviceName"
                    type="text"
                    placeholder="Enter service code"
                    value={services.servicesName}
                    maxLength={50}
                    onChange={(e) => {
                      setServices({ ...services, servicesName: e.target.value })
                      setError({ ...errors, servicesName: '' })
                    }}
                  />
                  {errors.servicesName && <p className="m-0 message_form">{errors.servicesName}</p>}
                </div>
              </div>
              <div className="col-6">
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="servicesPrice">
                    Service Price:
                    <span className="color-red">*</span>
                  </label>
                  <InputStyled
                    id="servicesPrice"
                    type="number"
                    placeholder="Enter service price"
                    value={services.servicesPrice}
                    maxLength={50}
                    min={0}
                    onChange={(e) => {
                      setServices({ ...services, servicesPrice: Number(e.target.value) })
                      setError({ ...errors, servicesPrice: '' })
                    }}
                  />
                  {errors.servicesPrice && <p className="m-0 message_form">{errors.servicesPrice}</p>}
                </div>
                <div className="my-2 position-relative pb-1">
                  <label htmlFor="note"> Note: </label>
                  <InputStyled
                    id="note"
                    type="text"
                    placeholder="Enter service price"
                    value={services.note}
                    maxLength={250}
                    onChange={(e) => {
                      setServices({ ...services, note: e.target.value })
                      setError({ ...errors, note: '' })
                    }}
                  />
                  {errors.note && <p className="m-0 message_form">{errors.note}</p>}
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

export default CreateServices
