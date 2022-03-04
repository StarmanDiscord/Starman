const Discord = require('discord.js')

const config = require("../json/config.json");

const request = require("request");

let url = "http://starman.atwebpages.com/api/backend.json"

let options = {json: true};

module.exports =
 {
    name: 'backend',
    description: 'Check the bots backend',
    execute(message, args, client) 
    {
        if (message.author.id == config.owner)
        {
            request(url, options, (res, json) => 
            {
                if (res.statusCode == 200) 
                {
                    var embed = new Discord.MessageEmbed()
                    .setTitle('Starman backend')
                    .setFooter("API data pulled from " + url)
                    .addFields
                    (
                        { name: "Version", value: "Version: " + json.version},
                        { name: "Killswitch", value: "Killswitch: " + json.killswitch},
                        { name: "Debugging", value: "Debugging: " + json.debugging}
                    )
                    .setColor('BLACK');
                    message.channel.send(embed);
                };
            });
        }
        else
        {
            message.channel.send("You do not have permissions to use the backend command");
        }
    }
}