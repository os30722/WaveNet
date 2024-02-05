const formatDuraion = (duration: number) => {
    let min = Math.floor((duration/1000)/60);
    let sec = Math.floor((duration/1000)%60);
    return `${min}:${sec.toLocaleString(undefined, {minimumIntegerDigits: 2})}`;
}

export {
    formatDuraion,
};