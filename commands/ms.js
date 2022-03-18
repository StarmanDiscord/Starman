const Discord = require('discord.js')

const request = require('request');

const config = require('../json/config.json');

var date = new Date().toISOString().slice(0, 10);


module.exports =
 {
    name: 'ms',
    description: 'Get the ms of the bot (ping)',
    execute(message, args, client) {
        message.channel.send('Checking ping').then(m => 
            {
                const start = message.createdTimestamp;
                const end = m.createdTimestamp;
                const total = end - start;
                const embed = new Discord.MessageEmbed()
                .setTitle('Starman ping')
                .addFields
                (
                    { name: "Start", value: "Start: " + start},
                    { name: "End", value: "End: " + end},
                    { name: "Total", value: "Total:"  + ` ${total}` + "ms"},
                )
                .setColor('BLACK');
                return m.edit(embed);
        });
    }
};