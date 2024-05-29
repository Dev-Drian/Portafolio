"use client"


import { fadeIn } from '@/utils/motion-transitions';
import {motion}  from 'framer-motion';
interface MotionTransitionProps{
    children:React.ReactNode
    positions: 'right' | 'bottom'
    className?:string
}

const MotionTransition = (props: MotionTransitionProps) => {
    const {children,positions,className} = props
    return (
        <motion.div
        variants={fadeIn(positions)}
        initial= "hidden"
        animate= "visible"
        exit="hidden"
        className={className}
        >
            {children}
        </motion.div>
    )
}
export default MotionTransition