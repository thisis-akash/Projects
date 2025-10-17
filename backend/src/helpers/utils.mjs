export {
    formatDateToUTC
}

function formatDateToUTC(isoDate) {
    const d = new Date(isoDate);
    return d.toISOString().slice(0, 19).replace("T", " "); // 'YYYY-MM-DD HH:MM:SS'
}