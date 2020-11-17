# Install

```
npm i twitch-new-api
```

# Basic Usage

This package is written in TypeScript, so you can use it in both js and ts.

All of the methods are self documented, providing a good developer experience.

```ts
import { TwitchApi, TwitchCredentials } from '../src';

const twitchCredentials: TwitchCredentials = {
  id: 'twitch.client.id',
  secret: 'twitch.client.secret',
};

const twitch = new TwitchApi(twitchCredentials);

(async () => {
  const user = await twitch.getUserById(['mechiller']);
  const profilePicture = user[0].profile_image_url;
})();
```

# Contribution

I made this package for my own usage, if you need something specific, please, make an issue or PR.

# License - MIT
