import Apartment from '../components/apartment/Apartment'
import Ssevice from '../components/service/Service'
import Contract from '../components/contract/Contract'
import FormCreatePersons from '../components/forms/persons/FormCreatePersons'
import Persons from '../components/persons/Personts'
import FormContracts from '../components/forms/contract/FormContracts'
import ApartmentDetail from '../components/apartment/ApartmentDetail'
import FormCreateNewBill from '../components/forms/service/FormCreateNewBill'
import DetailPersons from '../components/persons/DetailPersons'
import LoginForm from '../components/forms/login/Login'
import SearchApartments from '../components/apartment/SearchApartments'
import ContractDetail from '../components/contract/ContractDetail'
import ServicePrice from '../components/service/ServicePrice'
const PublicRouters = [
  { path: '/', component: Apartment },
  { path: '/service', component: Ssevice },
  { path: '/contract', component: Contract },
  { path: '/resident', component: Persons },
  { path: '/create_persons', component: FormCreatePersons, layout: null },
  { path: '/edit_person/:id', component: FormCreatePersons, layout: null },
  { path: '/create_contract', component: FormContracts, layout: null },
  { path: '/apartment_detail/:id', component: ApartmentDetail },
  { path: '/create_new_bill', component: FormCreateNewBill, layout: null },
  { path: '/person_detail/:name', component: DetailPersons },
  { path: '/login', component: LoginForm, layout: null },
  { path: '/apartments/search_by_name/:name', component: SearchApartments },
  { path: '/detail-contrac/:id', component: ContractDetail },
  { path: '*', component: LoginForm, layout: null },
  { path: '/service_unit_price', component: ServicePrice }
]
export default PublicRouters
