import Sidebar from '../components/Sidebar';
import Routine from '../components/Routines/Routine';

const Routines:React.FC = () => {
    return (
        <div className="flex">
            <Sidebar />
            <h1>HELLO</h1>
            <Routine />
        </div>
    );
}

export default Routines;