import { Dispatch, SetStateAction } from 'react'
interface userFace {
  username?: string
  password?: string
}

function ValidateLogin(user: userFace, setErrs: Dispatch<SetStateAction<object>>) {
  const err: userFace = {}
  if (user.username?.trim().length != 12) {
    err.username = 'Incorrect username'
  }
  if (user.password?.trim().length != 8) {
    err.password = 'Incorrect password'
  }
  setErrs(err)
  return err
}

export default ValidateLogin
