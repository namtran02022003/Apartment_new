import Home from '../components/home/Home'
import ListUser from '../components/listUser/ListUser'
import FormCreateBuilding from '../components/form/FormCreateBuilding'
import FormCreateApartment from '../components/form/FormCreateApartment'
import Apartments from '../components/apartments/Apartments'
import Buildings from '../components/buildings/Buildings'
import FormTset from '../components/form/FormTest'

const PublicRouters = [
  { path: '/', component: Home },
  { path: '/list_user', component: ListUser },
  { path: '/create_building', component: FormCreateBuilding, layout: null },
  { path: '/create_apartment', component: FormCreateApartment, layout: null },
  { path: '/apartments', component: Apartments },
  { path: '/buildings', component: Buildings },
  { path: '/form', component: FormTset }
]

export default PublicRouters
