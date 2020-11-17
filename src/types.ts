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
