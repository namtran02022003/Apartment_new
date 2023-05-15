import { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceLaughWink, faTachometerAlt, faCog, faWrench, faFolder, faChartBar, faTable } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { SideBarStyled } from '../../assets/styles/SideBar'
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
              { text: 'Users List', url: '/users-list' },
              { text: 'Apartments', url: '/apartments' },
              { text: 'Buildings', url: '/buildings' },
              { text: 'Services', url: '/services' },
              { text: 'Residents', url: '/residents' },
              { text: 'Contracts', url: '/contracts' },
              { text: 'Service Fee', url: '/service-fee' }
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
        <FontAwesomeIcon className="logo-home-icon" icon={faFaceLaughWink} />
        <span>
          Sb Admin
          <sub>2</sub>
        </span>
      </div>
      <div role="button" onKeyPress={() => h()} tabIndex={0} onClick={() => Navigate('/')} className="div-icon bd-bottom text-white opacity-100">
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
