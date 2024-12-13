export function loadFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    try {
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error(`Failed to parse localStorage key "${key}"`, error);
        return null;
    }
}

export function saveToLocalStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(`Failed to save to localStorage key "${key}"`, error);
    }
}