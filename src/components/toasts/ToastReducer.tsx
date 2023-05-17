const initialState = {
  message: '',
  visible: false,
  color: ''
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toastReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SHOW_TOAST':
      return {
        message: action.payload.message,
        visible: true,
        color: action.payload.color
      }
    case 'HIDE_TOAST':
      return {
        ...state,
        visible: false
      }
    default:
      return state
  }
}

export default toastReducer
