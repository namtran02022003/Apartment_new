import { FC, useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import avt from '../../assets/images/avt.svg'
import baseAxios from '../../apis/ConfigAxios'
import { useNavigate } from 'react-router-dom'

const HeaderStyled = styled.header`
  width: 100%;
  .header-content {
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 4.375rem;
    &-item {
      img {
        width: 2rem;
        height: 2rem;
        margin-left: 10px;
      }
      &-border {
        width: 1px;
        background: #ccc;
        height: 2.5rem;
      }
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        display: flex;
        align-items: center;
        margin: 0 20px;
        cursor: pointer;
        position: relative;
        color: #858796;
        font-size: 1.1rem;
        opacity: 0.6;
        &:hover {
          opacity: 1;
        }
        b {
          font-size: 0.8rem;
        }
        p {
          position: absolute;
          color: #fff;
          top: -30%;
          border-radius: 4px;
          right: -50%;
          background: #e74a3b;
          padding: 1px 5px;
          font-size: 0.6rem;
        }
      }
    }
  }
  #menu-user {
    background: rgb(255, 255, 255);
    width: 100%;
    z-index: 1000;
    top: 160%;
    border-radius: 4px;
    padding: 10px;
  }
`

const Header: FC = () => {
  const [showPopup, setShowPopup] = useState(false)
  const Navigate = useNavigate()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dataLocal = localStorage.getItem('user') || '{"tokenKey":"","fullName":""}'
  const data = JSON.parse(dataLocal)
  const handleLogOut = async () => {
    try {
      await baseAxios.get('/users/logout')
      localStorage.removeItem('user')
      Navigate('/login')
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <HeaderStyled>
      <div className="header-content shadow">
        <div></div>
        <div className="header-content-item">
          <span>
            <FontAwesomeIcon icon={faBell} />
            <p>1</p>
          </span>
          <span>
            <FontAwesomeIcon icon={faEnvelope} />
            <p>1</p>
          </span>
          <div className="header-content-item-border"></div>
          <div className=" position-relative header-content-item">
            <span
              role="button"
              onKeyPress={() => {
                console.log('h')
              }}
              tabIndex={0}
              className="position-relative"
              onClick={() => {
                setShowPopup(!showPopup) // Khi click vào thẻ span, gọi hàm setShowPopup với giá trị ngược lại của biến showPopup
              }}
            >
              <b>{data.fullName}</b>
              <img src={avt} alt="avt" />
            </span>
            {showPopup && ( // Sử dụng điều kiện showPopup để kiểm tra xem có hiển thị div hay không
              <div id="menu-user" className="position-absolute shadow">
                <button onClick={() => handleLogOut()} className="btn btn-info w-100">
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </HeaderStyled>
  )
}

export default Header
