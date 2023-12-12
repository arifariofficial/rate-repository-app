import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query Repository {
    repositories {
      edges {
        node {
          id
          fullName
          description
          language
          ownerAvatarUrl
          reviewCount
          ratingAverage
          forksCount
        }
      }
    }
  }
`;

export const GET_LOGGED_USER = gql`
  {
    me {
      id
      username
    }
  }
`;
