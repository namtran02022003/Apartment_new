// eslint-disable-next-line @typescript-eslint/no-explicit-any
const showToast = (message: any) => {
  return {
    type: 'SHOW_TOAST',
    payload: message
  }
}

const hideToast = () => {
  return {
    type: 'HIDE_TOAST'
  }
}

export { showToast, hideToast }
