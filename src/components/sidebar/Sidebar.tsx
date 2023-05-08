import { FC } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceLaughWink, faTachometerAlt, faCog, faWrench, faFolder, faChartBar, faTable } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
const SideBarStyled = styled.div`
  color: #fff;
  height: 100vh;
  width: 14rem;
  background-color: rgb(78, 115, 223);
  padding: 20px 15px;
  .logo-home {
    display: flex;
    cursor: pointer;
    justify-content: space-around;
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
    align-items: center;
    padding-bottom: 20px;
    &-icon {
      font-size: 2rem;
      transform: rotate(-15deg);
    }
    span {
      font-weight: 600;
      letter-spacing: 1px;
    }
  }
  .div-icon {
    opacity: 0.8;
    padding: 20px 0;
    cursor: pointer;
    position: relative;
    &:hover,
    &:hover svg {
      opacity: 1;
    }
    svg {
      margin-right: 10px;
      opacity: 0.6;
    }
  }
  .menu-item {
    font-size: 0.8rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
    padding: 10px 0;
    p {
      font-size: 0.6rem;
      font-weight: 600;
      opacity: 0.6;
    }
    .menu-toggle {
      animation: slideDown 0.3s ease-out forwards;
      transform-origin: top;
      display: none;
      background: #fff;
      padding: 10px 20px;
      border-radius: 5px;
      &-content {
        p {
          color: #ccc;
          padding: 0 5px;
        }
        a {
          display: block;
          width: 100%;
          cursor: pointer;
          padding: 10px 5px;
          border-radius: 4px;
          color: #333;
          &:hover {
            background: #ccc;
          }
        }
      }
    }
    .toggle-display {
      display: block;
    }
  }
  @keyframes slideDown {
    from {
      transform: scaleY(0);
    }
    to {
      transform: scaleY(1);
    }
  }
`
const listMenu = [
  {
    heading: 'INTERFACE',
    item: [
      {
        icon: faCog,
        text: 'Component',
        menu: [
          {
            heading: 'CUSTOM COMPONENT',
            menus: [
              { text: 'Buttona', url: '' },
              { text: 'Cards', url: '' }
            ]
          }
        ]
      },
      {
        icon: faWrench,
        text: 'Utilities',
        menu: [
          {
            heading: 'CUSTOM Utilities',
            menus: [
              { text: 'Colors', url: '' },
              { text: 'Borders', url: '' },
              { text: 'Annimations', url: '' },
              { text: 'Other', url: '' }
            ]
          }
        ]
      }
    ]
  },
  {
    heading: 'ADDONS',
    item: [
      {
        icon: faFolder,
        text: 'Pages',
        menu: [
          {
            heading: 'LOGIN SCREENS',
            menus: [
              { text: 'Login', url: '/login' },
              { text: 'Rigester', url: '' },
              { text: 'Forgot password', url: '' },
              { text: '404 page', url: '' },
              { text: 'Blank page', url: '' }
            ]
          }
        ]
      },
      { icon: faChartBar, text: 'Charts' },
      { icon: faTable, text: 'Table' }
    ]
  }
]
const SideBar: FC = () => {
  const handleClick = (name: string | number) => {
    document.querySelector(`.menu-toggle${name}`)?.classList.toggle('toggle-display')
  }
  const h = () => {
    console.log('s')
  }
  return (
    <SideBarStyled>
      <div className="logo-home">
        <FontAwesomeIcon className="logo-home-icon" icon={faFaceLaughWink} />
        <span>
          SB ADMIN
          <sub>2</sub>
        </span>
      </div>
      <div className="div-icon">
        <FontAwesomeIcon icon={faTachometerAlt} />
        <span>Dashboard</span>
      </div>
      {listMenu.map((menu) => {
        return (
          <div className="menu-item" key={menu.heading}>
            <p>{menu.heading}</p>
            {menu.item.map((item) => {
              return (
                <div key={item.text}>
                  <div role="button" onKeyPress={() => h()} tabIndex={0} onClick={() => handleClick(item.text)} key={item.text} className="div-icon">
                    <FontAwesomeIcon icon={item.icon} />
                    <span>{item.text}</span>
                  </div>
                  {item.menu ? (
                    <div className={`menu-toggle menu-toggle${item.text}`}>
                      {item.menu.map((mn) => {
                        return (
                          <div className="menu-toggle-content" key={mn.heading}>
                            <p>{mn.heading}</p>
                            {mn.menus.map((menu) => {
                              return (
                                <Link key={menu.text} to={menu.url}>
                                  {menu.text}
                                </Link>
                              )
                            })}
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              )
            })}
          </div>
        )
      })}
    </SideBarStyled>
  )
}

export default SideBar
