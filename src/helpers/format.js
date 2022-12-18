export function VNDCurrencyFormatting(value = 0) {
    return value.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
}