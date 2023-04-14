import { gql } from "@apollo/client";

export const getAllCharacters = gql`
    query getAllCharacters {
    characters {
      results {
        gender
        status
        species
        id
        image
        name
        location{name}
      }
    }
  }
`;
