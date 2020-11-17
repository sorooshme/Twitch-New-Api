import {
  BasicHeaders,
  TwitchAuthRequestPayload,
  TwitchAuthResponsePayload,
  TwitchClient,
} from './types';
import fetch from 'node-fetch';

export class TwitchApi {
  public client: TwitchClient;
  private token?: string;
  private expiresAt?: Date;
  private endpoints = {
    auth: 'https://id.twitch.tv/oauth2/token',
  };

  /**
   * Creates a new instance of Twitch Heli Api Wrapper.
   *
   * @param client Client Credentials
   */
  constructor(client: TwitchClient) {
    this.client = client;
  }

  /**
   * Returns BasicHeaders for fetching.
   */
  private getBasicHeaders(): BasicHeaders {
    return { 'Content-Type': 'application/json' };
  }

  /***
   * Returns already fetched token OR fetches a new one if there's no valid token.
   *
   * @param retryCount How many times to retry if Twitch returned non OK status. defaults to 3
   * @param delay Should there be a delay between requests? (in miliseconds). defaults to 0
   */
  public async getToken(
    retryCount: number = 3,
    delay: number = 0
  ): Promise<string> {
    if (this.token && this.expiresAt && this.expiresAt > new Date()) {
      return this.token;
    }

    const getTokenFromTwitch = async (
      retryCount = 3,
      currentRetryCount = 0
    ): Promise<string> => {
      const body: TwitchAuthRequestPayload = {
        client_id: this.client.id,
        client_secret: this.client.secret,
        grant_type: 'client_credentials',
      };

      const res = await fetch(this.endpoints.auth, {
        method: 'POST',
        headers: {
          ...this.getBasicHeaders(),
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        if (delay) {
          await new Promise((resolve) => setTimeout(resolve, delay));
        }

        return getTokenFromTwitch(retryCount, currentRetryCount + 1);
      }

      const resBody: TwitchAuthResponsePayload = await res.json();

      const prefix =
        resBody.token_type[0].toUpperCase() + resBody.token_type.slice(1);
      this.token = prefix + ' ' + resBody.access_token;
      this.expiresAt = new Date(Date.now() + resBody.expires_in);

      return this.token;
    };

    return getTokenFromTwitch(retryCount);
  }
}
