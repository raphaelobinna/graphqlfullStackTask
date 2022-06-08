import { gql } from "@apollo/client";

export const GET_ALL_CONTINENTS = gql`
query {
    continents {
      code
      name
      countries {
        code
        name
        native
        phone
        continent{
          code
          name
        }
        capital
        currency
        languages{
          code
          name
          native
          rtl
        }
        emoji
        emojiU
        states{
          code
          name
        }
        
      }
    }
  }
  
`