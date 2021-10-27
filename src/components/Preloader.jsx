import React from 'react'
import { motion } from 'framer-motion'
import LoopIcon from '@mui/icons-material/Loop'

function Preloader() {
    return (
        <motion.div
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
            duration: 1,
            ease: "easeInOut"
          }}
        className="preLoader">
            <motion.div
            initial={{opacity: 1, scale: 2}}
            animate={{rotate: 360}}
            transition={{
                duration: 4,
                ease: "easeInOut",
                repeat: Infinity
              }}
            >
                <LoopIcon />
            </motion.div>
        </motion.div>
    )
}

export default Preloader