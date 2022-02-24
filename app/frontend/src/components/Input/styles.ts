import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.div`
  width: 100%;
  margin-top: 1rem;

  label {
    font-size: 0.9rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.blue[300]};
    margin-bottom: 4px;
  }
`;

export const Content = styled.div<ContainerProps>`
  position: relative;
  width: 100%;
  font-weight: 500;
  background: ${({ theme }) => theme.colors.gray[100]};
  border: 1px solid transparent;
  transition: 0.3s;
  border-radius: 4px;
  padding: 0.5rem 1rem;

  ${props =>
    props.isFocused &&
    css`
      background: ${({ theme }) => theme.colors.white[100]};
      border-color: ${({ theme }) => theme.colors.blue[200]};
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.blue[100]};
    `}

  ${props =>
    props.isFilled &&
    css`
      border-color: rgba(1, 1, 1, 0.2);
      box-shadow: 0 0 0 2px transparent;
    `}

  input {
    height: 100%;
    width: 100%;
    border: 0;
    outline: none;
    background: transparent;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
  }

  input:-webkit-autofill {
    -webkit-text-fill-color: #000 !important;
  }
`;

export const Error = styled.span`
  color: ${({ theme }) => theme.colors.red[400]};
  font-size: 0.9rem;
`;
