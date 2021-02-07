import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.button`
  background: #6f46a6;
  border-radius: 12px;
  height: 55px;
  border: 0;
  padding: 0 15px;
  color: #f3f7f0;
  width: 100%;
  font-weight: 500;
  margin-top: 20px;
  transform: background-color 0.25s;

  &:hover {
    background: ${shade(0.2, '#6f46a6')};
  }
`;
