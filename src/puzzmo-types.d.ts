export interface Leaderboard {
  __typename?: 'Leaderboard';
  id: ID;
  slug: string;
  /**
   * A stable string ID which can be used to identify the leaderboard across
   * different instances (think a "top scores for xwords" which needs to be
   * the same for all xword puzzles)
   */
  stableID: string;
  dynamic: boolean;
  /** Have the leaderboard records for this been archived? */
  archived: boolean;
  createdAt: DateTime;
  updatedAt: DateTime;
  activeFrom?: DateTime | null;
  inactiveFrom?: DateTime | null;
  /** Used for titles */
  name: string;
  /** Used for subtitles, especially on featured */
  description: string;
  /** A string which describes how to format the result */
  formatString: string;
  /** So we can order leaderboards deterministically, only really used in dynamic leaderboards */
  sortValue?: number | null;
  /** A way to filter the leaderboard */
  leaderboardFilter?: string | null;
  /** An expression string for generating the score from a set of deeds */
  leaderboardScore?: string | null;
  /** When we have a dynamic leaderboard, we need to know what the */
  deedID?: string | null;
  expirationNote?: string | null;
  /** A list of scores in the loaderboard (without order) */
  records: LeaderboardRecordConnection;
}

export interface LeaderboardRecordConnection {
  __typename?: 'LeaderboardRecordConnection';
  edges?: Array<LeaderboardRecordEdge | null> | null;
  pageInfo: PageInfo;
}

export interface PageInfo {
  __typename?: 'PageInfo';
  startCursor?: string | null;
  endCursor?: string | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface LeaderboardRecordEdge {
  __typename?: 'LeaderboardRecordEdge';
  node: LeaderboardRecord;
  cursor: string;
}

export interface LeaderboardRecord {
  __typename?: 'LeaderboardRecord';
  id: ID;
  slug: string;
  createdAt: DateTime;
  /** Which leaderboard is this in? */
  leaderboard: Leaderboard;
  leaderboardID: string;
  rank: number;
  /** The thing to order the leaderboard by */
  score: number;
  subscore?: number | null;
  textRepresentation?: string | null;
  /** The optional submitter */
  user?: User | null;
  userID?: string | null;
  /** The optional groupID, */
  groupID?: string | null;
  gameplayID?: string | null;
}

export interface User {
  __typename?: 'User';
  /** UID */
  id: ID;
  /** @jane */
  username: string;
  /** the two chars after the username @jane#bg */
  usernameID: string;
  /** The URL for a profile picture */
  avatarURL: string;
  type: UserType;
  actualType: UserType;
  createdAt: DateTime;
  updatedAt: DateTime;
  /** A space separated string for system-wide roles */
  roles: string;
  /** "Jane Blogs" */
  name?: string | null;
  /** If someone has oauthed to Twitch, this is their handle */
  twitchHandle?: string | null;
  tagFromViewer?: string | null;
  canWriteToGamePlay: boolean;
  publicProfile?: UserProfile | null;
}

export interface UserProfile {
  __typename?: 'UserProfile';
  id: ID;
  userID: string;
  /** A one liner */
  bio?: string | null;
  /** Hrefs which show under the user */
  links: string[];
  /** If you need to go backwards I guess */
  user?: User | null;
  /** Which IDs have been marked as stats someone wants to present on their page */
  highlightedStatIDs: string[];
  highlightedStats: ProfileStat[];
}

export interface ProfileStat {
  __typename?: 'ProfileStat';
  index: number;
  msg: string;
  alt?: number | null;
  slug: string;
  section: string;
  sectionSlug: string;
  selected?: boolean | null;
  show?: boolean | null;
}
