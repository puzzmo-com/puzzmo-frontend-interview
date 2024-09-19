import { useEffect, useRef, useState } from 'react';
import './App.css';
import { sendGraphQLRequest, gql } from './puzzmoClient';
import { getLeaderboardId } from './utils/getLeaderboardId';
import { Leaderboard, User } from './puzzmo-types';

// These types are manually created based on the GraphQL schema in
// useGetLeaderboardDataOnLoad
type UserForLeaderboard = Pick<User, 'id' | 'username' | 'name' | 'avatarURL'>;
type LeaderboardData = {
  leaderboard: Pick<Leaderboard, 'id' | 'name'> & {
    records: {
      edges: Array<{
        node: {
          score: number;
          user: UserForLeaderboard;
        };
      }>;
    };
  };
};

/**
 * Custom hook to fetch leaderboard information.
 */
function useGetLeaderboardDataOnLoad(): [
  LeaderboardData | null,
  boolean | null,
] {
  const [loading, setLoading] = useState<boolean | null>(null);
  const [leaderboardData, setLeaderboardData] =
    useState<LeaderboardData | null>(null);

  const mounted = useRef(false);
  useEffect(() => {
    // Prevent multiple calls to the API – this is just a strict mode workaround
    if (!mounted.current) {
      mounted.current = true;
    } else {
      return;
    }

    // Define an async function to fetch data
    const fetchLeaderboardData = async () => {
      setLoading(true);
      try {
        const response = await sendGraphQLRequest<LeaderboardData>(
          gql`
            query LeaderboardQuery($id: ID!) {
              leaderboard(id: $id) {
                id
                name
                records(contextualSubset: false, first: 0) {
                  edges {
                    node {
                      score
                      user {
                        id
                        username
                        name
                        avatarURL
                      }
                    }
                  }
                }
              }
            }
          `,
          {
            id: getLeaderboardId(),
          },
        );
        setLeaderboardData(response.data);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    // Invoke the async function
    fetchLeaderboardData();
  }, []);

  return [leaderboardData, loading];
}

function App() {
  const [leaderboardData, loading] = useGetLeaderboardDataOnLoad();

  if (loading) {
    return <div>Loading…</div>;
  }

  if (!leaderboardData) {
    return <div>No data available.</div>;
  }

  return (
    <div>
      <h2>{leaderboardData.leaderboard.name}</h2>
      <ol>
        {leaderboardData.leaderboard.records.edges.map((edge) => (
          <li key={edge.node.user.id}>
            {edge.node.user.name}:{' '}
            {Intl.NumberFormat(undefined, {}).format(edge.node.score)}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default App;
