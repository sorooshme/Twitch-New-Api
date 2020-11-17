import { TwitchApi } from '../src';

declare global {
  namespace NodeJS {
    interface Global {
      twitchCredentials: any;
    }
  }
}

describe('Twitch', () => {
  let twitch: TwitchApi;

  beforeAll(() => {
    twitch = new TwitchApi({
      id: global.twitchCredentials.id,
      secret: global.twitchCredentials.secret,
    });
  });

  test('getToken should work.', async () => {
    const token = await twitch.getToken();

    expect(typeof token).toBe('string');
    expect(token.split(' ').length).toBe(2);
    expect(token.split(' ')[0]).toBe('Bearer');
  });

  test('getUserByName should work.', async () => {
    const users = await twitch.getUserByName([
      'mechiller',
      'eager',
      'menchtv',
      'nikaein',
      'sepiffs',
    ]);

    expect(users.length).toBeGreaterThan(0);
    expect(users.every((user) => user.login)).toBe(true);
  });

  test('getUserById should work.', async () => {
    const users = await twitch.getUserById([
      '128452165',
      '68937912',
      '199659989',
      '44613464',
      '233294013',
    ]);

    expect(users.length).toBeGreaterThan(0);
    expect(users.every((user) => user.login)).toBe(true);
  });
});
