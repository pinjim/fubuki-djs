import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, Embed, SlashCommandBuilder } from 'discord.js';

export const command = new SlashCommandBuilder()
    .setName('素材')
    .setDescription('計算練等級素材')
    .addIntegerOption(option =>
        option.setName('rarity')
           .setDescription('稀有度')
           .setRequired(true)
           .addChoices(
               { name: '★1', value: 1 },
               { name: '★2', value: 2 },
               { name: '★3', value: 3 },
               { name: '★4', value: 4 },
               { name: '★5', value: 5 },
       ))
    .addIntegerOption(option =>
        option.setName('level')
            .setDescription('目前等級')
            .setRequired(true))
    .addIntegerOption(option =>
        option.setName('target')
            .setDescription('目標等級')
            .setRequired(true))
    .addIntegerOption(option =>
        option.setName('next')
            .setDescription('距離下級還需多少經驗')
            .setRequired(false));
    
const experience = [
    {lv: 0, exp: 0},
    {lv: 1, exp: 0},
    {lv: 2, exp: 100},
    {lv: 3, exp: 400},
    {lv: 4, exp: 1000},
    {lv: 5, exp: 2000},
    {lv: 6, exp: 3500},
    {lv: 7, exp: 5600},
    {lv: 8, exp: 8400},
    {lv: 9, exp: 12000},
    {lv: 10, exp: 16500},
    {lv: 11, exp: 22000},
    {lv: 12, exp: 28600},
    {lv: 13, exp: 36400},
    {lv: 14, exp: 45500},
    {lv: 15, exp: 56000},
    {lv: 16, exp: 68000},
    {lv: 17, exp: 81600},
    {lv: 18, exp: 96900},
    {lv: 19, exp: 114000},
    {lv: 20, exp: 133000},
    {lv: 21, exp: 154000},
    {lv: 22, exp: 177100},
    {lv: 23, exp: 202400},
    {lv: 24, exp: 230000},
    {lv: 25, exp: 260000},
    {lv: 26, exp: 292500},
    {lv: 27, exp: 327600},
    {lv: 28, exp: 365400},
    {lv: 29, exp: 406000},
    {lv: 30, exp: 449500},
    {lv: 31, exp: 496000},
    {lv: 32, exp: 545600},
    {lv: 33, exp: 598400},
    {lv: 34, exp: 654500},
    {lv: 35, exp: 714000},
    {lv: 36, exp: 777000},
    {lv: 37, exp: 843600},
    {lv: 38, exp: 913900},
    {lv: 39, exp: 988000},
    {lv: 40, exp: 1066000},
    {lv: 41, exp: 1148000},
    {lv: 42, exp: 1234100},
    {lv: 43, exp: 1324400},
    {lv: 44, exp: 1419000},
    {lv: 45, exp: 1518000},
    {lv: 46, exp: 1621500},
    {lv: 47, exp: 1729600},
    {lv: 48, exp: 1842400},
    {lv: 49, exp: 1960000},
    {lv: 50, exp: 2082500},
    {lv: 51, exp: 2210000},
    {lv: 52, exp: 2342600},
    {lv: 53, exp: 2480400},
    {lv: 54, exp: 2623500},
    {lv: 55, exp: 2772000},
    {lv: 56, exp: 2926000},
    {lv: 57, exp: 3085600},
    {lv: 58, exp: 3250900},
    {lv: 59, exp: 3422000},
    {lv: 60, exp: 3599000},
    {lv: 61, exp: 3782000},
    {lv: 62, exp: 3971100},
    {lv: 63, exp: 4166400},
    {lv: 64, exp: 4368000},
    {lv: 65, exp: 4576000},
    {lv: 66, exp: 4790500},
    {lv: 67, exp: 5011600},
    {lv: 68, exp: 5239400},
    {lv: 69, exp: 5474000},
    {lv: 70, exp: 5715500},
    {lv: 71, exp: 5964000},
    {lv: 72, exp: 6219600},
    {lv: 73, exp: 6482400},
    {lv: 74, exp: 6752500},
    {lv: 75, exp: 7030000},
    {lv: 76, exp: 7315000},
    {lv: 77, exp: 7607600},
    {lv: 78, exp: 7907900},
    {lv: 79, exp: 8216000},
    {lv: 80, exp: 8532000},
    {lv: 81, exp: 8856000},
    {lv: 82, exp: 9188100},
    {lv: 83, exp: 9528400},
    {lv: 84, exp: 9877000},
    {lv: 85, exp: 10234000},
    {lv: 86, exp: 10599500},
    {lv: 87, exp: 10973600},
    {lv: 88, exp: 11356400},
    {lv: 89, exp: 11748000},
    {lv: 90, exp: 12148500},
    {lv: 91, exp: 12567000},
    {lv: 92, exp: 13021900},
    {lv: 93, exp: 13532000},
    {lv: 94, exp: 14116500},
    {lv: 95, exp: 14795000},
    {lv: 96, exp: 15587500},
    {lv: 97, exp: 16514400},
    {lv: 98, exp: 17596500},
    {lv: 99, exp: 18855000},
    {lv: 100, exp: 20311500},
    {lv: 101, exp: 40623000},
    {lv: 102, exp: 60934500},
    {lv: 103, exp: 81246000},
    {lv: 104, exp: 101557500},
    {lv: 105, exp: 121869000},
    {lv: 106, exp: 142180500},
    {lv: 107, exp: 162492000},
    {lv: 108, exp: 182803500},
    {lv: 109, exp: 203115000},
    {lv: 110, exp: 223426500},
    {lv: 111, exp: 243738000},
    {lv: 112, exp: 264049500},
    {lv: 113, exp: 284361000},
    {lv: 114, exp: 304672500},
    {lv: 115, exp: 324984000},
    {lv: 116, exp: 345295500},
    {lv: 117, exp: 365607000},
    {lv: 118, exp: 385918500},
    {lv: 119, exp: 406230000},
    {lv: 120, exp: 426541500}
];

export const UpgradeCalculation = (rarity, level, target) => {
    const ascensionLevels = {
        1: [20, 30, 40, 50],
        2: [25, 35, 45, 55],
        3: [30, 40, 50, 60],
        4: [40, 50, 60, 70],
        5: [50, 60, 70, 80]
    };
    const grailLevels = {
        1: [70, 75, 80, 85, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120],
        2: [70, 75, 80, 85, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120],
        3: [75, 80, 85, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120],
        4: [85, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120],
        5: [92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120]
    };

    let ascensions = 0;
    let grails = 0;
    let progress = {};

    // 計算靈基再臨次數並記錄狀態
    for (let i = 0; i < ascensionLevels[rarity].length; i++) {
        let ascensionLevel = ascensionLevels[rarity][i];
        if (level < ascensionLevel && target >= ascensionLevel) {
            ascensions++;
            progress[`${i+1}`] = true;
        } else {
            progress[`${i+1}`] = false;
        }
    }

    // 計算聖杯轉臨次數並記錄狀態
    for (let i = 0; i < grailLevels[rarity].length; i++) {
        let grailLevel = grailLevels[rarity][i];
        if (level < grailLevel && target >= grailLevel) {
            grails++;
            progress[`${grailLevel}`] = true;
        } else {
            progress[`${grailLevel}`] = false;
        }
    }

    return {
        ascensions: ascensions,
        grails: grails,
        progress: progress
    };
}

export const SFeedCalculation = (level, target, next) => {
    const feed = 97200;
    const offset = experience[target].exp - experience[level].exp + next;
    const result = Math.floor(offset / feed)+1;
    return result;
}

export const NFeedCalculation = (level, target, next) => {
    const feed = 81000;
    const offset = experience[target].exp - experience[level].exp + next;
    const result = Math.floor(offset / feed)+1;
    return result;
}

export const SQpCalculation = (rarity, level, target, next, progress) => {
    console.log(`\n同職階 : `);
    let feedqp = 0;
    let upgradeqp = 0;
    let feedcount = 0;
    let upgradeqpmap = {};
    let maxlevel = [];
    let maxindex = 0;
    let minindex = 0;
    let expnow = 0;
    let feedusage = 0;
    let lv = 1;
    let expset = 97200;
    switch(rarity){
        case 1:
            maxlevel = [0, 20, 30, 40, 50, 60, 70, 75, 80, 85, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120]; 
            maxindex = maxlevel.findIndex(value => value >= target);
            minindex = maxlevel.findIndex(value => value >= level)-1;
            expnow = 0;
            lv = 1;
            if(target != maxlevel[maxindex]){
                maxlevel.splice(maxindex, 1, target);
            }
            if(level != maxlevel[minindex]){
                maxlevel.splice(minindex, 1, level);
            }
            for (let i = minindex; i < maxindex; i++) {
                let qpsaver = 0;
                feedcount = SFeedCalculation(maxlevel[i], maxlevel[i + 1], next);
                feedusage += feedcount;
                let j = 1;
                while(feedcount>=20){
                    qpsaver += (70 + (30 * (lv))) * 20;
                    feedcount-=20;
                    expnow += 20*expset;
                    lv = experience.findIndex(value => value.exp > expnow)-1;
                    j+=1;
                }
                qpsaver += (70 + (30 * lv)) * feedcount;
                expnow += feedcount*expset;
                lv = experience.findIndex(value => value.exp > expnow)-1;
                feedqp += qpsaver;
                console.log(`${maxlevel[i]}->${maxlevel[i + 1]}，使用QP : ${qpsaver}，累積QP : ${feedqp}`);
            }
            upgradeqpmap = {
                '1': 10000,
                '2': 30000,
                '3': 90000,
                '4': 300000,
                '70': 400000,
                '75': 600000,
                '80': 800000,
                '85': 1000000,
                '90': 2000000,
                '92': 3000000,
                '94': 4000000,
                '96': 5000000,
                '98': 6000000,
                '100': 7000000,
                '102': 8000000,
                '104': 8000000,
                '106': 8000000,
                '108': 8000000,
                '110': 8000000,
                '112': 8000000,
                '114': 8000000,
                '116': 8000000,
                '118': 8000000,
                '120': 8000000
            };
            for (let index in progress) {
                if(progress[index] === true){
                    upgradeqp += upgradeqpmap[index];
                    console.log(index ,progress[index],upgradeqpmap[index],upgradeqp);
                }
            }
            break;
        case 2:
            maxlevel = [0, 25, 35, 45, 55, 65, 70, 75, 80, 85, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120]; 
            maxindex = maxlevel.findIndex(value => value >= target);
            minindex = maxlevel.findIndex(value => value >= level)-1;
            expnow = 0;
            lv = 1;
            if(target != maxlevel[maxindex]){
                maxlevel.splice(maxindex, 1, target);
            }
            if(level != maxlevel[minindex]){
                maxlevel.splice(minindex, 1, level);
            }
            for (let i = minindex; i < maxindex; i++) {
                let qpsaver = 0;
                feedcount = SFeedCalculation(maxlevel[i], maxlevel[i + 1], next);
                feedusage += feedcount;
                let j = 1;
                while(feedcount>=20){
                    qpsaver += (105 + (45 * (lv))) * 20;
                    feedcount-=20;
                    expnow += 20*expset;
                    lv = experience.findIndex(value => value.exp > expnow)-1;
                    j+=1;
                }
                qpsaver += (105 + (45 * lv)) * feedcount;
                expnow += feedcount*expset;
                lv = experience.findIndex(value => value.exp > expnow)-1;
                feedqp += qpsaver;
                console.log(`${maxlevel[i]}->${maxlevel[i + 1]}，使用QP : ${qpsaver}，累積QP : ${feedqp}`);
            }
            upgradeqpmap = {
                '1': 15000,
                '2': 45000,
                '3': 150000,
                '4': 450000,
                '70': 600000,
                '75': 800000,
                '80': 1000000,
                '85': 2000000,
                '90': 3000000,
                '92': 4000000,
                '94': 5000000,
                '96': 6000000,
                '98': 7000000,
                '100': 8000000,
                '102': 9000000,
                '104': 9000000,
                '106': 9000000,
                '108': 9000000,
                '110': 9000000,
                '112': 9000000,
                '114': 9000000,
                '116': 9000000,
                '118': 9000000,
                '120': 9000000
            };              
            for (let index in progress) {
                if(progress[index] === true){
                    upgradeqp += upgradeqpmap[index];
                }
            }
            break;
        case 3:
            maxlevel = [0, 30, 40, 50, 60, 70, 75, 80, 85, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120]; 
            maxindex = maxlevel.findIndex(value => value >= target);
            minindex = maxlevel.findIndex(value => value >= level)-1;
            expnow = 0;
            lv = 1;
            if(target != maxlevel[maxindex]){
                maxlevel.splice(maxindex, 1, target);
            }
            if(level != maxlevel[minindex]){
                maxlevel.splice(minindex, 1, level);
            }
            for (let i = minindex; i < maxindex; i++) {
                let qpsaver = 0;
                feedcount = SFeedCalculation(maxlevel[i], maxlevel[i + 1], next);
                feedusage += feedcount;
                let j = 1;
                while(feedcount>=20){
                    qpsaver += (140 + (60 * (lv))) * 20;
                    feedcount-=20;
                    expnow += 20*expset;
                    lv = experience.findIndex(value => value.exp > expnow)-1;
                    j+=1;
                }
                qpsaver += (140 + (60 * lv)) * feedcount;
                expnow += feedcount*expset;
                lv = experience.findIndex(value => value.exp > expnow)-1;
                feedqp += qpsaver;
                console.log(`${maxlevel[i]}->${maxlevel[i + 1]}，使用QP : ${qpsaver}，累積QP : ${feedqp}`);
            }
            upgradeqpmap = {
                '1': 30000,
                '2': 100000,
                '3': 300000,
                '4': 900000,
                '75': 1000000,
                '80': 2000000,
                '85': 3000000,
                '90': 4000000,
                '92': 5000000,
                '94': 6000000,
                '96': 7000000,
                '98': 8000000,
                '100': 9000000,
                '102': 10000000,
                '104': 10000000,
                '106': 10000000,
                '108': 10000000,
                '110': 10000000,
                '112': 10000000,
                '114': 10000000,
                '116': 10000000,
                '118': 10000000,
                '120': 10000000
            };
            for (let index in progress) {
                if(progress[index] === true){
                    upgradeqp += upgradeqpmap[index];
                }
            }
            break;
        case 4:
            maxlevel = [0, 40, 50, 60, 70, 75, 80, 85, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120]; 
            maxindex = maxlevel.findIndex(value => value >= target);
            minindex = maxlevel.findIndex(value => value >= level)-1;
            expnow = 0;
            lv = 1;
            if(target != maxlevel[maxindex]){
                maxlevel.splice(maxindex, 1, target);
            }
            if(level != maxlevel[minindex]){
                maxlevel.splice(minindex, 1, level);
            }
            for (let i = minindex; i < maxindex; i++) {
                let qpsaver = 0;
                feedcount = SFeedCalculation(maxlevel[i], maxlevel[i + 1], next);
                feedusage += feedcount;
                let j = 1;
                while(feedcount>=20){
                    qpsaver += (280 + (120 * (lv))) * 20;
                    feedcount-=20;
                    expnow += 20*expset;
                    lv = experience.findIndex(value => value.exp > expnow)-1;
                    j+=1;
                }
                qpsaver += (280 + (120 * lv)) * feedcount;
                expnow += feedcount*expset;
                lv = experience.findIndex(value => value.exp > expnow)-1;
                feedqp += qpsaver;
                console.log(`${maxlevel[i]}->${maxlevel[i + 1]}，使用QP : ${qpsaver}，累積QP : ${feedqp}`);
            }
            upgradeqpmap = {
                '1': 50000,
                '2': 150000,
                '3': 500000,
                '4': 1500000,
                '85': 4000000,
                '90': 5000000,
                '92': 6000000,
                '94': 7000000,
                '96': 8000000,
                '98': 9000000,
                '100': 10000000,
                '102': 12000000,
                '104': 12000000,
                '106': 12000000,
                '108': 12000000,
                '110': 12000000,
                '112': 12000000,
                '114': 12000000,
                '116': 12000000,
                '118': 12000000,
                '120': 12000000
            };
            for (let index in progress) {
                if(progress[index] === true){
                    upgradeqp += upgradeqpmap[index];
                }
            }
            break;
        case 5:
            maxlevel = [0, 50, 60, 70, 80, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120]; //
            maxindex = maxlevel.findIndex(value => value >= target);
            minindex = maxlevel.findIndex(value => value >= level)-1;
            expnow = 0;
            lv = 1;
            if(target != maxlevel[maxindex]){
                maxlevel.splice(maxindex, 1, target);
            }
            if(level != maxlevel[minindex]){
                maxlevel.splice(minindex, 1, level);
            }
            for (let i = minindex; i < maxindex; i++) {
                let qpsaver = 0;
                feedcount = SFeedCalculation(maxlevel[i], maxlevel[i + 1], next);
                feedusage += feedcount;
                let j = 1;
                while(feedcount>=20){
                    qpsaver += (420 + (180 * (lv))) * 20;
                    feedcount-=20;
                    expnow += 20*expset;
                    lv = experience.findIndex(value => value.exp > expnow)-1;
                    j+=1;
                }
                qpsaver += (420 + (180 * lv)) * feedcount;
                expnow += feedcount*expset;
                lv = experience.findIndex(value => value.exp > expnow)-1;
                feedqp += qpsaver;
                console.log(`${maxlevel[i]}->${maxlevel[i + 1]}，使用QP : ${qpsaver}，累積QP : ${feedqp}\n`);
            }
            upgradeqpmap = {
                '1': 100000,
                '2': 300000,
                '3': 1000000,
                '4': 3000000,
                '92': 9000000,
                '94': 10000000,
                '96': 11000000,
                '98': 12000000,
                '100': 13000000,
                '102': 15000000,
                '104': 15000000,
                '106': 15000000,
                '108': 15000000,
                '110': 15000000,
                '112': 15000000,
                '114': 15000000,
                '116': 15000000,
                '118': 15000000,
                '120': 15000000
            };
            for (let index in progress) {
                if(progress[index] === true){
                    upgradeqp += upgradeqpmap[index];
                }
            }
            break;
        default:
            console.log(`error`);
            break;
    }
    console.log(`種火消耗QP : ${feedqp}、再臨消耗QP : ${upgradeqp}\n`);
    return {
        feedqp: feedqp,
        upgradeqp: upgradeqp,
        feedusage: feedusage
    };
}

export const NQpCalculation = (rarity, level, target, next, progress) => {
    console.log(`\n異職階 : `);
    let feedqp = 0;
    let upgradeqp = 0;
    let feedcount = 0;
    let upgradeqpmap = {};
    let maxlevel = [];
    let maxindex = 0;
    let minindex = 0;
    let expnow = 0;
    let feedusage = 0;
    let lv = 1;
    let expset = 81000;
    switch(rarity){
        case 1:
            maxlevel = [0, 20, 30, 40, 50, 60, 70, 75, 80, 85, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120]; 
            maxindex = maxlevel.findIndex(value => value >= target);
            minindex = maxlevel.findIndex(value => value >= level)-1;
            expnow = 0;
            lv = 1;
            if(target != maxlevel[maxindex]){
                maxlevel.splice(maxindex, 1, target);
            }
            if(level != maxlevel[minindex]){
                maxlevel.splice(minindex, 1, level);
            }
            for (let i = minindex; i < maxindex; i++) {
                let qpsaver = 0;
                feedcount = NFeedCalculation(maxlevel[i], maxlevel[i + 1], next);
                feedusage += feedcount;
                let j = 1;
                while(feedcount>=20){
                    qpsaver += (70 + (30 * (lv))) * 20;
                    feedcount-=20;
                    expnow += 20*expset;
                    lv = experience.findIndex(value => value.exp > expnow)-1;
                    j+=1;
                }
                qpsaver += (70 + (30 * lv)) * feedcount;
                expnow += feedcount*expset;
                lv = experience.findIndex(value => value.exp > expnow)-1;
                feedqp += qpsaver;
                console.log(`${maxlevel[i]}->${maxlevel[i + 1]}，使用QP : ${qpsaver}，累積QP : ${feedqp}`);
            }
            upgradeqpmap = {
                '1': 10000,
                '2': 30000,
                '3': 90000,
                '4': 300000,
                '70': 400000,
                '75': 600000,
                '80': 800000,
                '85': 1000000,
                '90': 2000000,
                '92': 3000000,
                '94': 4000000,
                '96': 5000000,
                '98': 6000000,
                '100': 7000000,
                '102': 8000000,
                '104': 8000000,
                '106': 8000000,
                '108': 8000000,
                '110': 8000000,
                '112': 8000000,
                '114': 8000000,
                '116': 8000000,
                '118': 8000000,
                '120': 8000000
            };
            for (let index in progress) {
                if(progress[index] === true){
                    upgradeqp += upgradeqpmap[index];
                    console.log(index ,progress[index],upgradeqpmap[index],upgradeqp);
                }
            }
            break;
        case 2:
            maxlevel = [0, 25, 35, 45, 55, 65, 70, 75, 80, 85, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120]; 
            maxindex = maxlevel.findIndex(value => value >= target);
            minindex = maxlevel.findIndex(value => value >= level)-1;
            expnow = 0;
            lv = 1;
            if(target != maxlevel[maxindex]){
                maxlevel.splice(maxindex, 1, target);
            }
            if(level != maxlevel[minindex]){
                maxlevel.splice(minindex, 1, level);
            }
            for (let i = minindex; i < maxindex; i++) {
                let qpsaver = 0;
                feedcount = NFeedCalculation(maxlevel[i], maxlevel[i + 1], next);
                feedusage += feedcount;
                let j = 1;
                while(feedcount>=20){
                    qpsaver += (105 + (45 * (lv))) * 20;
                    feedcount-=20;
                    expnow += 20*expset;
                    lv = experience.findIndex(value => value.exp > expnow)-1;
                    j+=1;
                }
                qpsaver += (105 + (45 * lv)) * feedcount;
                expnow += feedcount*expset;
                lv = experience.findIndex(value => value.exp > expnow)-1;
                feedqp += qpsaver;
                console.log(`${maxlevel[i]}->${maxlevel[i + 1]}，使用QP : ${qpsaver}，累積QP : ${feedqp}`);
            }
            upgradeqpmap = {
                '1': 15000,
                '2': 45000,
                '3': 150000,
                '4': 450000,
                '70': 600000,
                '75': 800000,
                '80': 1000000,
                '85': 2000000,
                '90': 3000000,
                '92': 4000000,
                '94': 5000000,
                '96': 6000000,
                '98': 7000000,
                '100': 8000000,
                '102': 9000000,
                '104': 9000000,
                '106': 9000000,
                '108': 9000000,
                '110': 9000000,
                '112': 9000000,
                '114': 9000000,
                '116': 9000000,
                '118': 9000000,
                '120': 9000000
            };              
            for (let index in progress) {
                if(progress[index] === true){
                    upgradeqp += upgradeqpmap[index];
                }
            }
            break;
        case 3:
            maxlevel = [0, 30, 40, 50, 60, 70, 75, 80, 85, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120]; 
            maxindex = maxlevel.findIndex(value => value >= target);
            minindex = maxlevel.findIndex(value => value >= level)-1;
            expnow = 0;
            lv = 1;
            if(target != maxlevel[maxindex]){
                maxlevel.splice(maxindex, 1, target);
            }
            if(level != maxlevel[minindex]){
                maxlevel.splice(minindex, 1, level);
            }
            for (let i = minindex; i < maxindex; i++) {
                let qpsaver = 0;
                feedcount = NFeedCalculation(maxlevel[i], maxlevel[i + 1], next);
                feedusage += feedcount;
                let j = 1;
                while(feedcount>=20){
                    qpsaver += (140 + (60 * (lv))) * 20;
                    feedcount-=20;
                    expnow += 20*expset;
                    lv = experience.findIndex(value => value.exp > expnow)-1;
                    j+=1;
                }
                qpsaver += (140 + (60 * lv)) * feedcount;
                expnow += feedcount*expset;
                lv = experience.findIndex(value => value.exp > expnow)-1;
                feedqp += qpsaver;
                console.log(`${maxlevel[i]}->${maxlevel[i + 1]}，使用QP : ${qpsaver}，累積QP : ${feedqp}`);
            }
            upgradeqpmap = {
                '1': 30000,
                '2': 100000,
                '3': 300000,
                '4': 900000,
                '75': 1000000,
                '80': 2000000,
                '85': 3000000,
                '90': 4000000,
                '92': 5000000,
                '94': 6000000,
                '96': 7000000,
                '98': 8000000,
                '100': 9000000,
                '102': 10000000,
                '104': 10000000,
                '106': 10000000,
                '108': 10000000,
                '110': 10000000,
                '112': 10000000,
                '114': 10000000,
                '116': 10000000,
                '118': 10000000,
                '120': 10000000
            };
            for (let index in progress) {
                if(progress[index] === true){
                    upgradeqp += upgradeqpmap[index];
                }
            }
            break;
        case 4:
            maxlevel = [0, 40, 50, 60, 70, 75, 80, 85, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120]; 
            maxindex = maxlevel.findIndex(value => value >= target);
            minindex = maxlevel.findIndex(value => value >= level)-1;
            expnow = 0;
            lv = 1;
            if(target != maxlevel[maxindex]){
                maxlevel.splice(maxindex, 1, target);
            }
            if(level != maxlevel[minindex]){
                maxlevel.splice(minindex, 1, level);
            }
            for (let i = minindex; i < maxindex; i++) {
                let qpsaver = 0;
                feedcount = NFeedCalculation(maxlevel[i], maxlevel[i + 1], next);
                feedusage += feedcount;
                let j = 1;
                while(feedcount>=20){
                    qpsaver += (280 + (120 * (lv))) * 20;
                    feedcount-=20;
                    expnow += 20*expset;
                    lv = experience.findIndex(value => value.exp > expnow)-1;
                    j+=1;
                }
                qpsaver += (280 + (120 * lv)) * feedcount;
                expnow += feedcount*expset;
                lv = experience.findIndex(value => value.exp > expnow)-1;
                feedqp += qpsaver;
                console.log(`${maxlevel[i]}->${maxlevel[i + 1]}，使用QP : ${qpsaver}，累積QP : ${feedqp}`);
            }
            upgradeqpmap = {
                '1': 50000,
                '2': 150000,
                '3': 500000,
                '4': 1500000,
                '85': 4000000,
                '90': 5000000,
                '92': 6000000,
                '94': 7000000,
                '96': 8000000,
                '98': 9000000,
                '100': 10000000,
                '102': 12000000,
                '104': 12000000,
                '106': 12000000,
                '108': 12000000,
                '110': 12000000,
                '112': 12000000,
                '114': 12000000,
                '116': 12000000,
                '118': 12000000,
                '120': 12000000
            };
            for (let index in progress) {
                if(progress[index] === true){
                    upgradeqp += upgradeqpmap[index];
                }
            }
            break;
        case 5:
            maxlevel = [0, 50, 60, 70, 80, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120]; //
            maxindex = maxlevel.findIndex(value => value >= target);
            minindex = maxlevel.findIndex(value => value >= level)-1;
            expnow = 0;
            lv = 1;
            if(target != maxlevel[maxindex]){
                maxlevel.splice(maxindex, 1, target);
            }
            if(level != maxlevel[minindex]){
                maxlevel.splice(minindex, 1, level);
            }
            for (let i = minindex; i < maxindex; i++) {
                let qpsaver = 0;
                feedcount = NFeedCalculation(maxlevel[i], maxlevel[i + 1], next);
                feedusage += feedcount;
                let j = 1;
                while(feedcount>=20){
                    qpsaver += (420 + (180 * (lv))) * 20;
                    feedcount-=20;
                    expnow += 20*expset;
                    lv = experience.findIndex(value => value.exp > expnow)-1;
                    j+=1;
                }
                qpsaver += (420 + (180 * lv)) * feedcount;
                expnow += feedcount*expset;
                lv = experience.findIndex(value => value.exp > expnow)-1;
                feedqp += qpsaver;
                console.log(`${maxlevel[i]}->${maxlevel[i + 1]}，使用QP : ${qpsaver}，累積QP : ${feedqp}\n`);
            }
            upgradeqpmap = {
                '1': 100000,
                '2': 300000,
                '3': 1000000,
                '4': 3000000,
                '92': 9000000,
                '94': 10000000,
                '96': 11000000,
                '98': 12000000,
                '100': 13000000,
                '102': 15000000,
                '104': 15000000,
                '106': 15000000,
                '108': 15000000,
                '110': 15000000,
                '112': 15000000,
                '114': 15000000,
                '116': 15000000,
                '118': 15000000,
                '120': 15000000
            };
            for (let index in progress) {
                if(progress[index] === true){
                    upgradeqp += upgradeqpmap[index];
                }
            }
            break;
        default:
            console.log(`error`);
            break;
    }
    console.log(`種火消耗QP : ${feedqp}、再臨消耗QP : ${upgradeqp}\n`);
    return {
        feedqp: feedqp,
        upgradeqp: upgradeqp,
        feedusage: feedusage
    };
}


export const action = async (ctx) => {
    try{
        const ctxTime = new Date();
        const rarity= ctx.options.getInteger('rarity');
        const level = ctx.options.getInteger('level');
        const target = ctx.options.getInteger('target');
        const next = ctx.options.getInteger('next');
        const upgrade = UpgradeCalculation(rarity, level, target);
        const sqp = SQpCalculation(rarity, level, target, next, upgrade.progress);
        const nqp = NQpCalculation(rarity, level, target, next, upgrade.progress);
        if(level < 1) throw new Error(`輸入的目前等級下限`);
        else if(level > 119) throw new Error(`輸入的目前等級大於119級`);
        else if(target < level) throw new Error(`輸入的目標等級小於目前等級`);
        else if(target < 2) throw new Error(`輸入的目標等級低於2等`);
        else if(target > 120) throw new Error(`輸入的目標等級大於等級上限`);
        else{
            await ctx.reply({
                embeds: [
                    {
                        type: 'rich',
                        title: `將★${rarity}英靈由Lv.${level}提升至Lv.${target}所需的素材`,
                        description: ``,
                        color: 0x00FFFF,
                        fields: [
                            {
                                name: `再臨次數 <:grail:1251525164508909569>`,
                                value: `> 靈基再臨**${upgrade.ascensions}**次 聖杯轉臨**${upgrade.grails}**次\n`,
                            },
                            {
                                name: `同職階 : `,
                                value: ``,
                                inline: false
                            },
                            {
                                name: `種火 <:5ssfeed:1251522865845637170>`,
                                value: `> **${sqp.feedusage}**個`,
                                inline: true
                            },
                            {
                                name: `QP <:f_qp:916998301486841916>`,
                                value: `> **${(sqp.feedqp+sqp.upgradeqp).toLocaleString()}**QP`,
                                inline: true
                            },
                            {
                                name: `異職階 : `,
                                value: ``,
                                inline: false
                            },
                            {
                                name: `種火 <:5snfeed:1251522933499756655>`,
                                value: `> **${nqp.feedusage}**個`,
                                inline: true
                            },
                            {
                                name: `QP <:f_qp:916998301486841916>`,
                                value: `> **${(nqp.feedqp+nqp.upgradeqp).toLocaleString()}**QP`,
                                inline: true
                            },
                        ],
                        timestamp: ctxTime.toISOString(),
                        footer: {
                            text: 'powered by @pinjim0407'
                        },
                    }
                ]
            });
        }
    }catch(error){
        await ctx.reply({
            embeds: [
                {
                    type: 'rich',
                    title: `計算出現錯誤`,
                    description: `${error}`,
                    color: 0xFF0000,
                    timestamp: ctxTime.toISOString(),
                    footer: {
                        text: 'powered by @pinjim0407'
                    },
                }
            ]
        });
    }
}