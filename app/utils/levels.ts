export const LEVELS = {
    1: 700,
    2: 3200,
    3: 4400,
    4: 7400,
    5: 11900,
    6: 10000000,
};


export const getLevelByScore = (score: number): number => {

    for (const [key, value] of Object.entries(LEVELS)) {

        if (value == score) {
            return parseInt(key);
        }

        if (value > score) {
            return parseInt(key) - 1;
        }
    }
    return 5
}