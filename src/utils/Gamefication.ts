import { debug } from "./debugFunction";
import { levelConfig, titleRewardPerLevel } from "./variables";

type LevelInfo = {
    level: number;
    minXP: number;
    maxXP: number;
};

debug("ok")

function generateLevelTable(): LevelInfo[] {
    const table: LevelInfo[] = []
    let currentXp = 0

    for (let level = 1; level <= levelConfig.maxLevel; level++) {
        const nextXp = Math.floor(levelConfig.baseXp + Math.pow(level, levelConfig.multiplier))

        table.push({
            level,
            minXP: currentXp,
            maxXP: currentXp + nextXp - 1,
        })
        currentXp += nextXp
    }
    //debug(table)
    return table
}
function generateStreakBonus() {
    const levels = [1, 5, 10, 15, 20, 30, 40, 50, 60, 75, 90, 101]
    const baseMulti = 1
    const increment = 0.05
    const bonus = levels.map((streak, index) => ({
        min: streak,
        max: levels[index + 1] ? levels[index + 1] - 1 : streak,
        multiplier: parseFloat((baseMulti + index * increment).toFixed(2))
    }))
    return bonus.slice(0, -1)
}
export function getLevel(xp: number): number {
    const table = generateLevelTable()
    for (const { level, minXP, maxXP } of table) {
        if (xp >= minXP && xp <= maxXP) {
            return level
        }
    }
    return table[table.length - 1].level
}

export function getLevelLimits(level: number): { minXP: number, maxXP: number } | null {
    const table = generateLevelTable()
    const levelData = table.find((lv) => lv.level === level)
    return levelData ? { minXP: levelData.minXP, maxXP: levelData.maxXP } : null
}

export function getProgress(xp: number): number {
    const level = getLevel(xp)
    const limits = getLevelLimits(level)

    if (!limits) return 0;

    const { minXP, maxXP } = limits
    const progress = ((xp - minXP) / (maxXP - minXP)) * 100

    return Math.min(Math.max(progress, 0), 100)
}

export function getExperience(qtd: number): number {
    const streakXPBonus = generateStreakBonus()
    const streakBonus = streakXPBonus.find(bonus => bonus.min <= qtd && bonus.max >= qtd)
    //debug(streakBonus)
    return parseFloat(((levelConfig.xpPerNewsLetter * qtd) * (streakBonus ? streakBonus.multiplier : 1)).toFixed(0))
}

export function getTitlePerLevel(level: number): string {
    return titleRewardPerLevel.filter(reward => level >= reward.level).pop()?.title || 'Iniciante'
}

type StreakData = {
    currentStreak: number
    lastViewDate: string | null
}

export function calculateStreak(historic: string[]): StreakData {
    if (historic.length === 0) return {
        currentStreak: 0,
        lastViewDate: null
    }
    //console.log(historic)
    let streak = 0
    let lastDate = new Date(historic[0])
    //debug(historic)

    for (let i = 1; i < historic.length; i++) {
        const currentDate = new Date(historic[i])
        const daysDiff = Math.floor((currentDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24))

        if (daysDiff === 1 || (daysDiff === 2 && lastDate.getDay() === 6)) if (currentDate.getDay() !== 0) streak++
        else if (daysDiff > 1) {
            let penalty = 0;
            for (let j = 1; j < daysDiff; j++) {
                const missingDate = new Date(lastDate)
                missingDate.setDate(missingDate.getDate() + j)
                if (missingDate.getDay() !== 0) penalty++
            }

            streak = Math.max(0, streak - penalty)
            if (streak === 0) {
                streak = 1;
            } else {
                if (currentDate.getDay() !== 0) streak++
            }

        }
        lastDate = currentDate
        //debug("pontuação por dia:", currentDate, streak)
    }
    const currentDate = new Date(historic[historic.length - 1])
    if (currentDate.getDay() !== 0) streak++
    return {
        currentStreak: streak,
        lastViewDate: historic[historic.length - 1]
    }

}