export function getLeaderboardId() {
  const date = new Date();
  const currentMonth = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  const leaderboardId = `total-monthly-score-${currentMonth}-${year}:leaderboard`;
  return leaderboardId;
}
