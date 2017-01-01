To run ScheduleBot Dota Edition locally, you will need:

* [NodeJS](https://nodejs.org/en/download/) 6 or above.
* [PostgreSQL](https://www.postgresql.org/download/). You'll need to create an empty database for
 ScheduleBot.
* [git](https://git-scm.com/downloads), so you can easily clone the repo (optional).

Start by cloning this repo, and then install the dependencies:

```sh
$ git clone https://github.com/MeLlamoPablo/schedulebot.git
$ cd schedulebot
$ git checkout dota
$ npm install
```

And edit the bot's settings in `config.js`. You can edit or leave whatever you want, but you
should at least edit:

* `master_channel` with the Discord channel where your bot will operate. If you don't know how to
 get it, go to Discord's settings, then `Appearance`, then check `Developer Mode`. After that, 
 right click on your channel, and click `Copy ID`.
* `default_timezone` with the time zone which will be used by the bot.
* `db` with yout postgres database settings.
* `steam.profile_url` with your Steam bot's profile URL.

Now, make sure that your postgres server is running, and run the database setup script:

```sh
$ npm run setup
```

The script will take your database settings from `config.js`, so you can just go ahead and press
enter. When asked if you want to connect over SSL, unless you have configured your postgres
server to use it, you should say no. Then follow the script's instructions to finish the setup.

After that, you need to configure your Steam credentials:

```sh
$ npm run setup-steam
```

Follow the script's instructions and you're good to go. You can run then your bot with:

```sh
$ npm run bot
```
