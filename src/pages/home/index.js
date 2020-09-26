import React from 'react';
import { useDispatch } from 'react-redux';

import { Button, Container, Row, Col } from 'reactstrap';
import * as userActions from '../../store/user/actions';

import User from '../../components/User';

export default () => {
  const dispatch = useDispatch();
  return (
    <div>
      <User />
      <Container>
        <Row>
          <Col sm="12" md={{ size: 8, offset: 2 }}>
            <Button
              color="danger"
              size="lg"
              style={{
                marginLeft: '250px',
                marginRight: '100px',
                marginTop: '60px',
                marginBottom: '50px',
                alignItems: 'center',
              }}
              onClick={() => dispatch(userActions.logout())}
            >
              Sair da conta
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
