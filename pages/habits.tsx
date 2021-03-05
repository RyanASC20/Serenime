import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';
import AddHabitForm from '../components/Input/Habits/AddHabitForm';
import { useHabitsRef, useHabitsData } from '../hooks/firestoreHooks';
import { auth } from '../config/firebase';
import { useDate } from '../hooks/useDate';
import { useUser } from '../hooks/useUser';
import { useEffect } from 'react';
import Calendar from '../components/Calendar';

const Habits: React.FC = () => {
    const [date, setDate, dim] = useDate();
    const [ selectedHabit, setSelectedHabit ] = useState('test');
    const [addHabitMode, setAddHabitMode] = useState(false);
    const [ data, setData ] = useState(null);
    const { habitsRef } = useUser();

    useEffect(() => {
        console.log("MOUNTED");
        (async function getHabitNames() {
            const docIds = await habitsRef.get();
            docIds.forEach(doc => {
                console.log(doc.data());
            })
        })();
    }, []);

    useEffect(() => {
        (async function fetchData() {
            try {
                const uid = auth.currentUser.uid;
                const snapshot = await useHabitsData(uid, date, 'test');
                const dataArray = [];
                for (let i = 0; i < dim + 1; i++) {
                    if (Object.keys(snapshot).indexOf(i.toString()) == -1) {
                        dataArray.push(0);
                    }
                    else {
                        dataArray.push(snapshot[i.toString()]);
                    }
                }
                setData(dataArray);
            } catch(err) {
                console.log(err);
            }
        })();
    }, [date, selectedHabit, auth.currentUser]);

    return (
        <div className="flex">
            <Sidebar />
            { data && <Calendar type="habit" data={ data }/> }
                <h1 className="text-xl text-green-500">Did you... { selectedHabit }?</h1>
                <Button text={addHabitMode ? "Cancel" : "Add Habit to Track"} onClick={() => { setAddHabitMode(!addHabitMode) }}/>
            <div>
                
               {addHabitMode && <AddHabitForm /> }
            </div>
        </div>
    )
}

export default Habits