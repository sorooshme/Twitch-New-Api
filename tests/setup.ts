import { TwitchClient } from '../src';

const { NODE_ENV, TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET } = process.env;

declare global {
  namespace NodeJS {
    interface Global {
      twitchCredentials: any;
    }
  }
}

beforeAll(() => {
  if (NODE_ENV !== 'development') {
    throw new Error('Environment must be development.');
  }

  if (!TWITCH_CLIENT_ID || !TWITCH_CLIENT_SECRET) {
    throw new Error(
      'TWITCH_CLIENT_ID and TWITCH_CLIENT_SECRET must be provided as environment variable.'
    );
  }

  const twitchCredentials: TwitchClient = {
    id: TWITCH_CLIENT_ID,
    secret: TWITCH_CLIENT_SECRET,
  };

  global.twitchCredentials = twitchCredentials;
});
