import { Client, Events, GatewayIntentBits } from 'discord.js'
import vueInit from '@/core/vue'
import dotenv from 'dotenv'
import { loadCommands, loadEvents } from '@/core/loader'
import { useAppStore } from '@/store/app'
import fs from 'fs';
import { MagnitudeLevel, DepthLevel, IntensityLevel } from './commands/earthquake'
import express from 'express'

vueInit()
dotenv.config()

//建立 Express 網頁伺服器（防 Render 休眠）
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('OK');
});

app.listen(PORT, () => {
    console.log(`Web 伺服器已成功監聽 Port: ${PORT}`);
});

loadCommands()
const client = new Client({  
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent 
    ]  
})

const appStore = useAppStore()
appStore.client = client
loadEvents()

const starting_timestamp = new Date(now);
const filePath = 'src/commands/variables.json';
const readVariables = (type) => {
    try {
        if (!fs.existsSync(filePath)) return {};
        const data = fs.readFileSync(filePath, 'utf-8');
        return data.trim() ? JSON.parse(data)[type] || {} : {};
    } catch (error) {
        console.error('讀取 JSON 檔案時發生錯誤：', error);
        return {};
    }
};

const writeVariables = (type, key, value) => {
    try {
        let jsonObject = {};
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf-8');
            if (data.trim()) jsonObject = JSON.parse(data);
        }
        
        if (!jsonObject[type]) jsonObject[type] = {};
        
        // 使用動態鍵名 [key] 來寫入不同的欄位
        jsonObject[type][key] = value; 
        
        fs.writeFileSync(filePath, JSON.stringify(jsonObject, null, 4), 'utf-8');
        return true;
    } catch (error) {
        console.error(`寫入欄位 ${key} 時發生錯誤：`, error);
        return false;
    }
};

client.once('ready', () => { 
    client.user.setPresence({                   
        status: 'idle',
    });
    let channels = [];
    channels[0] = client.channels.cache.get('1242787299511500840');
    channels[1] = client.channels.cache.get('1251476252393476119');
    setInterval(async () => {
            try {
                const response = await fetch(`https://opendata.cwa.gov.tw/api/v1/rest/datastore/E-A0015-001?Authorization=CWB-427B7265-DE60-4C1F-8AD0-4E7509C741D1&format=JSON`);
                const data = await response.json();
        
                if (data.success === 'true') {
                    let lastnumber = readVariables('IDs').earthquake_ID;
                    const earthquakeInfo = data.records.Earthquake;
                    const lastReportTime = new Date(earthquakeInfo[0].EarthquakeInfo.OriginTime);
                    const report = earthquakeInfo[0];
                    const magnitude = report.EarthquakeInfo.EarthquakeMagnitude.MagnitudeValue;
                    const number = report.EarthquakeNo;
                    const depth = report.EarthquakeInfo.FocalDepth;
                    const location = report.EarthquakeInfo.Epicenter.Location;
                    const reportContent = report.ReportContent;
                    const reportUrl = report.Web;
                    const imageUrl = report.ReportImageURI;
                    if(number != lastnumber){
                        const areatable = [];
                        let index = 0;
                        let values = [];
                        values[0] = MagnitudeLevel(magnitude);
                        values[1] = DepthLevel(depth);
                        console.log(`value : ${values[1]}`);
                        let field = [
                            {
                            name: `地點`,
                            value: `${location}`,
                            inline: false
                            },
                            {
                            name: `地震規模 ${values[0].image}`,
                            value: `> 芮氏${magnitude}\n> ${values[0].level}`,
                            inline: true
                            },
                            {
                            name: `地震深度 ${values[1].image}`,
                            value: `> ${depth}公里\n> ${values[1].level}`,
                            inline: true
                            },
                        ];
                        for(let i=0; i<20; i++){
                            try{
                                let area = data.records.Earthquake[0].Intensity.ShakingArea[i].AreaDesc;
                                console.log(`result${i+1} : ${area}`);
                                if(area.includes('最大震度')) {
                                    areatable[index] = report.Intensity.ShakingArea[i];
                                    index += 1;
                            }
                            }catch(error){
                                console.log(`result${i+1} : ${error}`);
                            }
                        }
                        areatable.sort((a, b) => {
                            const intensityA = parseFloat(a.AreaIntensity.match(/\d+/)[0]);
                            const intensityB = parseFloat(b.AreaIntensity.match(/\d+/)[0]);
                            return intensityA - intensityB;
                        });
                        values[2] = IntensityLevel(areatable[index-1].AreaIntensity);
                        console.log(areatable);
                        let newfield = {name: `最大震度 ${values[2].image}`,value: `> ${areatable[index-1].AreaIntensity}\n> ${values[2].level}`,inline: true};
                        field.push(newfield);
                        for(let i=index-1; i>=0; i--){
                            newfield = { name: `${areatable[i].AreaDesc}`, value: `${areatable[i].CountyName}`, inline: false};
                            field.push(newfield);
                        }
                        for(let i=0; i<channels.length; i++){
                            await channels[i].send({
                                embeds: [
                                {   
                                author: {
                                    name: '中央氣象局',
                                    iconURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/ROC_Central_Weather_Bureau.svg/1200px-ROC_Central_Weather_Bureau.svg.png'
                                },
                                type: 'rich',
                                title: `**地震報告 #${number}**`,
                                url: reportUrl,
                                description: `${reportContent}`,
                                fields: field,
                                color: values[2].color,
                                image: { 
                                    url: imageUrl
                                },
                                footer: {
                                    text: `powered by @pinjim0407`
                                },
                                timestamp: lastReportTime,
                                },
                            ]});
                        }
                        lastnumber = number;
                        writeVariables('IDs', 'earthquake_ID', lastnumber);
                    }
                }
                else {
                        console.error(error);
                }
            }catch (error) {
                console.error(error);
            }
    }, 5000);
    // 1. 在主程式最外層（或事件外），宣告全域的開機時間常數
// 這樣做每次重啟機器人都會自動精確刷新，完全不需要存進 variables.json！
const startTimeObj = new Date();
const starting_timestamp = startTimeObj.toLocaleString('zh-TW', { timeZone: 'Asia/Taipei', hour12: false });

// ... 您的其他 client.on('ready') 等程式碼 ...

    setInterval(async () => {
        try {
            const used_temp = process.memoryUsage().heapUsed / 1024 / 1024;
            const used = Math.round(used_temp * 100) / 100;

            const status_channel = client.channels.cache.get('1550923188664406198');
            if (!status_channel) return console.error('找不到指定的狀態頻道！');

            const now = Date.now();
            const latest_time_str = new Date(now).toLocaleString('zh-TW', { timeZone: 'Asia/Taipei', hour12: false });
            
            const diffMs = now - startTimeObj.getTime();
            const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
            const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
            const uptime_str = `${diffDays}天 ${diffHours}時 ${diffMins}分`;

            writeVariables('timestamps', 'latest_timestamp', latest_time_str);

            const status_embed = [{
                "title": "機器人運行狀態",
                "description": `**記憶體用量**\n> ${used} MB\n\n**開機時間**\n> ${starting_timestamp}\n\n**狀態更新時間**\n> ${latest_time_str}\n\n**運行時間**\n> ${uptime_str}`,
                "color": 2326507,
                "fields": [],
                "url": "https://onrender.com",
                "footer": {
                    "text": "powered by @pinjim0407"
                }
            }];

            const targetMsgId = readVariables('IDs').bot_status_MSG_ID;
            let isUpdated = false;

            if (targetMsgId) {
                try {
                    const existingMsg = await status_channel.messages.fetch(targetMsgId);
                    await existingMsg.edit({ embeds: status_embed });
                    isUpdated = true;
                } catch (error) {
                    if (error.code !== 10008) {
                        console.error('獲取狀態訊息時發生非預期錯誤:', error);
                    }
                }
            }

            if (!isUpdated) {
                const newMsg = await status_channel.send({ embeds: status_embed });
                writeVariables('IDs', 'bot_status_MSG_ID', newMsg.id);
            }

        } catch (globalError) {
            console.error('計時器執行狀態更新時發生嚴重錯誤:', globalError);
        }
    }, 10000);

});

client.on('messageCreate', message => {
    if(message.author.bot) return;
    const prefix = '!';
    if(message.content.includes(prefix+`repeat`)){
        message.delete();
        message.channel.send(`${message.content.substring(8)}`);
    }
    if(message.content.includes(`fbk你說呢`)||message.content.includes(`FBK你說呢`)||message.content.includes(`fbk怎麼說`)||message.content.includes(`FBK怎麼說`)){
        let gif;
        const result = Math.floor(Math.random()*2);
        if(result === 0) gif = `https://tenor.com/bVogn.gif`;
        else if(result === 1) gif = `https://tenor.com/bzWZZ.gif`;
        message.reply(gif);
    }
});

client.login(process.env.TOKEN)