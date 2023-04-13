interface errors {
  name: string
  area: string | number
  status: string | number
  description: string
}

function ValidationFormCreateApartment(values: object, setMessageErr: unknown) {
  const errs: errors = {}
  if (!values.name.trim()) {
    errs.name = 'Vui lòng nhập vào trường này!'
  } else if (values.name.trim().length < 8) {
    errs.name = 'Vui lòng nhập tối thiểu 8 ký tự!'
  } else if (values.name.trim().length > 30) {
    errs.name = 'Vui lòng nhập tối đa 30 ký tự!'
  }
  if (!values.area.toString().trim()) {
    errs.area = 'Vui lòng nhập vào trường này!'
  } else if (isNaN(values.area)) {
    errs.area = 'Vui lòng nhập  đúng Area!'
  }
  if (!values.description.trim()) {
    errs.description = 'Vui lòng nhập vào trường này!'
  } else if (values.description.trim().length < 8) {
    errs.description = 'Vui lòng nhập tối thiểu 8 ký tự!'
  } else if (values.description.trim().length > 50) {
    errs.description = 'Vui lòng nhập tối đa 50 ký tự!'
  }
  setMessageErr(errs)
  return errs
}
export default ValidationFormCreateApartment
