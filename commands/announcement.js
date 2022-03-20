const Discord = require('discord.js')

const config = require("../json/config.json");

module.exports =
 {
    name: 'announcement',
    description: 'Send an announcement',
    execute(message, args, client) 
    {
        if (message.author.id ==config.owner)
        {
            let user = message.member.displayName
            let sentence = message.content.split(" ");
            sentence.shift();
            sentence = sentence.join(" ")
    
            message.channel.send("@everyone");

            var embed = new Discord.MessageEmbed()
            .setTitle("Starman Announcement")
            .setDescription(sentence)
            .setFooter("This message was made by " + user)
            .setColor('BLACK');
            message.delete();
            message.channel.send(embed);
        }
        else
        {
            channel.message.send("You do not have permissions to send announcements.");
        }
    }
}