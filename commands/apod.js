const Discord = require('discord.js')

const request = require('request');

const config = require('../json/config.json');

var date = new Date().toISOString().slice(0, 10);

let options = {json: true};

var url = `https://api.nasa.gov/planetary/apod?api_key=${config.nasakey}&date=${date}&concept_tags=True"`;

module.exports =
 {
    name: 'apod',
    description: 'Astronomy Picture of the Day',
    execute(message, args, client) 
    {
        let data = message.content.split(" ");
        data.shift();
        data = data.join(" ");

        //check if a date is included in the message
        if (data === "")
        {
            message.channel.send("No date in message, using default date");
        }
        else if (date)
        {
            url = `https://api.nasa.gov/planetary/apod?api_key=${config.nasakey}&date=${data}&concept_tags=True"`;
        }

        request(url, options, (res, json) => 
        {
            if(json.body.hasOwnProperty('msg')) //This catches the message from an API, could be an error due to date format or theres no image for the set date
            {
                var embed = new Discord.MessageEmbed()
                .setTitle('Astronomy Picture of the Day')
                .setFooter("Astronomy API data pulled from " + "https://api.nasa.gov/planetary")
                .addFields
                (
                    { name: "API message", value: "API message: " + json.body.msg},
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
        resetDate();
    }
}

function resetDate()
{
    date = new Date().toISOString().slice(0, 10);
    url = `https://api.nasa.gov/planetary/apod?api_key=${config.nasakey}&date=${date}&concept_tags=True"`;
}