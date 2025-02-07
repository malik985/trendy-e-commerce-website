import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { store } from '../store';

export default function AdminRoute({ children }) {
  const { state } = useContext(store);
  const { userInfo } = state;
  return userInfo && userInfo.isAdmin ? children : <Navigate to="/signin" />;
}