const discord = require("discord.js");
const botConfig = require("./botconfig.json");

const fs = require("fs")

const bot = new discord.Client();
bot.commands = new discord.Collection();

client.login(process.env.BOT_TOKEN);

fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
        console.log("Kon geen files vinden");
        return;
    }

    jsFiles.forEach((f, i) => {


        var fileGet = require(`./commands/${f}`);
        console.log(`De file ${f} is geladen`);

        bot.commands.set(fileGet.help.name, fileGet);
    })

});

bot.on("guildMemberAdd", member => {



    const channel = member.guild.channels.find("name", "welkom👋")

    channel.send(`${member}`)

    var joinEmbed = new discord.RichEmbed()

        .setColor('#26bbaf')
        .setThumbnail(member.user.displayAvatarURL)
        .setAuthor(member.user.tag + ' Heeft de server gejoind', member.user.displayAvatarURL)
        .addField(`Welkom ${member.user.username}`, "Welkom op de Sizzle!-server.")
        .addField("Check het #regels📜 kanaal ff!", "Anders kun je verbannen worden!")
        .setFooter(`${member.user.username} is gejoined!`)
        .setTimestamp()

    channel.send(joinEmbed);


    var role = member.guild.roles.find('name', 'Lid😜');
    member.addRole(role);




});



bot.on("ready", async () => {

    console.log(`${bot.user.username} is online!`);

    bot.user.setActivity("Danidosss", { type: "WATCHING" });







})


bot.on("message", async message => {

    if (message.author.bot) return;


    if (message.channel.type === "dm") return;

    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    var arguments = messageArray.slice(1);


    var commands = bot.commands.get(command.slice(prefix.length));

    if (commands) commands.run(bot, message, arguments)



    if (command === `${prefix}Bedankt`) {

        return message.channel.send("Hallo bedankt voor het toevoegen van mij!")

    }


    if (message.content == 'Hallo') { 

        message.channel.sendMessage('Hallo!...xD');
    }

    if (message.content == 'Hey Sizzle!') {

        message.reply(`Hallo als ik je moet helpen zeg dan: "Hey Sizzle help"  `)


    }

    var staffRole = message.guild.roles.find("name", "Staff :)");



    if (command === `<@${bot.user.username.tag}>`) {


        message.channel.send(`Ja wat is er ${message.author}?`)
    }




    if (command === `${prefix}hallo`) {

        return message.channel.send("Hallo!")

    }

    if (command === `${prefix}dm`) {

        message.delete();

        var dm = arguments.slice(1).join(' ');
        var dmPerson = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));


        var userEmbed = new discord.RichEmbed()
            .setTitle("**U hebt een bericht verstuurd**")
            .setColor("#470191")
            .addField("Naar:", dmPerson)

        message.author.send(userEmbed)


        var dmEmbed = new discord.RichEmbed()
            .setTitle("**U hebt een bericht ontvangen van staff-leden!**")
            .setColor("#470191")
            .addField("Het bericht:", dm)

        dmPerson.send(dmEmbed)

    }





    if (command === `${prefix}bot-info`) {

        var botIcon = bot.user.displayAvatarURL;


        var botEmbed = new discord.RichEmbed()
            .setDescription("Discord Gameplay-BOT info")
            .setColor("#2d234f")
            .setThumbnail(botIcon)
            .addField("Bot naam", bot.user.username)
            .addField("Gemaakt door:", "Maiky");





        return message.channel.send(botEmbed);

    }


    if (command === `${prefix}server-info`) {

        var icon = message.guild.iconURL;

        var serverEmbed = new discord.RichEmbed()
            .setDescription("Hier is informatie over de server.")
            .setColor("#2d234f")
            .setThumbnail(icon)
            .addField("Bot naam:", bot.user.username)
            .addField("U bent gejoined op:", message.member.joinedAt)
            .addField("Members:", message.guild.memberCount)
            .addField("Eigenaar:", message.guild.owner)
            .setTitle("Server-info")
            .setFooter("© Sizzle!-BOT");




        return message.channel.send(serverEmbed);
    }

    if (command === `${prefix}help`) {

        var icon = message.guild.iconURL;

        var serverEmbed = new discord.RichEmbed()
            .setTitle("Gameplaybot commands")
            .setDescription("Hier kun je alle commando's zien!")
            .setColor("#59167f")
            .addField("g!server-info", "Hiermee krijg je informatie over de server.")
            .addField("g!bot-info", "Hiermee krijg je informatie over de Gameplay-BOT.")


        return message.author.send(serverEmbed);
    }

});












bot.login(botConfig.token)
