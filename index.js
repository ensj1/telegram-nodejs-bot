import { Telegraf } from 'telegraf'
import dotenv from 'dotenv';

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply(`Welcome 👋\\! \nI can help you to send the message to admins\\. 
In the middle way feel free to use \`/unwrap\` command which helps you to anonymize your tiktok links`, {
    parse_mode: 'MarkdownV2'
}));
bot.help((ctx) => ctx.reply('This bot can send your msg to admins'));

bot.hears('hi', (ctx) => ctx.reply('Hey there'));

bot.command('quit', async (ctx) => {
    // Explicit usage
    await ctx.telegram.leaveChat(ctx.message.chat.id).then(async () => {
        await ctx.telegram.sendMessage(ctx.message.chat.id, `Bye 👋`);
    }).catch(async (err) => {
        await ctx.telegram.sendMessage(ctx.message.chat.id, `🔑 Sorry cannot leave private chat`);
        console.log(err);
    })
});

bot.command('msg', async (ctx) => {
    await ctx.telegram.sendMessage(ctx.message.chat.id, `Sending your msg to admins...`);
    //const messageText = ctx.message.text.replace('/unwrap', '').trim();
    await ctx.telegram.sendMessage(ctx.message.chat.id, 'Sorry the bot does not work now');
});

bot.command('unwrap', async (ctx) => {
    const resp = await fetch(ctx.payload);
    const anonymUrl = resp.url.split('?')[0]
    await ctx.telegram.sendMessage(ctx.message.chat.id, `Unwrapped url is \`${anonymUrl}\``);
});

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));