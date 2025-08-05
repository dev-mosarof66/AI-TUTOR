/**
 * Convert total seconds into hours, minutes, and seconds
 * @param totalSeconds number
 */
const formatHMS = (totalSeconds: number) => {
    if (isNaN(totalSeconds) || totalSeconds < 0) {
        return { hours: 0, minutes: 0, seconds: 0 };
    }

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    return { hours, minutes, seconds };
}

export default formatHMS