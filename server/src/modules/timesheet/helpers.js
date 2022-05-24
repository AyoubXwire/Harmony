
/**
 * @param {Date} date last date that was filled in the timesheet
 * @returns {Date} next non weekend day that should be filled next in the timesheet
 */
 function getNextWorkDate(date) {
    do {
        date.setDate(date.getDate() + 1)
    } while (!(date.getDay() % 6))

    let today = new Date()

    if (date.getDay() > today.getDay()) {
        return null
    }

    return date
}

module.exports = {
    getNextWorkDate
}