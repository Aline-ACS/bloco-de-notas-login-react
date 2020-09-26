import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonToggle } from 'reactstrap';

import Cards from '../../components/Cards';

export default () => {
  return (
    <div>
      <Cards />
      <ButtonToggle color="primary" size="sm" style={{ margin: '50px' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
          Voltar para -> Cadastrar Usuário
        </Link>
      </ButtonToggle>{' '}
    </div>
  );
};
