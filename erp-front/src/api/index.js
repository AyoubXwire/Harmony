export const API_BASE = "http://localhost:4000/api"

// authentication
export const GET_USER_BY_TOKEN = API_BASE + '/auth/userbytoken/'
export const GET_USER_TOKEN = API_BASE + '/auth/login'

// users
export const GET_ALL_USERS = API_BASE + '/users/'

// projects
export const GET_ALL_PROJECTS = API_BASE + '/projects/'
export const GET_ALL_USER_PROJECTS = API_BASE + '/projects/?assigned=true'

// clients
export const GET_ALL_CLIENTS = API_BASE + '/clients/'

// timesheet
export const GET_ALL_TIMESHEETS = API_BASE + '/timesheet/'
export const GET_ALL_USER_TIMESHEETS = API_BASE + '/timesheet/?assigned=true'
