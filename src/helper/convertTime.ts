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

    let formatted = "";
    if (hours > 0) formatted += `${hours}h `;
    if (minutes > 0) formatted += `${minutes}m `;
    if (seconds > 0 || (!hours && !minutes)) formatted += `${seconds}s`;

    return { hours, minutes, seconds };
}

export default formatHMS