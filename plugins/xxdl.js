
import { xnxxSearch, xnxxdl } from '../lib/scraper.js';



let handler = async (m, { conn, args, text, usedPrefix, command }) => {
  let chat = global.db.data.chats[m.chat];
  if (!chat.nsfw) throw `🚫 මේ ගෲප් එකේ NSFW on කරල නෑ.\n\nඔන් කරපම් බලන් ඉන්නෙ`;
  let user = global.db.data.users[m.sender].age;
  if (user < 18) throw `❎ උබ තාම පොඩී.`;
  if (!text) throw `✳️ බකමූණෙක් වගේ බලන් ඉන්නෙ,\nඋබට ඕනෙ දේ ගනිම්`;
  m.react('👅');

  let url;
  try {
    url = new URL(text);
  } catch (error) {
    url = null;
  }

  if (url) {
    try {
      const files = await xnxxdl(url.href);
      if (files && files.high) {
        conn.sendFile(
          m.chat,
          files.high,
          'video.mp4',
          'xɴxx ᴅᴏᴡɴʟᴏᴀᴅᴇʀ ʙʏ ꜱɪͣᴛʜͫᴜ\nᴘᴏᴡᴇʀᴅ ʙʏ ᴋᴀʟɪ ᴏꜰᴄ',
          m
        );
        m.react('✅');
      } else {
        m.reply('🔴 Error: Failed to retrieve the download URL.');
      }
    } catch (e) {
      console.error(e);
      m.reply('🔴 Error: We encountered a problem while processing the request.');
    }
  } else {
    try {
      const results = await xnxxSearch(text);
      if (results.length > 0) {
        const message = results.map((r, i) => `${i + 1}. [${r.title}](${r.link})`).join('\n');
        m.reply(message, null, {
          contextInfo: {
            mentionJid: conn.parseMention(message),
          },
        });
      } else {
        m.reply('🔴 Error: No search results found.');
      }
    } catch (e) {
      console.error(e);
      m.reply('🔴 Error: We encountered a problem while processing the request.');
    }
  }
};

handler.help = ['xnxx'];
handler.tags = ['nsfw', 'premium'];
handler.command = ['xnxxsearch', 'xnxxdl', 'xnxx'];
handler.group = true;
handler.premium = false;
handler.register = true;

export default handler;
