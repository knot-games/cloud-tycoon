export const getColorInt = (color: string) => {
    return parseInt(color.replace('#', ''), 16);
}
