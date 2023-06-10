export default function formatDate(dateString: string) {
    const date = new Date(dateString);
    const currentDate = new Date();

    if (currentDate.getTime() - date.getTime() <= 24 * 60 * 60 * 1000) {
        const hoursPassed = Math.floor((currentDate.getTime() - date.getTime()) / (60 * 60 * 1000));
        return `${hoursPassed}h`;
    } else if (currentDate.getFullYear() === date.getFullYear()) {
        const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    } else {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    }
}
