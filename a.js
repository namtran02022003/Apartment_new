const text = `"No","Period name","Resident name","Building name","Apartment name","Electricity bill","Water bill","Motobike parking fee","Car parking fee","Service fee","Cleaning fee",
1,Tháng 1,nguyen ngoc dong,Tòa nhà TTC,Phòng 101,0,0,0,0,0,0
2,Tháng 1,nguyen ngoc dong,Tòa nhà TTC,Phòng 101,0,0,0,0,0,0`

// Tách dòng trong văn bản
const lines = text.split('\n')

// Lấy tiêu đề cột
const headers = lines[0].split(',')

// Xóa dòng tiêu đề khỏi mảng lines
lines.shift()

// Tạo mảng các object từ dòng còn lại
const dataArray = lines.map((line) => {
  const values = line.split(',')
  const obj = {}
  headers.forEach((header, index) => {
    obj[header.trim()] = values[index].trim()
  })
  return obj
})

console.log(dataArray)
