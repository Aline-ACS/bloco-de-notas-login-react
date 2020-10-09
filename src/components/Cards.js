import React, { useEffect, useState } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, Table } from 'reactstrap';
import api from '../services/api';

export default () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');
  const [hour, setHour] = useState('');
  const user_uid = localStorage.getItem('userUid');

  const [notes, setNotes] = useState([]);

  async function handleStoreNote() {
    await api
      .post('/cards', {
        title,
        content,
        date,
        hour,
        user_uid,
      })
      .then((response) => {
        setNotes([...notes, response.data.created]);
        alert('Nota cadastrada com sucesso!');
      })
      .catch((error) => console.log(error));
    setTitle('');
    setContent('');
    setDate('');
    setHour('');
  }

  async function handleDeleteNote(uid) {
    await api
      .delete(`/cards/${uid}`)
      .then((response) => {
        setNotes(notes.filter((note) => note.uid !== uid));
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    api
      .get('/cards')
      .then((response) => setNotes(response.data.cards))
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
          Cadastro de Notas
        </h3>
        <br />
        <FormGroup row>
          <Label sm={2}>Título</Label>
          <Col sm={10}>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label sm={2}>Data</Label>
          <Col sm={10}>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label sm={2}>Hora</Label>
          <Col sm={10}>
            <Input
              type="time"
              value={hour}
              onChange={(e) => setHour(e.target.value)}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label sm={2}>Conteúdo</Label>
          <Col sm={10}>
            <Input
              type="textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Col>
        </FormGroup>

        <FormGroup check row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button onClick={handleStoreNote}>Cadastrar Nota</Button>
          </Col>
        </FormGroup>
      </Form>
      <Table
        dark
        style={{ width: '600px', margin: 'auto', paddingTop: '50px' }}
      >
        <thead>
          <tr>
            <th>Título</th>
            <th>Conteúdo</th>
            <th>Data</th>
            <th>Hora</th>
            <th>Excluir Nota?</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note) => (
            <React.Fragment key={note.uid}>
              <tr>
                <th scope="row">{note.title}</th>
                <td>{note.date}</td>
                <td>{note.hour}</td>
                <td>{note.content}</td>
                <td>
                  <span>
                    <Button
                      color="secondary"
                      size="sm"
                      onClick={(e) => handleDeleteNote(note.uid)}
                    >
                      Excluir
                    </Button>
                  </span>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </>
  );
};
