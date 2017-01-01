Most Discord bots provide hosting, so that you only need to add the bot to your server. ScheduleBot
does not. This comes with the advantage of not having to rely on a third party  server that could
shut down at any time; with this approach you have complete control of your bot.

However, you will need to meet three prerequisites before using it:

* **A machine to host it**: if you want the bot to be running 24/7, you will need a machine that 
is always on. If you're willing to have your computer always on, then you can go ahead and follow
the `Local Installation` instruction. Not everyone can do that though. We could use a PaaS such 
as [Heroku](https://www.heroku.com/), whose free plan is good enough for this bot. If you'd 
rather do that, then follow the instructions at `Deploying to Heroku`.

* **A Discord bot account**: you can create a Discord application
[here](https://discordapp.com/developers/applications/me). Just write a name and you're good to 
go. After that, click `Create a Bot User`. Then click `token: click to reveal` and save it: you 
will need it later.

* **A Steam account**: the bots needs a Steam account to communicate with users, host lobbies and
invite them. Don't use your Steam account for that; create a brand new one instead. Also it is 
recommended to keep Steam Guard on, as ScheduleBot supports it.

If you meet the prerequisites, go to `Local Installation` or `Deploying to Heroku`. If you'd 
rather not use Heroku, you can follow the `Local Installation` instructions with your own provider.
