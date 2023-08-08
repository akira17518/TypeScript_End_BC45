import {configureStore} from '@reduxjs/toolkit'
import courseReducer from './reducers/courseReducer'
import userReducder from './reducers/userReducder'
import adminReducer from './reducers/adminReducer'

export const store = configureStore({
    reducer : {
       courseReducer :  courseReducer,
       userReducer : userReducder,
       adminReducer : adminReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type DispatchType = typeof store.dispatch
