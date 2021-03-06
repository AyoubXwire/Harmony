
/**
 * @param {Object} queryObject object containing filters
 * @returns {String} query string to use for get request filtering
 */
export function objectToQuery(queryObject) {

    let query = ''
    let i = 0

    for (const key in queryObject) {
        if (Object.hasOwnProperty.call(queryObject, key)) {
            const value = queryObject[key]

            if (!value) continue

            if (i <= 0) query += '?'
            else query += '&'
            
            query += key + '=' + value
            i++
        }
    }

    return query
}