import Login from '../components/form/Login'
import Home from '../components/home/Home'
import Table from '../components/table/Table'
import FormCreateBuilding from '../components/form/FormCreateBuilding'
import FormCreateApartment from '../components/form/FormCreateApartment'
import Apartments from '../components/apartments/Apartments'
import Buildings from '../components/buildings/Buildings'

const PublicRouters = [
  { path: '/', component: Home },
  { path: '/login', component: Login, layout: null },
  { path: '/table', component: Table },
  { path: '/create_building', component: FormCreateBuilding, layout: null },
  { path: '/create_apartment', component: FormCreateApartment, layout: null },
  { path: '/apartments', component: Apartments },
  { path: '/buildings', component: Buildings }
]

export default PublicRouters
