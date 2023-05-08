import { FC, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import FormCreate from '../form/FormCreate'
const dataFake = [
  { name: 'name1', position: 'position', office: 'office', age: 'age', start_date: '10-10-2023', salary: 'salary' },
  { name: 'name2', position: 'position', office: 'office', age: 'age', start_date: '10-10-2023', salary: 'salary' },
  { name: 'name3', position: 'position', office: 'office', age: 'age', start_date: '10-10-2023', salary: 'salary' },
  { name: 'name4', position: 'position', office: 'office', age: 'age', start_date: '10-10-2023', salary: 'salary' },
  { name: 'name5', position: 'position', office: 'office', age: 'age', start_date: '10-10-2023', salary: 'salary' },
  { name: 'name6', position: 'position', office: 'office', age: 'age', start_date: '10-10-2023', salary: 'salary' },
  { name: 'name7', position: 'position', office: 'office', age: 'age', start_date: '10-10-2023', salary: 'salary' },
  { name: 'name8', position: 'position', office: 'office', age: 'age', start_date: '10-10-2023', salary: 'salary' },
  { name: 'name9', position: 'position', office: 'office', age: 'age', start_date: '10-10-2023', salary: 'salary' },
  { name: 'name10', position: 'position', office: 'office', age: 'age', start_date: '10-10-2023', salary: 'salary' },
  { name: 'name11', position: 'position', office: 'office', age: 'age', start_date: '10-10-2023', salary: 'salary' },
  { name: 'name22', position: 'position', office: 'office', age: 'age', start_date: '10-10-2023', salary: 'salary' },
  { name: 'name33', position: 'position', office: 'office', age: 'age', start_date: '10-10-2023', salary: 'salary' },
  { name: 'name44', position: 'position', office: 'office', age: 'age', start_date: '10-10-2023', salary: 'salary' },
  { name: 'name55', position: 'position', office: 'office', age: 'age', start_date: '10-10-2023', salary: 'salary' },
  { name: 'name66', position: 'position', office: 'office', age: 'age', start_date: '10-10-2023', salary: 'salary' },
  { name: 'name77', position: 'position', office: 'office', age: 'age', start_date: '10-10-2023', salary: 'salary' },
  { name: 'name88', position: 'position', office: 'office', age: 'age', start_date: '10-10-2023', salary: 'salary' },
  { name: 'name98', position: 'position', office: 'office', age: 'age', start_date: '10-10-2023', salary: 'salary' }
]
const Table: FC = () => {
  const [showForm, setShowForm] = useState(false)
  return (
    <div className="shadow p-4">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h3>Table</h3>
        <button onClick={() => setShowForm(true)} className="btn btn-primary px-3 me-3">
          Create
        </button>
      </div>
      <table className="table table-bordered ">
        <tbody>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Office</th>
            <th>Age</th>
            <th>Start date</th>
            <th>Actions</th>
          </tr>
          {dataFake.map((data) => {
            return (
              <tr key={data.name}>
                <td>{data.name}</td>
                <td>{data.position}</td>
                <td>{data.office}</td>
                <td>{data.age}</td>
                <td>{data.start_date}</td>
                <td className="d-flex justify-content-around td-action">
                  <button title="delete" className=" btn-delete">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  <button title="edit" className="btn-edit">
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <input type="checkbox" checked data-toggle="toggle" data-onstyle="success" title="in" />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="d-flex justify-content-between">
        <div>Table</div>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href="/">
                Previous
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="/">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="/">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="/">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="/">
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
      {showForm && <FormCreate showForm={showForm} setShowForm={setShowForm} />}
    </div>
  )
}

export default Table
