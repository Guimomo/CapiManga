export const isoToFlagEmoji = (iso) => {

    return iso.toUpperCase().replace(/./g, char => String.fromCodePoint(127397 + char.charCodeAt()));
};