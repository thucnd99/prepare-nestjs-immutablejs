import { Action, AnyAction, applyMiddleware } from 'redux'
import { legacy_createStore as createStore, Store} from 'redux'
import thunk from "redux-thunk"
import reducers from "./reducer";
import { composeWithDevTools } from '@redux-devtools/extension';
import { ThunkAction, ThunkDispatch } from 'redux-thunk'

export const store: Store<RootState, Action> & {
    dispatch: ThunkDispatch<RootState, unknown, AnyAction>
  } = createStore(
    reducers,
    composeWithDevTools(
      applyMiddleware(thunk))
)
export type RootState = ReturnType<typeof reducers>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = (Promise<void> | void)> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
// AppThunk<Promise<SomeReturnType>>
