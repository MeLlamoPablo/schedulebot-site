To run ScheduleBot locally, you will need:

* [NodeJS](https://nodejs.org/en/download/) 6 or above.
* [PostgreSQL](https://www.postgresql.org/download/).
	* You'll need to create an empty database for ScheduleBot.
* [git](https://git-scm.com/downloads), so you can easily clone this repo.

Start by cloning this repo, and then install the dependencies. In a command line (if you're on
Windows and have no idea what that means, open the `Git Bash` program that was installed with git),
do:

```sh
$ git clone https://github.com/MeLlamoPablo/schedulebot.git
$ cd schedulebot
$ npm install
```

Now make sure that postgres is running and launch the setup server by doing:

```sh
$ npm run setup
```

Enter your database settings. When asked if you want to connect over SSL, unless you have configured
your postgres server to use it, you should say no. Then visit the setup site at
[http://localhost:3000](http://localhost:3000). Follow the instructions in there.

**Note**: an `.ENV` file containing your database settings will be created at your bot's directory.
Do not delete it, as it's needed by the bot to work.

Once you click the `Deploy Bot` button, you can run then your bot with:

```sh
$ npm run bot
```
