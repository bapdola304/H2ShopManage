import * as dayjs from 'dayjs';

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

export function dateFormat(date, format) {
    return dayjs(date).format(format)
}

export function formatSelectInput(data = [], labelField, hasColor = false) {
    return data.map(item => {
        return {
            value: item.id,
            label: `${item[labelField]}${(hasColor && item?.color) ? ` - ${item?.color}` : ''}`
        }
    })
}

export function setFieldValue(value) {
    return !isEmpty(value) ? value : "";
}