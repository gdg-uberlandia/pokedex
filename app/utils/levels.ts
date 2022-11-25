export const LEVELS = {
    1: 30,
    2: 40,
    3: 60,
    4: 80,
    5: 100,
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