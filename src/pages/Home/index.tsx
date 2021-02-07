import * as Yup from 'yup';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { cities, states } from 'estados-cidades';
import { Container, Register, ListRegistered } from './styles';
import api from '../../services/api';

import Input from '../../components/Input';
import Button from '../../components/Button';
import SelectInput from '../../components/SelectInput';
import getValidationsErrors from '../../utils/getValidationErrors';
import UserDTO from '../../dtos/UserDTO';
import CardUser from '../../components/CardUser';

const Home: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [users, setUsers] = useState<UserDTO[]>([]);

  useEffect(() => {
    api.get('/users').then(({ data }) => setUsers(data));
  });

  const handleSubmit = useCallback(async (data: UserDTO) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        age: Yup.string().required('Idade obrigatória'),
        marital_status: Yup.string().required('Estado civil obrigatório'),
        cpf: Yup.string().length(14, 'CPF Inválido'),
        city: Yup.string().required('Cidade obrigatória'),
        state: Yup.string().required('Estado obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('/users', data);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationsErrors(error);
        formRef.current?.setErrors(errors);
      }
    }
  }, []);

  const [selectState, setSelectState] = useState<string>('MG');
  const [selectCity, setSelectCity] = useState<string>('');

  const statesBr = states();
  const citiesBr = cities(selectState);
  return (
    <Container>
      <Register>
        <h1>Bem vindo</h1>
        <h2>Cadastre uma pessoa</h2>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="name" placeholder="Nome" />
          <Input name="age" type="number" placeholder="Idade" />
          <Input name="marital_status" placeholder="Estado Civil" />
          <Input name="cpf" placeholder="CPF" />
          <SelectInput
            select={selectState}
            setSelect={setSelectState}
            values={statesBr}
            name="state"
          />
          <SelectInput
            values={citiesBr}
            name="city"
            select={selectCity}
            setSelect={setSelectCity}
          />
          <Button type="submit">Cadastrar</Button>
        </Form>
      </Register>
      <ListRegistered>
        <h1>Lista de cadastrados</h1>
        <CardUser users={users} />
      </ListRegistered>
    </Container>
  );
};

export default Home;
