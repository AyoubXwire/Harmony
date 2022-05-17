import { createContext } from 'react'

export const AlertContext = createContext(null)

export const ALERT_TYPES = {
    success: 'success',
    info: 'info',
    warning: 'warning',
    error: 'danger',
}
