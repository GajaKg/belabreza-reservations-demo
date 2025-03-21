import { configureStore } from '@reduxjs/toolkit'
import schedulerReducer from '../features/scheduler/store/schedulerSlice'
import hotelsReducer from '../features/hotels/store/hotelsSlice'
import customersReducer from '../features/customers/store/customersSlice'
export const store = configureStore({
  reducer: {
    scheduler: schedulerReducer,
    hotels: hotelsReducer,
    customers: customersReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch