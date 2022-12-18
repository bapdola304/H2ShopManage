export function VNDCurrencyFormatting(value = 0) {
    return value.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
}

export function isEmpty(obj) {
    if (obj === undefined || obj === null) {
        return true;
    }
    let empty = Object.keys(obj);
    return empty.length === 0;
}