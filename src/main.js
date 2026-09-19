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
    setInterval(async () => {
        try {
            // 1. 計算記憶體用量 (MB)
            const used_temp = process.memoryUsage().heapUsed / 1024 / 1024;
            const used = Math.round(used_temp * 100) / 100;

            // 2. 獲取頻道
            const status_channel = client.channels.cache.get('1550923188664406198');
            if (!status_channel) return console.error('找不到指定的狀態頻道！');

            // 3. 讀取與計算時間資訊
            const starting_timestamp = readVariables('timestamps').starting_timestamp; // 預期為開機時的 Date.now() 或秒數
            const now = Date.now();
            
            // 自動生成當前的狀態更新時間文字 (格式: 2026/09/20 02:12:00)
            const latest_time_str = new Date(now).toLocaleString('zh-TW', { timeZone: 'Asia/Taipei', hour12: false });

            // 自動計算精確的運行時間 (從開機到現在)
            let uptime_str = "計算中...";
            if (starting_timestamp) {
                const diffMs = now - new Date(starting_timestamp).getTime();
                const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
                const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
                uptime_str = `${diffDays}天 ${diffHours}時 ${diffMins}分`;
            }

            // 4. 更新 JSON 中的最新時間紀錄（非必要，但配合您原本的變數讀取）
            writeVariables('timestamps', 'latest_timestamp', latest_time_str);

            // 5. 建立嵌入訊息物件
            const status_embed = [{
                "title": "機器人運行狀態",
                "description": `**記憶體用量**\n> ${used} MB\n\n**開機時間**\n> ${starting_timestamp || '未知'}\n\n**狀態更新時間**\n> ${latest_time_str}\n\n**運行時間**\n> ${uptime_str}`,
                "color": 2326507,
                "fields": [],
                "author": {
                    "icon_url": "https://media.discordapp.net/attachments/1251511632941547530/1550924562173272145/image.png?ex=6ab01a8e&is=6aaec90e&hm=79b690eefd2b22b85cd086d81061016cb280a67700a67385bcdd204cd826761c&=&format=webp&quality=lossless",
                    "name": "白上フブキ",
                    "url": "https://www.youtube.com/@ShirakamiFubuki"
                },
                "url": "https://fubuki-djs.onrender.com/",
                "footer": {
                    "text": "powered by @pinjim0407"
                }
            }];

            // 6. 🔥 核心邏輯：檢查、修改或重新傳送
            const targetMsgId = readVariables('IDs').bot_status_MSG_ID;
            let isUpdated = false;

            if (targetMsgId) {
                try {
                    // 嘗試從頻道中獲取該則訊息
                    const existingMsg = await status_channel.messages.fetch(targetMsgId);
                    // 成功找到，直接修改（Edit）
                    await existingMsg.edit({ embeds: status_embed });
                    isUpdated = true;
                } catch (error) {
                    // 錯誤碼 10008 代表訊息被手動刪除了
                    if (error.code !== 10008) {
                        console.error('獲取狀態訊息時發生非預期錯誤:', error);
                    }
                }
            }

            // 如果過去沒有紀錄 ID，或者舊訊息不見了（被刪除），就發送全新訊息
            if (!isUpdated) {
                const newMsg = await status_channel.send({ embeds: status_embed });
                // 把新產生的訊息 ID 紀錄回 JSON 檔案中，下次就能用 edit 的
                writeVariables('IDs', 'bot_status_MSG_ID', newMsg.id);
            }

        } catch (globalError) {
            console.error('計時器執行狀態更新時發生嚴重錯誤:', globalError);
        }
    }, 30000);
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