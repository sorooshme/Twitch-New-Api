/**
 * Twitch Client Credentials.
 */
export interface TwitchClient {
  secret: string;
  id: string;
}

/**
 * Basic Headers for fetching.
 */
export interface BasicHeaders {
  'Content-Type': 'application/json';
}

/**
 * Request payload to get Token.
 */
export interface TwitchAuthRequestPayload {
  client_id: string;
  client_secret: string;
  grant_type: 'client_credentials';
}

/**
 * Response payload from getting Token.
 */
export interface TwitchAuthResponsePayload {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope?: string[];
}

/**
 * Twitch Authorization Headers for fetching.
 */
export interface TwitchAuthorizationHeaders {
  Authorization: string;
  'Client-ID': string;
}

/**
 * Response payload for getting any resource from Twitch.
 */
export interface TwitchResourceResponsePayload {
  data: any[];
}

/**
 * Response payload for getting stream from Twitch.
 */
export interface TwitchStreamResponsePayload {
  id: string;
  user_id: string;
  user_name: string;
  game_id: string;
  game_name: string;
  type: string;
  title: string;
  viewer_count: number;
  started_at: string;
  language: string;
  thumbnail_url: string;
}
