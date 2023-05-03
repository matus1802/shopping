import { useState, useEffect } from 'react';
import Loader from './components/Loader';

import useLocalStorage from './hooks/useLocalStorage';
import { httpToken } from './gql/vars';
import { RouterProvider } from 'react-router-dom';
import router from './router/index';

export default function App() {
  const { getValue } = useLocalStorage();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getValue('httpToken');
    httpToken(token);
    setLoading(false);
  }, []);

  return loading ? <Loader /> : <RouterProvider router={router} />;
}
