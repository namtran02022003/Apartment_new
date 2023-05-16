import { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faTachometerAlt, faCog, faWrench, faChartBar, faUser } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { SideBarStyled } from '../../assets/styles/SideBar'
const listMenu = [
  {
    item: [
      {
        icon: faCog,
        text: 'Setting',
        menu: [
          {
            menus: [
              { text: 'Service list', url: '/services' },
              { text: 'Nation list (developer)', url: '' },
              { text: 'Province list (developer)', url: '' },
              { text: 'District list (developer)', url: '' },
              { text: 'Ward list (developer)', url: '' }
            ]
          }
        ]
      },
      {
        icon: faWrench,
        text: 'Management',
        menu: [
          {
            menus: [
              { text: 'Buildings management', url: '/buildings' },
              { text: 'Apartments management', url: '/apartments' },
              { text: 'Residents management', url: '/residents' },
              { text: 'Contracts management', url: '/contracts' }
            ]
          }
        ]
      }
    ]
  },
  {
    item: [
      {
        icon: faChartBar,
        text: 'Service-management',
        menu: [
          {
            menus: [
              { text: 'Service management ', url: '/service-fee' },
              { text: 'Service Fee management ', url: '/service-management' }
            ]
          }
        ]
      },
      {
        icon: faUser,
        text: 'User-management',
        menu: [
          {
            menus: [{ text: 'User management ', url: '/users-list' }]
          }
        ]
      }
    ]
  }
]
const SideBar: FC = () => {
  const Navigate = useNavigate()
  const handleClick = (name: string | number) => {
    document.querySelector(`.menu-toggle${name}`)?.classList.toggle('toggle-display')
  }
  const h = () => {
    console.log('s')
  }
  return (
    <SideBarStyled>
      <div className="logo-home">
        <FontAwesomeIcon className="logo-home-icon" icon={faHome} />
        <span>Management</span>
      </div>
      <div role="button" onKeyPress={() => h()} tabIndex={0} onClick={() => Navigate('/')} className="div-icon bd-bottom text-white opacity-100">
        <FontAwesomeIcon icon={faTachometerAlt} />
        <span>Dashboard</span>
      </div>
      {listMenu.map((menu, index) => {
        return (
          <div className="menu-item" key={index}>
            {menu.item.map((item) => {
              return (
                <div key={item.text}>
                  <div role="button" onKeyPress={() => h()} tabIndex={0} onClick={() => handleClick(item.text)} key={item.text} className="div-icon">
                    <FontAwesomeIcon icon={item.icon} />
                    <span>{item.text}</span>
                  </div>
                  {item.menu ? (
                    <div className={`menu-toggle menu-toggle${item.text}`}>
                      {item.menu.map((mn, index) => {
                        return (
                          <div className="menu-toggle-content" key={index}>
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
