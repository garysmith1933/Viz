import React from 'react';
import NavBar from './NavBar/NavBar';
import Routing from './Routing';
import Login from './components/AuthForm';
import { useSelector } from 'react-redux';
function App() {
  const user = useSelector((state) => state.auth);
  const auth = useSelector((state) => state.authorizeReducer.auth);
  console.log(auth);
  console.log(auth && auth.id);

  return (
    <>

      <NavBar />
      {auth.id ? <Routing /> : <Login />}
    </>
  );
}

export default App;
