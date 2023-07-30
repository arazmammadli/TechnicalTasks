export const WEEK_DAYS: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const getDate = (dt: number, timezone: number) => {
    const date = new Date((dt + timezone) * 1000);
    const formattedDate = date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    });
    const parts = formattedDate.split(' ');
    const reorderedDate = `${parts[2]} ${parts[1]}, ${parts[0].replace(/.$/, "")}`
    return reorderedDate;

};

export const mps_to_kmph = (ms: number) => {
    return (3.6 * ms);
};

export const getTime = (time: number, timezone: number) => {
    const date = new Date((time + timezone) * 1000);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const period = hours >= 12 ? "PM" : "AM";

    return `${hours % 12 || 12}:${minutes} ${period}`
};

export const getMonth = (dt:string) => {
    const date = new Date(dt);
    const formattedDate = date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
    });

    return formattedDate;
}