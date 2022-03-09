const Discord = require('discord.js')

const request = require('request');

const config = require('../json/config.json');

var date = new Date().toISOString().slice(0, 10)

let options = {json: true};

var url = `https://tle.ivanstanojevic.me/api/tle/25544`;

module.exports =
 {
    name: 'zarya',
    description: 'Get data based upon ISS(ZARYA)',
    execute(message, args, client) 
    {

        request(url, options, (res, json) => 
        {
            var embed = new Discord.MessageEmbed()
            .setTitle('ISS TLE API')
            .setFooter("TLE API data pulled from " + url)
            .addFields
            (
                { name: "Name", value: "Name: " + json.body.name},
                { name: "Satalite ID", value: "Satalite ID: " + json.body.satelliteId},
                { name: "Date", value: "Date: " + json.body.date},
                { name: "Line1", value: "Line 1: " + json.body.line1},
                { name: "Line2", value: "Line 2: " + json.body.line2},
            )
            .setColor('BLACK');
            message.channel.send(embed);
        })
    }
}