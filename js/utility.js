function shuffleRange(array, start, end) {
    if (start < 0) start = 0;
    if (end >= array.length) end = array.length - 1;
    if (start > end) return;

    for (let i = end; i > start; i--) {
        const j = Math.floor(Math.random() * (i - start + 1)) + start;
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export default shuffleRange;