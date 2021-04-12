import { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js';

interface Props {
    data: number[];
}
const MoodGraph: React.FC<Props> = ({ data }) => {
    // const [ chart, setChart ] = useState<Chart | null>(null);
    const chart = useRef<Chart | null>();
    const ctx = useRef();

    useEffect(() => {
        if (chart.current) {
            chart.current.destroy();
        }
        if (ctx.current) {
            const labels = [];
            for (let i = 0; i < data.length; i++) {
                labels.push(i);
            }
            const newChart = new Chart(ctx.current, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Data for this Month',
                        data: data,
                        fill: 'start',
                        backgroundColor: 'rgba(39,141,213,0.65)',
                    }]
                },
            });
            chart.current = newChart;
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