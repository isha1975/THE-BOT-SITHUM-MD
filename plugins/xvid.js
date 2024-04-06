import { xvideosSearch, xvideosdl } from '../lib/scraper.js';

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
  let chat = global.db.data.chats[m.chat];
  if (!chat.nsfw) throw `🚫 මේ ගෲප් එකේ NSFW on කරල නෑ.\n\nඔන් කරපම් බලන් ඉන්නෙ`;
  let user = global.db.data.users[m.sender].age;
  if (user < 18) throw `❎ උබ තාම පොඩී.`;
  if (!text) throw `✳️ බකමූණෙක් වගේ බලන් ඉන්නෙ,\nඋබට ඕනෙ දේ ගනිම්`;

  m.react('👅');
    if (!text) throw 'Url එකක් දීපම්.';
  
    // Check if the input is a valid Xvideos URL
    const isURL = /^(https?:\/\/)?(www\.)?xvideos\.com\/.+$/i.test(text);
  
    try {
      if (isURL) {
        // If it's a valid URL, directly download the video
        const result = await xvideosdl(text);
        const { title, url } = result.result;
  
        // Send the video file
        const response = await fetch(url);
        const buffer = await response.arrayBuffer();
  
        conn.sendFile(
          m.chat,
          Buffer.from(buffer),
          `video.mp4`,
          `*xᴠɪᴅᴇᴏꜱ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ ʙʏ ꜱɪͣᴛʜͫᴜ*\n*ᴘᴏᴡᴇʀᴅ ʙʏ ᴋᴀʟɪ ᴏꜰᴄ*`
        );
  
      } else {
        // If it's not a valid URL, perform a search and display the search results
        const results = await xvideosSearch(text);
        if (results.length === 0) {
          m.reply('එහෙම එකක් නෑ.');
        } else {
          const searchResults = results.map((result, index) => {
            return `${index + 1}. *${result.title}*\nDuration: ${result.duration}\nQuality: ${result.quality}\nURL: ${result.url}`;
          }).join('\n\n');
  
          m.reply(`*Search Results for "${text}":*\n\n${searchResults}`);
        }
      }
    } catch (error) {
      console.error(error);
      throw '❗දෝෂයක් ඇති විය.';
    }
  };

  handler.help = ['xvid']
  handler.tags = ['nsfw']
handler.command = ['xvid'];
handler.group = true;
handler.premium = false;
handler.register = true;

handler.premium = false;

export default handler;
