import { Telegraf } from 'telegraf'
import { message } from 'telegraf/filters'
import dotenv from 'dotenv';

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply('Welcome'))
bot.help((ctx) => ctx.reply('This bot can send your msg to admins'))

bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.command('quit', async (ctx) => {
    // Explicit usage
    await ctx.telegram.leaveChat(ctx.message.chat.id).then(async () => {
        await ctx.telegram.sendMessage(ctx.message.chat.id, `Bye 👋`);
    }).catch(async (err) => {
        await ctx.telegram.sendMessage(ctx.message.chat.id, `🔑 Sorry cannot leave private chat`);
        console.log(err);
    })

    // Using context shortcut
    await ctx.leaveChat();
})

bot.command('msg', async (ctx) => {

    await ctx.telegram.sendMessage(ctx.message.chat.id, `Sending your msg to admins...`);

    //await ctx.telegram.sendMessage(ctx.message.chat.id, `${ctx.message.text}`);
    await ctx.telegram.sendMessage(ctx.message.chat.id, 'Sorry the bot does not work now');
})
// bot.command('help', async (ctx) => {
//     // Explicit usage
//     await ctx.telegram.sendMessage(ctx.message.chat.id, `This bot can send your msg to admins`);

// })

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))