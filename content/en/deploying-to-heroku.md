First, [sign up to Heroku](https://signup.heroku.com/), and create an app. You may deploy your
bot using the Heroku CLI, or GitHub. I recommend GitHub, as it's easier. If you choose Heroku
CLI, follow the instructions there. If you choose GitHub, create an account if you don't have 
one, and [fork ScheduleBot's repository](https://github.com/MeLlamoPablo/schedulebot/tree/dota).
Then, clone your fork and checkout the `heroku` branch, and install the dependencies:

```sh
$ git clone https://github.com/<your_github_username>/schedulebot.git
$ cd schedulebot
$ git checkout heroku-dota
$ npm install
```

The `heroku-dota` branch is ready to be compatible with Heroku. The differences from `dota` are:

* The database settings are no longer stored in `config.js`, as they are provided by Heroku through
an environment variable.
* The `package.json` file is modified to tell Heroku to use Node 6.
* A `Procfile` with your bot's process is included.

Now edit the bot's settings in `config.js`. You can edit or leave whatever you want, but you should
at least edit:

* `master_channel` with the Discord channel where your bot will operate. If you don't know how to
 get it, go to Discord's settings, then `Appearance`, then check `Developer Mode`. After that, 
 right click on your channel, and click `Copy ID`.
* `default_timezone` with the time zone which will be used by the bot.
* `steam.profile_url` with your Steam bot's profile URL.

Next step is configuring your database. In your app's dashboard, go to `Resources`, and under
`Add-ons`, click `Find more add-ons`. Then search `Heroku Posgres` and add it to your app. The
free version is good enough for personal use.

After adding it, you'll find it under the `Add-ons` section. Click on it to your Heroku Postgres
dashboard, and then click on your newly created Datastore. Scroll down to `Database Credentials`,
 and click `View Credentials`. Now run the setup script entering those credentials:

```sh
$ npm run setup
```

After that, you need to configure your Steam credentials. You'll need to re-enter your Heroku 
Postgres database credentials on the Steam setup script.

```sh
$ npm run setup-steam
```

Follow the script's instructions. After you're done, you're ready to push your repo to GitHub:

```sh
$ git add . && git commit -m "Ready to deploy"
$ git push --all
```

Now, in your Heroku dashboard, go to `Deploy`, select `GitHub`, connect your account, and add
your fork. Be sure to select the `heroku-dota` branch.

The first build should be triggered. When it's done, navigate to `Resources`, and, if everything
went right, you should see two Dynos: `web`, and `bot`. Shutdown `web`, as we don't need it, and
turn on `bot`. After that, your bot will be loaded. Go to the top right corner, under `More`,
then `View Logs` to see the console log. If you see the message
`[INFO] ScheduleBot finished loading.`, the bot is live. Congratulations!
