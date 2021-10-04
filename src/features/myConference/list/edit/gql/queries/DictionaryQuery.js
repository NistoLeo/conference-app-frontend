import { gql } from '@apollo/client'
export const DICTIONARY_QUERY = gql`
  query getDictionaires {
    typeList {
      id
      name
    }
    categoryList {
      id
      name
    }
    countryList {
      id
      name
      code
    }
    countyList {
      id
      name
      code
    }
    cityList {
      id
      name
      code
    }
  }
`
