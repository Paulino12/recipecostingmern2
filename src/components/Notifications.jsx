import React, { useEffect, useContext } from 'react'
import { motion } from 'framer-motion'
import CancelIcon from '@mui/icons-material/Cancel'

import { NotificationsContext } from '../contexts/NotificationsContext'

function Notifications() {
    const { notification, setShowNotification } = useContext(NotificationsContext)
    useEffect(() => {
        setTimeout(() => {
            setShowNotification(false)
        }, 3000)
    }, [notification, setShowNotification])
    
    return (
        <div className="d-flex align-items-center justify-content-between p-3">
            <div className="text-capitalize">{notification}</div>
            <motion.div className="p-0 pointer text-danger"
                whileTap={{scale: 0.9}}
                onClick={() => setShowNotification(false)}>
                    <CancelIcon />
            </motion.div>
        </div>
    )
}

export default Notifications