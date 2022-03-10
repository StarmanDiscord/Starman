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
            if(json.body.msg.indexOf('No data available for date') > -1) //sometimes theres no data, so we need to catch check if theres no data 
            {
                var embed = new Discord.MessageEmbed()
                .setTitle('Astronomy Picture of the Day')
                .setFooter("Astronomy API data pulled from " + "https://api.nasa.gov/planetary")
                .addFields
                (
                    { name: "API message", value: "API message: " + json.body.msg},
                    { name: "Fix", value: "Fix: " + "Please wait for NASA to update the data for todays date"}
                )
                .setColor('BLACK');
                message.channel.send(embed);
            }
            else //continue as normal
            {
                var embed = new Discord.MessageEmbed()
                .setTitle('Astronomy Picture of the Day')
                .setFooter("Astronomy API data pulled from " + "https://api.nasa.gov/planetary")
                .addFields
                (
                    { name: "Title", value: "Title: " + json.body.title},
                    { name: "Date", value: "Date: " + date}
                )
                .setColor('BLACK');
                message.channel.send(embed);
                message.channel.send(json.body.url);
            }
        })
    }
}