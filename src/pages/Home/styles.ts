import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Register = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center;
  align-items: center;
  width: 35%;

  h1 {
    font-size: 32px;
  }

  h2 {
    margin-top: 15px;
    font-size: 22px;
  }

  form {
    margin: 80px 0;
    width: 350px;
    text-align: center;
  }
`;

export const ListRegistered = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center;
  align-items: center;
  width: 65%;

  h1 {
    font-size: 32px;
  }
`;
