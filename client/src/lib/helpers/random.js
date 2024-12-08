export function generageUniqueId() {
   let now = Date.now().toString(36);
   let rnd = Math.random().toString(36).substr(2, 9);
   return now + rnd;
}

export const newGuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const random = {
    generageUniqueId,
}

export default random