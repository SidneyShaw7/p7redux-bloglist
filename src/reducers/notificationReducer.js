import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: { message: null },
  reducers: {
    showNotification(state, action) {
      console.log(state)

      state.message = action.payload
    },
    hideNotification(state, action) {
      state.message = null
    },
  },
})

export const setNotification = (message, time) => {
  return (dispatch) => {
    dispatch(showNotification(message))
    setTimeout(() => {
      dispatch(hideNotification())
    }, time * 1000)
  }
}

export const { showNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer

// import { createSlice } from '@reduxjs/toolkit'

// const notificationSlice = createSlice({
//   name: 'notifications',
//   initialState: { message: null },
//   reducers: {
//     showNotification(state, action) {
//       state.message = action.payload
//     },
//     hideNotification(state, action) {
//       state.message = null
//     },
//   },
// })

// export const setNotification = (text, time) => {
//   return (dispatch) => {
//     dispatch(showNotification(text))
//     setTimeout(() => {
//       dispatch(hideNotification())
//     }, time * 1000)
//   }
// }

// export const { showNotification, hideNotification } = notificationSlice.actions
// export default notificationSlice.reducer
