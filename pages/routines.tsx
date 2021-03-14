import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Routine from '../components/Routines/Routine';

const Routines:React.FC = () => {
    
    return (
        <div className="flex">
            <Sidebar />
            {/* <button onClick={() =>{ setCount(count + 1) } }>{ count }</button> */}
            <Routine />
        </div>
    );
}

export default Routines;