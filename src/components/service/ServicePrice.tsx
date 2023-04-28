import { FC, useEffect, useState } from 'react'
import baseAxios from '../../apis/ConfigAxios'
import styled from 'styled-components'

const ModalStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
  table,
  th,
  td {
    border: 1px solid #ccc;
    border-collapse: collapse;
    padding: 5px 10px;
  }
  .th-service-price {
    min-width: 200px;
  }
  input {
    display: block;
    border: none;
    width: 100%;
    padding: 5px 10px;
    &:focus-within {
      outline: none;
      boeder: none;
    }
  }
`
interface values {
  electric: {
    price: string
    id: string
    name: string
    unit: string
  }
  water: {
    price: string
    id: string
    name: string
    unit: string
  }
}
const ServicePrice: FC = () => {
  const [electric, setElectric] = useState(false) // false edit true save
  const [water, setWater] = useState(false)
  const [values, setValues] = useState<values>({
    electric: {
      id: '',
      name: '',
      price: '',
      unit: ''
    },
    water: {
      id: '',
      name: '',
      price: '',
      unit: ''
    }
  })
  const handleService = (service: string) => {
    if (service == 'electric') {
      if (electric) {
        if (!values.electric.price) {
          alert('err')
        } else {
          baseAxios.put(`/service-fee/${values.electric.id}`, values.electric)
          setElectric((pre) => !pre)
        }
      } else {
        setElectric((pre) => !pre)
      }
    }
    if (service == 'water') {
      if (water) {
        baseAxios.put(`service-fee/${values.water.id}`, values.water)
      }
      setWater((pre) => !pre)
    }
  }
  useEffect(() => {
    console.log('s')
    const getServicePrice = async () => {
      try {
        const res = await baseAxios.get(`/service-fee`)
        console.log(res.data)
        setValues({
          electric: {
            id: res.data[0].id,
            price: res.data[0].price,
            name: res.data[0].name,
            unit: res.data[0].unit
          },
          water: {
            id: res.data[1].id,
            price: res.data[1].price,
            name: res.data[1].name,
            unit: res.data[1].unit
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
    getServicePrice()
  }, [])
  console.log(values)
  return (
    <ModalStyled>
      <table>
        <tbody>
          <tr>
            <th>Services</th>
            <th className="th-service-price">Price</th>
            <th>Action</th>
          </tr>
          <tr>
            <td>Electric</td>
            <td>
              {electric ? (
                <input
                  value={values.electric.price}
                  onChange={(e) => setValues({ ...values, electric: { ...values.electric, price: e.target.value } })}
                  placeholder="Enter price electric"
                  type="number"
                />
              ) : (
                <p>{Number(values.electric.price).toLocaleString()} VND</p>
              )}
            </td>
            <td>
              <button onClick={() => handleService('electric')}>{electric ? 'save' : 'Edit'}</button>
            </td>
          </tr>
          <tr>
            <td>Water</td>
            <td>
              {water ? (
                <input
                  value={values.water.price}
                  onChange={(e) => setValues({ ...values, water: { ...values.water, price: e.target.value } })}
                  placeholder="Enter price water"
                  type="number"
                />
              ) : (
                <p>{Number(values.water.price).toLocaleString()} VND</p>
              )}
            </td>
            <td>
              <button onClick={() => handleService('water')}>{water ? 'Save' : 'Edit'}</button>
            </td>
          </tr>
        </tbody>
      </table>
    </ModalStyled>
  )
}
export default ServicePrice
