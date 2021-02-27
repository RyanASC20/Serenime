import Sidebar from '../components/Sidebar';
import CountdownTimer from '../components/CountdownTimer';

const Breathing:React.FC = () => {
    return (
        <div className="flex flex-col md:flex-row m-5 md:m-0">
            <Sidebar />
            <CountdownTimer startTime={ 10 }/>
        </div>
    );
}

export default Breathing;