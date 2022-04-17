export const API_BASE = 'http://localhost:4000/api'

// authentication
export const GET_USER_BY_TOKEN = API_BASE + '/auth/userbytoken/'
export const GET_USER_TOKEN = API_BASE + '/auth/login'
export const UPDATE_USER_PASSWORD = API_BASE + '/auth/update-password'

// users
export const GET_ALL_USERS = API_BASE + '/users/'
export const CREATE_USER = API_BASE + '/users/'
export const DELETE_USER = API_BASE + '/users/'
export const UPDATE_USER = API_BASE + '/users/'

// posts
export const GET_ALL_POSTS = API_BASE + '/posts/'
export const CREATE_POST = API_BASE + '/posts/'
export const DELETE_POST = API_BASE + '/posts/'
export const UPDATE_POST = API_BASE + '/posts/'

// projects
export const GET_ALL_PROJECTS = API_BASE + '/projects/'
export const GET_ALL_USER_PROJECTS = API_BASE + '/projects/?assigned=true'
export const CREATE_PROJECT = API_BASE + '/projects/'
export const DELETE_PROJECT = API_BASE + '/projects/'
export const UPDATE_PROJECT = API_BASE + '/projects/'

// clients
export const GET_ALL_CLIENTS = API_BASE + '/clients/'
export const CREATE_CLIENT = API_BASE + '/clients/'
export const DELETE_CLIENT = API_BASE + '/clients/'
export const UPDATE_CLIENT = API_BASE + '/clients/'

// contacts
export const GET_ALL_CONTACTS = API_BASE + '/contacts/'
export const CREATE_CONTACT = API_BASE + '/contacts/'
export const DELETE_CONTACT = API_BASE + '/contacts/'
export const UPDATE_CONTACT = API_BASE + '/contacts/'

// timesheet
export const GET_ALL_TIMESHEETS = API_BASE + '/timesheet/'
export const GET_ALL_USER_TIMESHEETS = API_BASE + '/timesheet/?assigned=true'
