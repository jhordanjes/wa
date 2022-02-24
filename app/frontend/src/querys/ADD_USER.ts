import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation createUser($name: String, $email: String, $cpf: String) {
    createUser(user: { name: $name, email: $email, cpf: $cpf }) {
      name
      sku
    }
  }
`;
