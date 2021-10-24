import React, { createContext, useState } from 'react'

export const NotificationsContext = createContext()

function NotificationsContextProvider({ children }) {
    const [notification, setNotification] = useState('')
    const [showNotification, setShowNotification] = useState(false)
    return (
        <div>
            <NotificationsContext.Provider value={{
                notification, setNotification,
                showNotification, setShowNotification
            }}>
                { children }
            </NotificationsContext.Provider>
        </div>
    )
}

export default NotificationsContextProvider
