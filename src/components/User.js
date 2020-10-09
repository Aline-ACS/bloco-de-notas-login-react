import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { Button, Form, FormGroup, Label, Input, Table } from 'reactstrap';

import api from '../services/api';

export default () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const [users, setUsers] = useState([]);

  async function handleStoreUser() {
    await api
      .post('/users', {
        name,
        email,
        phone,
        password,
      })
      .then((response) => {
        setUsers([...users, response.data.user]);
        alert('Usuário cadastrado com sucesso!');
      })
      .catch((error) => console.log(error));
    setName('');
    setEmail('');
    setPhone('');
    setPassword('');
  }

  useEffect(() => {
    api
      .get('/users')
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <Form
        style={{
          width: '600px',
          margin: 'auto',
          paddingTop: '50px',
          paddingBottom: '50px',
        }}
      >
        <h3
          style={{
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          {' '}
          Cadastro de Usuários
        </h3>
        <br />
        <FormGroup>
          <Label>Nome</Label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label>Telefone</Label>
          <Input
            type="text"
            value={phone}
            id="ageUser"
            placeholder="Telefone"
            onChange={(e) => setPhone(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label>Email</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label>Senha</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>

        <Button color="dark" onClick={handleStoreUser}>
          Cadastrar Usuário
        </Button>
        <Button color="info" style={{ marginLeft: '230px' }}>
          <Link to="/cards" style={{ textDecoration: 'none', color: 'white' }}>
            Acessar Notas Cadastradas
          </Link>
        </Button>
      </Form>
    </>
  );
};
