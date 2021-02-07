import styled, { css } from 'styled-components';

interface ContainerProps {
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  & + div {
    margin-top: 10px;
  }

  input {
    background: #08080c;
    border-radius: 12px;
    border: 2px solid #08080c;
    padding: 15px;
    color: #f3f7f0;
    width: 100%;

    &:focus {
      border: 2px solid #f3f7f0;
    }

    ${props =>
      props.isErrored &&
      css`
        border-color: #e23c4a;
      `};

    &::placeholder {
      color: #cdcddf;
    }
  }
`;

export const Error = styled.div`
  height: 25px;
  margin-top: 5px;
  color: #e23c4a;
`;
