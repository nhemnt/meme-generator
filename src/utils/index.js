function getRandomNumberInRange(x, y) {
    // Check if x and y are valid numbers
    if (typeof x !== 'number' || typeof y !== 'number' || x >= y) {
        throw new Error('Invalid range');
    }

    // Generate a random number between 0 and 1
    const random = Math.random();

    // Scale the random number to fit the specified range
    const randomNumberInRange = Math.floor(random * (y - x + 1)) + x;

    return randomNumberInRange;
}

export {
    getRandomNumberInRange
}