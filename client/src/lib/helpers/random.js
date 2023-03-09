export function generageUniqueId() {
   let now = Date.now().toString(36);
   let rnd = Math.random().toString(36).substr(2, 9);
   return now + rnd;
}

const random = {
    generageUniqueId,
}

export default random