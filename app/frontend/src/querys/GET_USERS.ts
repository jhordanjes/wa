import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query users($name: String, $email: String, $cpf: String) {
    users(filters: { name: $name, email: $email, cpf: $cpf }) {
      name
      email
      cpf
      sku
    }
  }
`;
