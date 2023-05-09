import React, { FC, useEffect, useState, useRef } from "react";
import { Chart, ChartData, registerables} from 'chart.js'
Chart.register(...registerables)

interface DayOfWeekRatioProps {

}

const DayOfWeekRatio: FC<DayOfWeekRatioProps> = ({}) => {
  // const [chart, setChart] = useState<Chart | null>(null);

  const formatData = (data: number[]): ChartData => ({
    labels: ["a", "b", "c", "d", "e", "f", "g", "h"],
    datasets: [{ data }]
  });


  // const data = {
  //   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  //   datasets: [
  //     {
  //       label: 'My First Dataset',
  //       data: [65, 59, 80, 81, 56, 55, 40],
  //       fill: false,
  //       backgroundColor: 'rgb(255, 99, 132)',
  //       borderColor: 'rgba(255, 99, 132, 0.2)',
  //     },
  //     {
  //       label: 'My Second Dataset',
  //       data: [28, 48, 40, 19, 86, 27, 90],
  //       fill: false,
  //       backgroundColor: 'rgb(54, 162, 235)',
  //       borderColor: 'rgba(54, 162, 235, 0.2)',
  //     },
  //   ],
  // };
  
  // const options = {
  //   scales: {
  //     yAxes: [
  //       {
  //         ticks: {
  //           beginAtZero: true,
  //         },
  //       },
  //     ],
  //   },
  // };
  const chartData = [1,2,3,4,5,6,7, 8]
  const chartRef = useRef<Chart | null>(null);

  const canvasCallback = (canvas: HTMLCanvasElement | null) => {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      chartRef.current = new Chart(ctx, {
        type: "bar",
        data: formatData(chartData),
        options: { responsive: true }
      });
    }
  };


  return (
    <div>
      <canvas ref={canvasCallback}></canvas>
    </div>
  );
};

export default DayOfWeekRatio;
