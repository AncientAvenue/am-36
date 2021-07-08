
                let Discord;
                let Database;
                if(typeof window !== "undefined"){
                    Discord = DiscordJS;
                    Database = EasyDatabase;
                } else {
                    Discord = require("discord.js");
                    Database = require("easy-json-database");
                }
                const delay = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms));
                const s4d = {
                    Discord,
                    client: null,
                    tokenInvalid: false,
                    reply: null,
                    joiningMember: null,
                    database: new Database("./db.json"),
                    checkMessageExists() {
                        if (!s4d.client) throw new Error('You cannot perform message operations without a Discord.js client')
                        if (!s4d.client.readyTimestamp) throw new Error('You cannot perform message operations while the bot is not connected to the Discord API')
                    }
                };
                s4d.client = new s4d.Discord.Client({
                    fetchAllMembers: true
                });
                s4d.client.on('raw', async (packet) => {
                    if(['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)){
                        const guild = s4d.client.guilds.cache.get(packet.d.guild_id);
                        if(!guild) return;
                        const member = guild.members.cache.get(packet.d.user_id) || guild.members.fetch(d.user_id).catch(() => {});
                        if(!member) return;
                        const channel = s4d.client.channels.cache.get(packet.d.channel_id);
                        if(!channel) return;
                        const message = channel.messages.cache.get(packet.d.message_id) || await channel.messages.fetch(packet.d.message_id).catch(() => {});
                        if(!message) return;
                        s4d.client.emit(packet.t, guild, channel, message, member, packet.d.emoji.name);
                    }
                });
                s4d.client.on('message', async (s4dmessage) => {
  if ((s4dmessage.content) == 'am!help') {
    s4dmessage.channel.send(
            {
                embed: {
                    title: 'Hilfe zu AM-36',
                    color: '#ffffff',
                    image: { url: null },

                    description: (['**AM-36 ist der offizielle Auto-Message Bot des Servers AncientUnity.net**','\n','Mit AM-36 könnt ihr den Bot die Autowerbung von AncientUnity.net als Embed senden.','\n','`am!addauto` Aktiviert die Auto-Message in dem Channel, in den die Nachricht gesendet wurde.','\n','`am!removeauto` Deaktviert die Auto-Message in dem Channel, in den die Nachricht gesendet wurde.','\n'].join('')),
                    footer: { text: '© Avenue, 2021' },
                    thumbnail: { url: null }

                }
            }
        );
  }

});

s4d.client.login('ODYyNzMwMjMyODkyNzUxOTI0.YOcmJA.XA0iCOxOG0f2-D_DoFTZXHaD3Kw').catch((e) => { s4d.tokenInvalid = true; s4d.tokenError = e; });

s4d.client.on('ready', async () => {

          while(s4d.client && s4d.client.token) {
              await delay(50);
                s4d.client.user.setActivity(String((['auf ',s4d.client.guilds.cache.size,' Server/n!'].join(''))));
    await delay(Number(6)*1000);
    s4d.client.user.setActivity(String('auf AncientUnity.net'));
    await delay(Number(6)*1000);
    s4d.client.user.setActivity(String('made by Λ V Ξ N U Ξ#4493 with ❤'));
    await delay(Number(6)*1000);
    s4d.client.user.setActivity(String('Lunar Client 1.8.9'));
    await delay(Number(6)*1000);
    s4d.client.user.setActivity(String('Prefix: am!'));
    await delay(Number(6)*1000);

              console.log('ran')
          }

});

s4d.client.on('message', async (s4dmessage) => {
  if ((s4dmessage.content) == 'am!addauto') {
    s4dmessage.channel.send(String('Auto-Message wurde erfolgreich zu diesem Channel hinzugefügt!'));
    while (!((s4dmessage.content) == 'am!removeauto')) {
      s4dmessage.channel.send(
              {
                  embed: {
                      title: null,
                      color: '#ffffff',
                      image: { url: null },

                      description: (['🧬 | ᗩᑎᑕIEᑎTᑌᑎITY.ᑎET | 🧬','\n','\n','〘═════════«◇»═════════〙','\n','\n','> Viele nette und aktive Mitglieder','\n','\n','> Sehr viele Giveaways','\n','\n','> Self Promotion','\n','\n','> Ein Nitro-Giveaway ab 100 Membern','\n','\n','> Eigener Join/Leave Plugin','\n','\n','> Invite-Shop','\n','\n','> Eigener 12GB RAM Minecraft-Server','\n','\n','> Und vieles mehr!','\n','\n','〘═════════«◇»═════════〙','\n','\n','⌠ 📰 Einladung: https://discord.gg/tpbhh9euFm ⌡','\n','⌠ 🎥 GIF: https://cdn.discordapp.com/attachments/861661855202279430/861958108687499304/standard.gif ⌡'].join('')),
                      footer: { text: '© Avenue, 2021' },
                      thumbnail: { url: null }

                  }
              }
          );
      await delay(Number(21600)*1000);
    }
  }

});

s4d.client.on('message', async (s4dmessage) => {
  if ((s4dmessage.content) == 'am!removeauto') {
    s4dmessage.channel.send(String('Auto-Message wurde erfolgreich geremoved!'));
  }

});

                s4d;
            