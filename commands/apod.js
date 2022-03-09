const Discord = require('discord.js')

const request = require('request');

const config = require('../json/config.json');

var date = new Date().toISOString().slice(0, 10)

let options = {json: true};

var url = `https://api.nasa.gov/planetary/apod?api_key=${config.nasakey}&date=${date}&concept_tags=True"`;

module.exports =
 {
    name: 'apod',
    description: 'Astronomy Picture of the Day',
    execute(message, args, client) 
    {

        request(url, options, (res, json) => 
        {
            var embed = new Discord.MessageEmbed()
            .setTitle('Astronomy Picture of the Day')
            .setFooter("Astronomy API data pulled from " + "https://api.nasa.gov/planetary")
            .addFields
            (
                { name: "Title", value: "Title " + json.body.title},
                { name: "Date", value: "Date: " + date}
            )
            .setColor('BLACK');
            message.channel.send(embed);
            message.channel.send(json.body.url);
        })
    }
}