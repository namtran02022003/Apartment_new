import Apartment from '../components/apartment/Apartment'
import Service from '../components/service/Service'
import Contract from '../components/contract/Contract'
import FormCreatePersons from '../components/forms/persons/FormCreatePersons'
import Persons from '../components/persons/Personts'
import FormContracts from '../components/forms/contract/FormContracts'
import ApartmentDetail from '../components/apartment/ApartmentDetail'
import FormCreateNewBill from '../components/forms/service/FormCreateNewBill'
import DetailPersons from '../components/persons/DetailPersons'
import SearchApartments from '../components/apartment/SearchApartments'
import ContractDetail from '../components/contract/ContractDetail'
import ServicePrice from '../components/service/ServicePrice'
import PageNotFound from '../components/pageNotFound/PageNotFound'
import SearchService from '../components/service/SearchService'
import ServiceDetail from '../components/service/ServiceDetail'
const PublicRouters = [
  { path: '/', component: Apartment },
  { path: '/service', component: Service },
  { path: '/contract', component: Contract },
  { path: '/resident', component: Persons },
  { path: '/create_persons', component: FormCreatePersons, layout: null },
  { path: '/edit_person/:id', component: FormCreatePersons, layout: null },
  { path: '/create_contract', component: FormContracts, layout: null },
  { path: '/apartment_detail/:id', component: ApartmentDetail },
  { path: '/create_new_bill', component: FormCreateNewBill, layout: null },
  { path: '/person_detail/:name', component: DetailPersons },
  { path: '/apartments/search_by_name/:name', component: SearchApartments },
  { path: '/detail-contrac/:id', component: ContractDetail },
  { path: '*', component: PageNotFound, layout: null },
  { path: '/service_unit_price', component: ServicePrice },
  { path: '/service_search/:startDate/:endDate/:textSearch', component: SearchService },
  { path: '/service_detail/:id', component: ServiceDetail }
]
export default PublicRouters
