import { dataCounter } from "@/data";
import CountUp from "react-countup/build/CountUp";

const CounterServices = () => {
    return (  
        <div className="grid justify-between max-w-3xl grid-cols-2 gap-3
         mx-auto my-8 md:grid-cols.4 md:gap-4">
            {dataCounter.map(({id,endCounter,text,lineRight,lineRightMobile}) => (
                <div key={id} className={`${lineRight} && 'ltr'`}>
                    <p>{text}</p>
                </div>
            ))}           
        </div>
     );
}
 
export default CounterServices ;