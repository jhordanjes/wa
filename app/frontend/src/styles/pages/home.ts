import { Table as TableBootstrap } from 'react-bootstrap';
import styled from 'styled-components';

export const Table = styled(TableBootstrap)`
  table {
    font-weight: 500;
  }

  thead tr {
    th {
      color: ${({ theme }) => theme.colors.blue[300]};
    }
  }

  td {
    padding: 0.75rem;
  }

  tbody {
    border-top: 0 !important;
  }

  td:first-child {
    font-weight: 500;
  }

  td {
    vertical-align: middle;
  }

  span {
    font-size: 0.9rem;
  }

  td button {
    background: transparent;
    color: ${({ theme }) => theme.colors.gray[500]};
    font-size: 1.2rem;
    border-radius: 8px;
    padding: 0.5rem;
    border: none;
    position: relative;

    &:hover {
      background: ${({ theme }) => theme.colors.gray[500]};
      color: ${({ theme }) => theme.colors.white[100]};
    }
  }

  tbody tr {
    transition: 0.3s ease-out;
    border-left: 5px solid transparent;
    background: ${({ theme }) => theme.colors.white[100]};
    flex: 1;
  }

  tbody tr:hover {
    border-left-color: ${({ theme }) => theme.colors.blue[300]};
    background: ${({ theme }) => theme.colors.blue[100]};
  }
`;
