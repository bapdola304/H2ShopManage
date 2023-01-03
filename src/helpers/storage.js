const setObjectToStorage = (key, obj) => {
    localStorage[key] = JSON.stringify(obj);
}
const getObjectFromStorage = (key) => {
    return localStorage[key] ? JSON.parse(localStorage[key]) : {};
}

export {
    setObjectToStorage,
    getObjectFromStorage
};