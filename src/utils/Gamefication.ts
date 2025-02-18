type LevelInfo = {
    level: number;
    minXP: number;
    maxXP: number;
};

function generateLevelTable(): LevelInfo[] {
    const config = {
        maxLevel: 100,
        baseXp: 10,
        multiplier: 1.5
    }
    const table: LevelInfo[] = []
    let currentXp = 0

    for (let level = 1; level <= config.maxLevel; level++) {
        const nextXp = Math.floor(config.baseXp + Math.pow(level, config.multiplier))

        table.push({
            level,
            minXP: currentXp,
            maxXP: currentXp + nextXp - 1,
        })
        currentXp += nextXp
    }
    return table
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