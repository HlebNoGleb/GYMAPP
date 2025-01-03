export function searchToJSON(search) {
    if (!search) {
        return undefined;
    }

    var result = {};
    var pairs = search.substring(1).split("&");

    pairs.forEach(function (pair) {
        var [key, value] = pair.split("=");
        result[decodeURIComponent(key)] = decodeURIComponent(value || '');
    });

    return JSON.parse(JSON.stringify(result));
}