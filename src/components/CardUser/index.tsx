import React, { useCallback, useRef } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import UserDTO from '../../dtos/UserDTO';
import Button from '../Button';
import api from '../../services/api';

interface CardUserProps {
  users: UserDTO[];
}

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#6f46a6',
    borderColor: '#6f46a6',
    color: '#fff',
    fontSize: 25,
  },
  body: {
    fontSize: 20,
    background: '#141420',
    color: '#fff',
    borderColor: '#141420',
  },
}))(TableCell);

const CardUser: React.FC<CardUserProps> = ({ users }) => {
  const formRef = useRef<FormHandles>(null);

  const handleDelete = useCallback(async () => {
    try {
      await api.delete('/users');
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <tr>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Idade</StyledTableCell>
            <StyledTableCell align="center">Estado Civil</StyledTableCell>
            <StyledTableCell align="center">CPF</StyledTableCell>
            <StyledTableCell align="center">Cidade</StyledTableCell>
            <StyledTableCell align="center">Estado</StyledTableCell>
            <StyledTableCell align="center"> </StyledTableCell>
            <StyledTableCell align="center"> </StyledTableCell>
          </tr>
        </TableHead>
        <TableBody>
          {users.map(user => (
            <tr key={user.id}>
              <StyledTableCell align="center">{user.name}</StyledTableCell>
              <StyledTableCell align="center">{user.age}</StyledTableCell>
              <StyledTableCell align="center">
                {user.marital_status}
              </StyledTableCell>
              <StyledTableCell align="center">{user.cpf}</StyledTableCell>
              <StyledTableCell align="center">{user.city}</StyledTableCell>
              <StyledTableCell align="center">{user.state}</StyledTableCell>
              <StyledTableCell align="center">
                <Button>Editar</Button>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Form ref={formRef} onSubmit={handleDelete}>
                  <Button type="submit">Deletar</Button>
                </Form>
              </StyledTableCell>
            </tr>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CardUser;
