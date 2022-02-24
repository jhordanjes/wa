import styled from 'styled-components';

export const Container = styled.main`
  min-height: 100vh;
  background: url('/images/bg/main.svg');
  background-size: cover;
  padding: 3rem 0;
  position: relative;
`;

export const Content = styled.div`
  position: relative;
  z-index: 1;
  margin-top: 4rem;

  h4 {
    color: ${({ theme }) => theme.colors.white[200]};
  }

  p {
    color: ${({ theme }) => theme.colors.white[300]};
  }

  form {
    margin-top: 1rem;

    button {
      margin-top: 2.5rem;
    }
  }

  @media (max-width: 768px) {
    margin-top: 3rem;

    form {
      margin-top: 3rem;

      button {
        margin-top: 1.5rem;
      }
    }
  }
`;

export const Header = styled.header`
  background: ${({ theme }) => theme.colors.blue[400]};
  height: 200px;
  position: absolute;
  top: 0;
  width: 100%;
  padding-top: 2rem;
  z-index: 1;

  h3:hover {
    cursor: pointer;
  }
`;
