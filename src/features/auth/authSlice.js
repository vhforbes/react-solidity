import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
  value: false,
}

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     haveMetamask: (state) => {
//       state.value += 1;
//     },
//   },
// })

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    hasMetamask: (state) => {
      state.value = true
    },
  },
})

export const { hasMetamask } = authSlice.actions
export default authSlice.reducer