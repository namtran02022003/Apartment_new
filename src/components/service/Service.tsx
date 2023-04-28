import { FC, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEye } from '@fortawesome/free-solid-svg-icons';
import ApartmentStyled from '../../assets/styles/ApartmentStyled';
import Loading from '../loading/Loading';
import Servicejson from './Servicejson';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import baseAxios from '../../apis/ConfigAxios';

interface ListServiceInterFace {
  billNum: string | number;
  apartmentNum: string | number;
  totalAmountUnpaid: string;
  status: string;
  id: number;
}

const FromSortDateStyled = styled.form`
  display: flex;
  border: none !important;
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      margin: 0 10px;
    }
  }
  & div input {
    border-radius: 4px !important;
  }
  button {
    margin: 0 10px;
  }
`;

const Service: FC = () => {
  const [services, setService] = useState([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null); // sử dụng kiểu dữ liệu File để lưu trữ file được chọn
  const Navigate = useNavigate();

  useEffect(() => {
    const getService = async () => {
      const res = await baseAxios.get('/service-fee');
      console.log(res.data);
      setService(Servicejson);
    };
    getService();
    setLoading(false);
  }, []);

  const postFile = async () => {
    if (file) { // kiểm tra xem file đã được chọn chưa
      const formData = new FormData();
      formData.append('file', file);
      formData.append('apartmentcode', 'ABC123'); // thêm các thông tin khác vào form data
      formData.append('email', 'example@gmail.com');
      try {
        const res = await baseAxios.post('/bills/upload', formData); // gửi request POST đến server với form data
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  };

  console.log(file);

  return loading ? (
    <Loading />
  ) : (
    <>
      <ApartmentStyled>
        <div className="apartment-flex">
          <div className="apartment-flex-item">
            <FromSortDateStyled>
              <div>
                <span>From:</span>
                <input type="date" title="from" />
              </div>
              <div>
                <span>To:</span>
                <input type="date" title="to" />
              </div>
              <button className="btn-create">Enter search</button>
            </FromSortDateStyled>
          </div>
          <div className="apartment-flex-item apartment-flex">
            <form>
              <input type="text" placeholder="Enter search..." />
              <button title="search" type="button" className="btn-search">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </form>
            <button onClick={() => postFile()} className="btn-create">
              import excell
            </button>
            <input
              onChange={(e) => setFile(e.target.files?.[0])} // lưu trữ file được chọn vào state
              type="file"
              title="file"
            />
            <button onClick={() => Navigate(`/service_unit_price`)} className="btn-create">
              Service unit price
            </button>
            <button onClick={() => Navigate('/create_new_bill')} className="btn-create">
              Create new bill
            </button>
          </div>
        </div>
        <div className="apartment-content">
          <table>
            <tbody>
              <tr>
                <th>bill num</th>
                <th>Apartment num</th>
                <th>Total amound Unpaid</th>
                <th>Status</th>
                <th>View detail</th>
              </tr>
              {services.map((service: ListServiceInterFace) => {
                return (
                  <tr key={service.id}>
                    <td>#{service.billNum}</td>
                    <td>{service.apartmentNum}</td>
                    <td>{Number(service.totalAmountUnpaid).toLocaleString()} VND</td>
                    <td>{service.status}</td>
                    <td className="td-action">
                      <button title="view detail">
                        <FontAwesomeIcon className="icon-eye" icon={faEye} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </ApartmentStyled>
    </>
  );
};

export default Service;