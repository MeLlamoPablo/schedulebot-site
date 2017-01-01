const fs = require("fs");
const marked = require("marked");

module.exports = {
	title: "ScheduleBot for Dota 2",
	description: "The Discord bot that will host your guild's inhouses from now on.",
	get_started: "Get Started",

	sections: {
		ov: {
			title: "Overview",
			desc: [`
			ScheduleBot allows users to create events for a specified time.
			The Dota extension allows users to add inhouses to those events.
			`,`
			When the event happens, ScheduleBot automatically sets up a lobby and invites everyone
			who has	signed up. Once all players have entered the lobby, ScheduleBot starts the game.
			`,`
			ScheduleBot supports many configuration options, such as time zone, server, or game
			mode. See below to learn how it works in detail:
			`]
		},
		hiw: {
			title: "How it works",

			inhouse_title: "Inhouse creation process",
			inhouse_content: [`
			ScheduleBot works with events. Events can be created by users by providing an event name
			and a time. The user can provide the time on their own time zone, and it will be
			converted to the server's. Events are created by using the "create" command.
			`,`
			The created event is still "barebones". It can be used to coordinate a pub match with
			your friends, but it won't set up a lobby just yet. In order to do so, an inhouse must
			be added to the event by using the "add-inhouse" command. The command also supports
			options such as the game mode and the lobby server.
			`,`
			The inhouse's setup is complete. Now people who have linked their steam account
			(See "Steam account linking process") can confirm their attendance using the "confirm"
			command. At the configured time, ScheduleBot will create the lobby and invite every user
			who signed up. Once ten people have joined the lobby, the game will automatically start.
			Alternatively, it can be manually started by using the "force-lobby-start" command.
			`,`
			Please do note that ScheduleBot can only host one inhouse at a time. Adding multiple
			inhouses for different events scheduled for the same time will result in unexpected
			behaviour. If you wish to have simultaneous inhouses, you'd need to run multiple
			instances of the bot.
			`],

			steam_title: "Steam account Linking process",
			steam_content: [`
			ScheduleBot asks users to link their Steam account before being able to join any events.
			By running the command link-steam, users are redirected to ScheduleBot's Steam profile
			and asked to add it.
			`,`
			After being added, it sends a code that must be sent through Discord.
			`,`
			By doing this, ScheduleBot is able to invite the people who sign up to the lobby.
			`]
		},
		i: {
			title: "Installation",

			content: [{
				title: "Prerequisites",
				content: marked(fs.readFileSync(
					"./content/en/installation-prerequisites.md", "utf-8"
				))
			}, {
				title: "Local Installation",
				content: marked(fs.readFileSync("./content/en/local-installation.md", "utf-8"))
			}, {
				title: "Deploying to Heroku",
				content: marked(fs.readFileSync("./content/en/deploying-to-heroku.md", "utf-8"))
			}]
		},
		pb: {
			title: "Powered by",
			hide_from_navbar: true
		}
	},

	// Footer
	footer_title: "Need any help?",
	footer_content: `
	If you need any help with setup or understanding, or have any suggestions, don't hesitate to 
	contact me; I'll gladly help! Use any of the links on the right.
	`,
	footer_links_title: "Relevant links",
	footer_links: [{
		text: "GitHub repo",
		href: "https://github.com/MeLlamoPablo/schedulebot/tree/dota"
	}, {
		text: "Issue tracker",
		href: "https://github.com/MeLlamoPablo/schedulebot/issues"
	}, {
		text: "This site's GitHub repo",
		href: "https://github.com/MeLlamoPablo/schedulebot-site"
	}, {
		text: "Send me an email",
		href: "mailto:pabloviolin8@gmail.com"
	}, {
		text: "PM me on Reddit",
		href: "https://www.reddit.com/message/compose/?to=sfcpfc"
	}],
	license_text: "Apache-2.0 © Pablo Rodríguez",
	back_to_top: "Back to top"
};
