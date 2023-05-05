import { FC, useState, useEffect } from 'react'
import ListViewService from './ListViewService'
import ApartmentStyled from '../../assets/styles/ApartmentStyled'
import Loading from '../loading/Loading'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import baseAxios from '../../apis/ConfigAxios'
import AlertMessage from '../alertMessage/AlertMessage'
import Select from 'react-select'
const FromSortDateStyled = styled.form`
  display: flex;
  align-items: center;
  border: none !important;
  .div-item-search {
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      margin: 0 10px;
    }
  }
  & input {
    border-radius: 4px;
    padding: 8px 10px;
  }
  & input[type='text'] {
    border-radius: 50px;
    margin: 0 10px;
    padding: 12px 10px !important;
  }
  button {
    margin: 0 10px;
  }
  .selec_search_service {
    input[type='text'] {
      padding: 0 50px !important;
    }
  }
`

const CustomInputStyled = styled.input`
  &::-webkit-file-upload-button {
    display: none;
  }
  &::before {
    content: 'Select some files';
    display: inline-block;
    background: -webkit-linear-gradient(top, #f9f9f9, #e3e3e3);
    border: 1px solid #999;
    border-radius: 3px;
    padding: 5px 8px;
    outline: none;
    white-space: nowrap;
    -webkit-user-select: none;
    cursor: pointer;
    text-shadow: 1px 1px #fff;
    font-weight: 700;
    font-size: 10pt;
  }
  &:hover::before {
    border-color: black;
  }
  &:active::before {
    background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
  }
`
interface PropsValueSearchFace {
  textSearch: { value: number } | string | null
  startDate: string
  endDate: string
}
const Service: FC = () => {
  const [services, setService] = useState([])
  const [loading, setLoading] = useState(true)
  const [file, setFile] = useState<File | null>(null)
  const [show, setShow] = useState(false)
  const [option, setOptions] = useState([])
  const [valueSearch, setValueSearch] = useState<PropsValueSearchFace>({
    textSearch: null,
    startDate: '',
    endDate: ''
  })
  const Navigate = useNavigate()

  useEffect(() => {
    const getService = async () => {
      try {
        const res = await baseAxios.get('/bills ')
        setService(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    setTimeout(() => {
      getService()
      setLoading(false)
    }, 500)
  }, [])
  const postFile = async () => {
    if (file) {
      console.log('ok')
      // kiểm tra xem file đã được chọn chưa
      const formData = new FormData()
      formData.append('file', file)
      formData.append('apartmentcode', 'ABC123') // thêm các thông tin khác vào form data
      formData.append('email', 'example@gmail.com')
      try {
        const res = await baseAxios.post('/bills/upload', formData) // gửi request POST đến server với form data
        console.log(res)
        setShow(true)
      } catch (error) {
        console.log(error)
      }
    }
  }
  const handleSubmit = async () => {
    console.log(valueSearch)
    if (!valueSearch.endDate.trim() || !valueSearch.startDate.trim() || !valueSearch.textSearch) {
      console.log('no')
    } else {
      const id = (valueSearch.textSearch as { value: number } | null)?.value
      Navigate(`/service_search/${valueSearch.startDate + '/' + valueSearch.endDate + '/' + id}`)
    }
  }
  useEffect(() => {
    const getDatasSearch = async () => {
      const res = await baseAxios.get('/apartments', {
        params: {
          pageSize: 100,
          pageNo: 1
        }
      })
      console.log(res.data)
      const newDatas = res.data.content.map((apartment: { apartmentCode: string | number; name: string }) => {
        return {
          value: apartment.apartmentCode,
          label: apartment.apartmentCode
        }
      })
      setOptions(newDatas)
    }
    getDatasSearch()
  }, [])
  return loading ? (
    <Loading />
  ) : (
    <>
      {show && <AlertMessage show={show} setShow={setShow} message="Import Success" />}
      <ApartmentStyled>
        <div className="apartment-flex">
          <div className="apartment-flex-item apartment-flex">
            <FromSortDateStyled>
              <div className="div-item-search">
                <span>From:</span>
                <input value={valueSearch.startDate} onChange={(e) => setValueSearch({ ...valueSearch, startDate: e.target.value })} type="date" title="from" />
              </div>
              <div className="div-item-search">
                <span>To:</span>
                <input value={valueSearch.endDate} onChange={(e) => setValueSearch({ ...valueSearch, endDate: e.target.value })} type="date" title="to" />
              </div>
              <div className="">
                <Select
                  className="selec_search_service"
                  value={valueSearch.textSearch}
                  options={option}
                  onChange={(option) => {
                    setValueSearch({ ...valueSearch, textSearch: option })
                  }}
                />
              </div>
              <button type="button" onClick={() => handleSubmit()} className="btn-create">
                Enter search
              </button>
            </FromSortDateStyled>
          </div>
          <div className="apartment-flex-item apartment-flex">
            <button onClick={() => postFile()} className="btn-create">
              import excell
            </button>
            <CustomInputStyled
              onChange={(e) => setFile(e.target.files?.[0] || null)} // lưu trữ file được chọn vào state
              type="file"
              title="file"
            />
            <button onClick={() => Navigate(`/service_unit_price`)} className="btn-create">
              Service unit price
            </button>
          </div>
        </div>
        <ListViewService services={services} />
      </ApartmentStyled>
    </>
  )
}

export default Service
