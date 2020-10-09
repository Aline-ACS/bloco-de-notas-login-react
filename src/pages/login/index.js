import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import * as userActions from '../../store/user/actions';
import api from '../../services/api';

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  async function handleLogin() {
    try {
      const response = await api.post('/login', { email, password });

      if (response.data.token) {
        dispatch(userActions.login(response.data));
      }
      localStorage.setItem('userUid', response.data.user.uid);
    } catch (error) {
      console.log(error);

      // API NOTES AUTH 25/08
    }
  }

  return (
    <Form inline style={{ width: '600px', margin: 'auto', paddingTop: '80px' }}>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label for="exampleEmail" className="mr-sm-2">
          Email
        </Label>
        <Input
          type="email"
          value={email}
          id="exampleEmail"
          placeholder="email@email.com"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormGroup>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label for="examplePassword" className="mr-sm-2">
          Senha
        </Label>
        <Input
          type="password"
          value={password}
          id="examplePassword"
          placeholder="don't tell!"
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormGroup>
      <Button onClick={() => handleLogin()}>Login</Button>
    </Form>
  );
};
