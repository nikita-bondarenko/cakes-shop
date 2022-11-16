import {useDispatch} from 'react-redux'
import {bindActionCreators} from '@reduxjs/toolkit'
import {productActions} from "../store/product/product.slice";
import {uiActions} from "../store/ui/ui.slice";
import {propsActions} from "../store/props/props.slice";
import {userActions} from "../store/user/user.slice";
import {authActions} from "../store/auth/auth.slice";

const actions = {
  ...productActions,
  ...uiActions,
  ...propsActions,
  ...userActions,
  ...authActions,
}

export const useActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(actions, dispatch)
}