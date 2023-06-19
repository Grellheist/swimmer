"use client"
import { AnimatePresence, motion } from 'framer-motion'

export function Providers({ children }: {
    children: React.ReactNode;
}) {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}
