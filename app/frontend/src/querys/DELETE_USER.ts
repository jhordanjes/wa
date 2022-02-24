import { gql } from '@apollo/client';

export const DELETE_USER = gql`
  mutation ($sku: String!) {
    removeUser(sku: $sku)
  }
`;
