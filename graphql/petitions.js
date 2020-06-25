import { gql } from "@apollo/client";

const petitions = {
  LOGIN: gql`
    mutation loginUser($input: LoginInput) {
        loginUser (input: $input) {
          name
          email
          description
          church
          token
          img
        }
    }
    `,
  CREATE_USER: gql`
    mutation createUser ($input: UserInput) {
        createUser(input:$input) 
    }
    `
};

module.exports = petitions;