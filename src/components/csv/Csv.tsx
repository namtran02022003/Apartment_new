import Papa from 'papaparse'

interface IData {
  No: number
  PeriodName: string
  ResidentName: string
  BuildingName: string
  ApartmentName: string
  ElectricityBill: number
  WaterBill: number
  MotobikeParkingFee: number
  CarParkingFee: number
  ServiceFee: number
  CleaningFee: number
}

const data: IData[] = [
  {
    No: 1,
    PeriodName: 'Tháng 1',
    ResidentName: 'Nguyen Van A',
    BuildingName: 'TTC',
    ApartmentName: 'Nhà 102',
    ElectricityBill: 300000,
    WaterBill: 375000,
    MotobikeParkingFee: 0,
    CarParkingFee: 0,
    ServiceFee: 1200000,
    CleaningFee: 0
  }
]

const saveToFile = (data: IData[]) => {
  // Tạo một đối tượng CSV từ mảng thông tin của bạn
  const csv = Papa.unparse(data)

  // Thêm font chữ vào định dạng CSV
  const csvWithFont = '\uFEFF' + csv

  // Tạo một đối tượng Blob từ đối tượng CSV, chỉ định mã hóa Unicode
  const blob = new Blob([csvWithFont], { type: 'text/csvcharset=utf-8' })

  // Tạo một đường dẫn URL cho tập tin CSV
  const url = URL.createObjectURL(blob)

  // Tạo một đối tượng a element để tải xuống tập tin CSV
  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', 'data.csv')
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  // Giải phóng đường dẫn URL
  URL.revokeObjectURL(url)
}

const App = () => {
  const handleSaveBtnClick = () => {
    saveToFile(data)
  }

  return (
    <div>
      <button onClick={handleSaveBtnClick}>Lưu thông tin vào file CSV</button>
    </div>
  )
}

export default App
