
export function objectToQuery(queryObject) {
    console.log(queryObject)
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
    console.log(query)
    return query
}