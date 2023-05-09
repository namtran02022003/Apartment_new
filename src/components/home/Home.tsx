import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faDollar, faClipboardList, faComments } from '@fortawesome/free-solid-svg-icons'
import AlertMessage from '../alertMessage/AlertMessage'
const HomeStyled = styled.div`
  .menu-icon {
    color: #dddfeb;
  }
  .text-top {
    font-size: 0.8rem;
    font-weight: 600;
  }
`
const DivBorderStyled = styled.div`
  border-left: ${(props) => props.color};
`
const SpanColorStyled = styled.span`
  color: ${(props) => props.color};
`
const listMenu = [
  { icon: faCalendar, color: '#4e73df', textTop: 'EARNINGS (MONTHLY)', textBottom: '$40,000' },
  { icon: faDollar, color: '#1cc88a', textTop: 'EARNINGS (ANNUAL)', textBottom: '$215,000' },
  { icon: faClipboardList, color: '#36b9cc', textTop: 'TASKS', textBottom: '50%' },
  { icon: faComments, color: '#f6c23e', textTop: 'PENDING REQUESTS', textBottom: '18' }
]
const Home: FC = () => {
  const [message, setMessage] = useState('')
  const [show, setShow] = useState(false)
  useEffect(() => {
    const dataLocal = localStorage.getItem('user') || '{"tokenKey":"","fullName":""}'
    console.log(dataLocal)
    const data = JSON.parse(dataLocal)
    setMessage(data.fullName)
    setShow(true)
  }, [])
  return (
    <HomeStyled>
      {message && <AlertMessage show={show} setShow={setShow} message={`Xin chào ${message}`} color="green" />}
      <h2>Dashboard</h2>
      <div className="row">
        {listMenu.map((menu, index) => {
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
    </HomeStyled>
  )
}

export default Home
