import { FC, useState, useEffect, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import ModalConfirm from '../alertMessage/ModalConfirm'
import FormCreateBuilding from '../form/FormCreateBuilding'
import baseAxios from '../../apis/ConfigAxios'
import { TonggleInput, PagingBar, HeadingPage, NodataMatching } from '../../common/CommonComponent'
import Loading from '../others/Loading'
import { InputStyled } from '../../assets/styles/Input'
import { useDispatch } from 'react-redux'
import { showToast } from '../toasts/ToastActions'
import { useNavigate } from 'react-router-dom'
interface buildingFace {
  id: number | string
  acreage: string
  actflg: string
  address: string
  buildingCode: string
  buildingName: string
  createdAt: string
  height: string
  note: string
  numberOfFloors: string | number
  numberOfApartments: string | number
  orderNo: string | number
}
interface BuildingsFace {
  item?: [buildingFace]
  message?: string | null
  totalRecords?: number | string
  errorCode?: string | number
  success?: boolean
}
const Buildings: FC = () => {
  const dispatch = useDispatch()
  const Navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [id, setId] = useState('')
  const [buildings, setBuildings] = useState<BuildingsFace>({})
  const [showModalConfirm, setShowModalConfirm] = useState(false)
  const [params, setParams] = useState({
    pageSize: 10,
    pageNum: 1,
    searchInput: ''
  })
  const showToasts = (message: string, color: string) => {
    dispatch(
      showToast({
        message: message,
        color: color
      })
    )
  }
  const handleEditBuilding = (id: string) => {
    setId(id)
    setShowForm(true)
  }
  const getBuildings = useCallback(async () => {
    const res = await baseAxios.get('/buildings/list', {
      params: {
        pageSize: params.pageSize,
        pageNum: params.pageNum,
        searchInput: params.searchInput
      }
    })
    setBuildings(res.data)
  }, [params.pageSize, params.pageNum, params.searchInput])
  useEffect(() => {
    setTimeout(() => {
      getBuildings()
      setLoading(false)
    }, 500)
  }, [getBuildings])
  const setPageNum = (index: number) => {
    setParams({ ...params, pageNum: index })
  }
  const deleteBuilding = async () => {
    try {
      const res = await baseAxios.delete(`/buildings/${id}`)
      if (res.data.errorCode == 0) {
        showToasts('Delete success', 'green')
        getBuildings()
      } else if (res.data.errorCode == 401) {
        Navigate('/login')
      } else {
        showToasts(res.data.message, 'green')
      }
      setId('')
    } catch (error) {
      showToasts(error as string, 'red')
    }
  }
  if (loading) return <Loading />
  return (
    <>
      {showModalConfirm && (
        <ModalConfirm
          text="Do you want to delete building?"
          setId={setId}
          showForm={showModalConfirm}
          setShowForm={setShowModalConfirm}
          action={deleteBuilding}
        />
      )}
      {showForm && <FormCreateBuilding setId={setId} setShow={setShowForm} show={showForm} id={id} getBuildings={getBuildings} />}
      <div className="shadow rounded-4 color-table">
        <HeadingPage setShowForm={setShowForm} heading="Building List" />
        <div className="d-flex mb-4 px-4 justify-content-between align-items-center">
          <div>
            Show
            <select
              onChange={(e) => {
                setParams({ ...params, pageSize: Number(e.target.value) })
              }}
              value={params.pageSize}
              className="select-show-item-page mx-1"
              title="show total item"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            entries
          </div>
          <form>
            <label className="me-1" htmlFor="search">
              Search
            </label>
            <InputStyled
              onChange={(e) => setParams({ ...params, searchInput: e.target.value })}
              className="d-inline-block w-auto"
              id="search"
              type="text"
              placeholder="enter search"
            />
          </form>
        </div>
        <div className="table-scroll-y px-4">
          <table id="dtDynamicVerticalScrollExample" className="table color-table table-bordered table-sm">
            <thead>
              <tr>
                <th className="text-center">ID</th>
                <th>Building Code</th>
                <th>Building Name</th>
                <th>Acreage</th>
                <th>Height</th>
                <th>Address</th>
                <th className="text-center">Number of Apartment</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            {buildings.totalRecords ? (
              <tbody>
                {buildings.item?.map((data) => {
                  return (
                    <tr key={data.id}>
                      <td className="text-center">{data.orderNo}</td>
                      <td>{data.buildingCode}</td>
                      <td>{data.buildingName}</td>
                      <td>{data.acreage}</td>
                      <td>{data.height}</td>
                      <td>{data.address}</td>
                      <td className="text-center">{data.numberOfApartments}</td>
                      <td className="d-flex justify-content-around td-action">
                        <FontAwesomeIcon
                          onClick={() => {
                            setShowModalConfirm(true)
                            setId(data.id.toString())
                          }}
                          className="btn-delete"
                          icon={faTrash}
                        />
                        <FontAwesomeIcon onClick={() => handleEditBuilding(data.id.toString())} className="btn-edit" icon={faEdit} />
                        <TonggleInput actflg={data.actflg} />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            ) : (
              <NodataMatching count={8} />
            )}
          </table>
          {!!buildings.totalRecords && (
            <div className="d-flex justify-content-between table-bottom">
              <div>
                {`Showing
            ${params.pageNum}
            to
            ${params.pageSize}
            of
            ${buildings.totalRecords}
            entries`}
              </div>
              <PagingBar currentPage={params.pageNum} totalPages={Math.ceil(Number(buildings.totalRecords) / params.pageSize)} onPageChange={setPageNum} />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Buildings
