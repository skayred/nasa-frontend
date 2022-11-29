import { gql } from "@apollo/client";

export const ASTEROIDS = gql`
  query closestAsteroids($from: String!, $to: String!, $amount: Int!) {
    closestAsteroids(from: $from, to: $to, amount: $amount) {
      id
      missDistance
      happenedAt
      asteroid {
        id
        nasaID
        name
      }
    }
  }
`;
