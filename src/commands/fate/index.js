import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, SlashCommandBuilder } from 'discord.js';
import { errorMessages } from 'vue/compiler-sfc';

export const command = new SlashCommandBuilder()
    .setName('運勢')
    .setDescription('來一次運勢抽籤')
    .addStringOption(option =>
        option.setName('description')
            .setDescription('詳細內容')
            .setRequired(false));

export const action = async(ctx) => {
    try{ 
        const ctxTime = new Date();
        const description = ctx.options.getString('description');
        const ticket = [
            {color: 0xFF0000, image: `https://media.discordapp.net/attachments/1060629545398575255/1061606322669375488/b19b167c25153070.png?ex=666e22af&is=666cd12f&hm=e1a56b9f12446822371c4658427f0e97ad78431ed2c4b18f3ba504b823582ef9&=&format=webp&quality=lossless&width=467&height=701`},
            {color: 0xFFA500, image: `https://media.discordapp.net/attachments/1060629545398575255/1061606323072016425/fc153eed67bb4352.png?ex=666e22af&is=666cd12f&hm=711391682388729bc0fc8811cb2a19448ff5b208503ab06db95cf88896cd2253&=&format=webp&quality=lossless&width=467&height=701`},
            {color: 0xFFFF00, image: `https://media.discordapp.net/attachments/1060629545398575255/1061606324581957654/02ad72c0e1b010ae.png?ex=666e22af&is=666cd12f&hm=1ce013a415b072815174c0788a5fa244d427af5f2a569bc6b39b44fa80921b00&=&format=webp&quality=lossless&width=467&height=701`},
            {color: 0x00FF00, image: `https://media.discordapp.net/attachments/1060629545398575255/1061606323755679854/14f90937d37a93a9.png?ex=666e22af&is=666cd12f&hm=db8323c646a057502db6da23074fb10928e41270872e2936e7da90ad712d8270&=&format=webp&quality=lossless&width=467&height=701`},
            {color: 0x0000FF, image: `https://media.discordapp.net/attachments/1060629545398575255/1061606325030768651/4a6d3beaad1cf7d7.png?ex=666e22af&is=666cd12f&hm=6d1fc3bd1a23d4a4d28f7aac8cccf6f9a35be33ea686be990030e087291c5fe0&=&format=webp&quality=lossless&width=467&height=701`},
            {color: 0x800080, image: `https://media.discordapp.net/attachments/1060629545398575255/1061606324204478534/b9ba505202ec1768.png?ex=666e22af&is=666cd12f&hm=61ba9fe964bc454ca66fdb064d8e5b5b2dfe48a9220a4d6bb2851003e537906f&=&format=webp&quality=lossless&width=467&height=701`},
        ];
        const random = Math.floor(Math.random()*ticket.length);
        let title;
        if(description === null) title = `${ctx.user.username}的運勢`;
        else if(description != null) title = `${ctx.user.username}${description}的運勢`;
        await ctx.reply({
            embeds: [
                {
                    type: 'rich',
                    title: title,
                    description: ``,
                    color: ticket[random].color,
                    image: {
                        url: ticket[random].image,
                    },
                    timestamp: ctxTime.toISOString(),
                    footer: {
                        text: 'powered by @pinjim0407'
                    },
                }
            ] 
        });
    }catch(error){
        console.log(error);
        await ctx.reply(`抽籤錯誤\n錯誤代號 : ${error}`);
    }
}