// Base URL for the Puzzmo API
const API_ROOT = 'https://www.puzzmo.com/_api/prod/';

/**
 * Interface for the API response
 */
interface GraphQLResponse<T = any> {
  data: T;
  errors?: any;
}

/**
 * Enables syntax highlighting for GraphQL queries in editors
 */
export const gql = String.raw;

/**
 * Sends a GraphQL request to the Puzzmo API.
 */
export const sendGraphQLRequest = async <T = any>(
  query: string,
  variables: Record<string, any> = {},
): Promise<GraphQLResponse<T>> => {
  const requestBody = {
    query,
    variables,
  };

  const headers = {
    'Content-Type': 'application/json',
  };

  const response = await fetch(`${API_ROOT}graphql`, {
    method: 'POST',
    headers,
    body: JSON.stringify(requestBody),
  });

  // Check if the response is OK (status in the range 200-299)
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
};
