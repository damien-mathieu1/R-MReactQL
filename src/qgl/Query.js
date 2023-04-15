import { gql } from "@apollo/client";

export const getAllCharacters = gql`
    query getAllCharacters($page: Int) {
    characters (page: $page) {
      info {
        count
        pages
      }
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
