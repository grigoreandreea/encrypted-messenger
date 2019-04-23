export function deepCopy(obj) {
    JSON.parse(JSON.stringify(obj));
}