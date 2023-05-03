import { createBrowserRouter, createRoutesFromElements, Route, Navigate } from 'react-router-dom';
import Login from '../screens/login/Login';
import Main from '../screens/main/Main';
import Signup from '../screens/signup/Signup';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Navigate to="/vegetable" />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="vegetable" element={<Main category="vegetable" />} />
      <Route path="cheese" element={<Main category="cheese" />} />
      <Route path="fruit" element={<Main category="fruit" />} />
      <Route path="*" element={<Navigate to="/vegetable" />} />
    </Route>,
  ),
);

export default router;
