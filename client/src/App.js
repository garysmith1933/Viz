import React from 'react';
import NavBar from './NavBar/NavBar';
import Routing from './Routing';
import Login from './components/AuthForm';
import { useSelector } from 'react-redux';
function App() {
  const user = useSelector((state) => state.auth);
  return (
    <>
      <NavBar />
      <Routing />
      {user.Id ? null : <Login />}
    </>
  );
}

export default App;
