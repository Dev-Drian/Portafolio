"use client"


import { fadeIn } from '@/utils/motion-transitions';
import {motion}  from 'framer-motion';

//creando compo0nente que
interface MotionTransitionProps{
    children:React.ReactNode
    //position righ  se la pasamos a faide in
    positions: 'right' | 'bottom'
    //class name que se le pasa para abajo
    className?:string
}
//componente que recive props que es la interface de arriba
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