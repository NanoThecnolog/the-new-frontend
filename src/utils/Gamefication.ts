import { debug } from "./debugFunction";
import { levelConfig, titleRewardPerLevel } from "./variables";

type LevelInfo = {
    level: number;
    minXP: number;
    maxXP: number;
};

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
    debug(table)
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