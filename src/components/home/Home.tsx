import { FC, useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faContactCard, faUser, faBuilding, faHome } from '@fortawesome/free-solid-svg-icons'
import MonthlyRevenueChart from '../recharts/Recharts'
import baseAxios from '../../apis/ConfigAxios'
import { useDispatch } from 'react-redux'
import { showToast } from '../toasts/ToastActions'
import { useNavigate } from 'react-router-dom'
const HomeStyled = styled.div`
  .menu-icon {
    color: #dddfeb
  }
  .text-top {
    font-size: 0.8rem
    font-weight: 600
  }
`

const DivBorderStyled = styled.div`
  border-left: ${(props) => props.color};
`

const SpanColorStyled = styled.span`
  color: ${(props) => props.color};
`

interface Synthetic {
  textTop: string
  color: string
  textBottom: number
  icon: IconDefinition
}

const Home: FC = () => {
  const [synthetic, setSynthetic] = useState<Synthetic[]>([])
  const Navigate = useNavigate()
  const dispatch = useDispatch()
  const showToasts = useCallback(
    (message: string, color: string) => {
      dispatch(
        showToast({
          message: message,
          color: color
        })
      )
    },
    [dispatch]
  )
  useEffect(() => {
    const dataLocal = localStorage.getItem('user') || '{"tokenKey":"","fullName":""}'
    const isLogin = localStorage.getItem('isLogin')
    if (isLogin) {
      const data = JSON.parse(dataLocal)
      showToasts(`Xin chào ${data.fullName}`, 'green')
      localStorage.removeItem('isLogin')
    }
  }, [showToasts])
  useEffect(() => {
    const getSynthetic = async () => {
      try {
        const res = await baseAxios.get('/summary/synthetic')
        const listMenu: Synthetic[] = [
          { icon: faUser, color: '#4e73df', textTop: 'Total Number Users', textBottom: res.data.item.totalNumberUsers },
          { icon: faBuilding, color: '#1cc88a', textTop: 'Total Number Buildings', textBottom: res.data.item.totaNumberBuildings },
          { icon: faHome, color: '#36b9cc', textTop: 'Total Number Apartment', textBottom: res.data.item.totalNumberApartments },
          { icon: faContactCard, color: '#f6c23e', textTop: 'Total Number Contracts', textBottom: res.data.item.totalNumberContracts }
        ]
        if (res.data.errorCode == 401) {
          Navigate('/login')
        } else if (res.data.errorCode == 0) {
          setSynthetic(listMenu)
        } else {
          showToasts(res.data.errorCode, 'red')
        }
      } catch (error) {
        showToasts(error as string, 'red')
      }
    }
    getSynthetic()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <HomeStyled>
      <h2>Dashboard</h2>
      <div className="row">
        {synthetic.map((menu: Synthetic, index: number) => {
          return (
            <div key={index} className="col-3">
              <DivBorderStyled className="row mt-4 py-4 px-2 rounded shadow m-0" color={`4px solid ${menu.color}`}>
                <div className="col-9">
                  <SpanColorStyled color={`${menu.color}`} className="text-top">
                    {menu.textTop}
                  </SpanColorStyled>
                  <p className="text-bottom fs-5 fw-bold opacity-75">{menu.textBottom}</p>
                </div>
                <div className="col-3 d-flex align-items-center">
                  <FontAwesomeIcon className="fs-2 menu-icon" icon={menu.icon} />
                </div>
              </DivBorderStyled>
            </div>
          )
        })}
      </div>
      <div className="mt-5">
        <MonthlyRevenueChart />
      </div>
    </HomeStyled>
  )
}

export default Home
