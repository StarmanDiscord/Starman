const Discord = require('discord.js');

const client = new Discord.Client();

const fs = require('fs');

const nasa = require("nasa-sdk");

const config = require("./json/config.json");

const { channel } = require('diagnostics_channel');
const { apiKey } = require('nasa-sdk/lib/config');





client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles)
{
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

console.log("");
console.log("Starman attemtping to login")
client.on('ready', () => 
{
    client.user.setPresence(
      {
        activity: 
        {
            name: `NASA API requests`,
            type: 'WATCHING',
            status: "DND"
        },
    });
    console.log("");
    console.log('Starman logged in succuessfully');
    console.log("");
    console.log("NASA key: " + config.nasakey);
});

client.on('message', (message) => 
{
  if (message.author.bot) return;
  if (message.content.startsWith(config.prefix)) 
  {
    const args = message.content.slice(config.prefix.length).split(/ +/)
    const commandName = args.shift().toLowerCase()
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
    if (command) 
    {
      try 
      {
        client.commands.get(command.name).execute(message, args, client);
      } catch (e) 
      {
        message.channel.send('An error occured running ' + command.name + " Error: " + e);
        console.error(`Error executing ${command.name}: \n${e}`);
      }
    }
  }
})

client.login(config.token);

nasa.setNasaApiKey(config.nasakey);