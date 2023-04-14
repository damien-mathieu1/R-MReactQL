import { gql } from "@apollo/client";

export const getAllCharacters = gql`
  query getAllCharacters {
    characters {
      results {
        id
        image
        name
      }
    }
  }
`;
