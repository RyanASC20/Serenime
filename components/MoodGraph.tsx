import { useEffect, useRef } from 'react';
import Chart from 'chart.js';

interface Props {
    data: number[];
}
const MoodGraph: React.FC<Props> = ({ data }) => {

    const ctx = useRef();

    useEffect(() => {
        console.log(data);
        if (ctx.current) {
            const labels = [];
            for (let i = 0; i < data.length; i++) {
                labels.push(i);
            }
            const myChart = new Chart(ctx.current, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Data for this Month',
                        data: data,
                        fill: 'start',
                        backgroundColor: 'rgb(39,141,213)',
                    }]
                },
            });
        }
    }, [ctx, data]);

    return (
        <div className="mt-3 p-3 rounded-xl shadow-md bg-white">
            <canvas id="graph" ref={ctx}>
                
            </canvas>
        </div>
    )
}

export default MoodGraph;