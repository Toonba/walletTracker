import { configureStore } from '@reduxjs/toolkit'

const initialState = {
  inputValue: '',
  data: [],
  selectRangeValue: 7,
  currentBalance: 0,
  balanceCurrency: 'crypto'
}

const SET_INPUT_WALUE = 'setInputValue'
const SET_DATA_VALUE = 'setDataValue'
const SET_SELECTED_RANGE_VALUE = 'setSelectRangeValue'
const SET_CURRENT_BALANCE = 'setCurrentBalance'
const SET_BALANCE_CURRENCY = 'setBalanceCurrency'

export const setInputValue = (value) => ({
  type: SET_INPUT_WALUE,
  payload: value
})

export const setDataValue = (value) => ({
  type: SET_DATA_VALUE,
  payload: value
})

export const setSelectRangeValue = (value) => ({
  type: SET_SELECTED_RANGE_VALUE,
  payload: value
})

export const setCurrentBalance = (value) => ({
  type: SET_CURRENT_BALANCE,
  payload: value
})

export const setBalanceCurrency = (value) => ({
  type: SET_BALANCE_CURRENCY,
  payload: value
})

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INPUT_WALUE:
      return { ...state, inputValue: action.payload }
    case SET_DATA_VALUE:
      return { ...state, data: action.payload }
    case SET_SELECTED_RANGE_VALUE:
      return { ...state, selectRangeValue: action.payload }
    case SET_CURRENT_BALANCE:
      return { ...state, currentBalance: action.payload }
    case SET_BALANCE_CURRENCY:
      return { ...state, balanceCurrency: action.payload }
    default:
      return state
  }
}

const store = configureStore({ reducer: reducer })

export default store
