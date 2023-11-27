import React from 'react';
import './App.css';
import Logo from './Components/logo.png';
import Form from './Form/Formulario.jsx';

function App() {
  return (
    <>
      <div className='barra'></div>
      <div>
        <header>
          <img src={Logo} alt='Logo' className='logo' />
        </header>
      </div>
      <hr/>
      <Form />
      <div className='barra-foot'>
        <p>Copyright 2005 - 2022. Ibero-American University Foundation - All rights reserved</p>
      </div>
    </>
  );
}

export default App;
