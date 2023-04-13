import { FC, useState, useEffect } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { getResident } from '../../apis/Service'
import { useNavigate } from 'react-router-dom'
const ResidentStyled = styled.div`
  .apartment-flex {
    display: flex;
    justify-content: space-between;
    padding: 15px 10px;
    align-items: center;
    &-item {
      form {
        margin: 0 10px;
        border: 1px solid #ccc;
        border-radius: 40px;
        position: relative;
        input {
          border: none;
          padding: 10px 15px;
          border-radius: 40px;
          &:focus-within {
            outline: 1px solid #6666;
          }
        }
        button {
          border: none;
          position: absolute;
          top: 0;
          right: 0;
          height: 100%;
          cursor: pointer;
          padding: 0px 15px 0px 10px;
          box-sizing: none;
          border-radius: 0 40px 40px 0;
          &:hover {
            background: #ccc;
          }
        }
      }
      .btn-create {
        border: none;
        padding: 10px 15px;
        border-radius: 40px;
        color: white;
        background: rgb(23, 53, 139);
        cursor: pointer;
        &:hover {
          background: rgb(19 32 68);
        }
      }
    }
  }
  .apartment-content {
    background: #fff;
    min-height: 500px;
    table {
      width: 100%;
      border-collapse: collapse;
      .td-action {
        display: flex;
        justify-content: space-around;
        svg {
          display: block;
          width: 17px;
          height: 17px;
          border-radius: 50%;
          padding: 5px;
          cursor: pointer;
        }
        & svg:nth-child(1) {
          color: blue;
          border: 1px solid blue;
          background: rgb(241 234 234);
        }
        & svg:nth-child(2) {
          color: #dd3939;
          border: 1px solid #dd3939;
          background: rgb(241 234 234);
        }
        & svg:nth-child(3) {
          color: blue;
          border: 1px solid blue;
          background: rgb(241 234 234);
        }
      }
    }
    table,
    th,
    td {
      border: 1px solid #ccc;
      padding: 5px 10px;
    }
  }
`
const Resident: FC = () => {
  const [residents, setResidents] = useState([])
  const Navigate = useNavigate()
  useEffect(() => {
    getResident(setResidents)
  }, [])
  return (
    <ResidentStyled>
      <div className="apartment-flex">
        <div className="apartment-flex-item">
          <h4>Resident list / Create new Resident</h4>
        </div>
        <div className="apartment-flex-item apartment-flex">
          <form>
            <input type="text" placeholder="Enter search..." />
            <button title="search" className="btn-search">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>
          <button onClick={() => Navigate('/create_persons')} className="btn-create">
            Create new Resident
          </button>
        </div>
      </div>
      <div className="apartment-content">
        <table>
          <tbody>
            <tr>
              <th>Id</th>
              <th>Resident name</th>
              <th>Email</th>
              <th>Phone number</th>
              <th>ID card</th>
              <th>Gender</th>
              <th>Date of birth</th>
              <th>job</th>
              <th colSpan={2}>Action</th>
            </tr>
            {residents.map((resident) => {
              return (
                <tr key={resident.id}>
                  <td>#{resident.id}</td>
                  <td>{resident.fullName}</td>
                  <td>{resident.email}</td>
                  <td>{resident.phone}</td>
                  <td>{resident.cin}</td>
                  <td>{resident.gender ? 'male' : 'female'}</td>
                  <td>{resident.dob}</td>
                  <td>{resident.carrer}</td>
                  <td className="td-action">
                    <FontAwesomeIcon icon={faEdit} />
                    <FontAwesomeIcon icon={faTrash} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </ResidentStyled>
  )
}

export default Resident
