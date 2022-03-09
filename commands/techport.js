const Discord = require('discord.js')

const request = require('request');

const config = require('../json/config.json');

var date = new Date().toISOString().slice(0, 10)

let options = {json: true};

var url = `https://api.nasa.gov/techport/api/specification?api_key=${config.nasakey}`;

module.exports =
 {
    name: 'techport',
    description: 'Techport allows the public to discover the technologies NASA is working on every day to explore space, understand the universe, and improve aeronautics.',
    execute(message, args, client) 
    {

        request(url, options, (res, json) => 
        {
            var embed = new Discord.MessageEmbed()
            .setTitle('Techport')
            .setFooter("Techport API data pulled from " + "https://api.nasa.gov/techport")
            .addFields
            (
                { name: "Title", value: "Title: " + json.body.title},
                { name: "Date", value: "Date: " + date}
            )
            .setColor('BLACK');
            message.channel.send(embed);
            message.channel.send(json.body.url);
        })
    }
}