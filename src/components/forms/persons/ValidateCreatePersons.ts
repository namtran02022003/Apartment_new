const ValidatePersons = (values, setMessageErr) => {
  const errs = {}
  if (!values.fullName.trim()) {
    errs.fullName = 'Invalid fullname'
  } else if (values.fullName.trim().length < 8) {
    errs.fullName = 'Please enter at least 8 characters'
  } else if (values.fullName.trim().length > 30) {
    errs.fullName = 'Please enter no more than 30 characters'
  }
  if (values.email.trim().length > 30) {
    errs.email = 'Please enter no more than 30 characters'
  }
  if (!values.dob) {
    errs.dob = 'Invalid date of birth'
  }
  if (!values.apartmentId) {
    errs.apartmentId = 'Invalid apartmentId'
  }
  console.log(values.apartmentId)
  setMessageErr(errs)
  return errs
}

export default ValidatePersons
