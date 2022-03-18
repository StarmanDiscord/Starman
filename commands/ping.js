const Discord = require('discord.js')

const ping = require('ping');

const config = require("../json/config.json");

var hosts = ['api.nasa.gov','tle.ivanstanojevic.me'];


module.exports =
 {
    name: 'ping',
    description: 'Ping all the APIS used, useful to see if they are up',
    execute(message, args, client) 
    {
        hosts.forEach(function(host)
        {
            ping.sys.probe(host, function(isAlive)
            {
                var msg = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
                
                const embed = new Discord.MessageEmbed()
                .setTitle('Starman ping')
                .addFields
                (
                    { name: "Result", value: "Result: " + msg}
                )
                message.channel.send(embed);
            });
        });
    }
}