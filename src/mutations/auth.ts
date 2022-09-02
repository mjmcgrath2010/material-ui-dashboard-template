import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($payload: UserAuthInput) {
    login(payload: $payload) {
      token
    }
  }
`;

export const SIGN_UP = gql`
  mutation Signup($payload: NewUserInput) {
    addUser(payload: $payload) {
      token
    }
  }
`;
