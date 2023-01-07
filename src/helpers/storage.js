const setObjectToStorage = (key, obj) => {
    localStorage[key] = JSON.stringify(obj);
}
const getObjectFromStorage = (key) => {
    return localStorage[key] ? JSON.parse(localStorage[key]) : {};
}

const removeObjectFromStorage = (key) => {
    return localStorage.removeItem(key);
}

export {
    setObjectToStorage,
    getObjectFromStorage,
    removeObjectFromStorage
};