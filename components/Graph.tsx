import { useRef, useEffect } from "react";
import Chart from "chart.js";
import { useUser } from '../hooks/useUser';

const Graph: React.FC = () => {
  const chartEl = useRef(null);
  const { userData } = useUser();

  useEffect(() => {
    const graph = new Chart(chartEl.current, {
      type: "line",
      data: {
        labels: userData.docs.map(doc => {
          const date = new Date(doc.data().time.seconds * 1000);
          return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

        }),
        datasets: [
          {
            label: "My First dataset",
            backgroundColor: "rgba(0, 0, 255, 0.5)",
            borderColor: "rgb(255, 99, 132)",
            data: userData.docs.map(doc => {
              return doc.data().stressLevel;
            }),
          },
        ],
      },
    });
  }, []);
  return (
    <canvas 
    ref={chartEl}
  ></canvas>
  );
};

export default Graph;
