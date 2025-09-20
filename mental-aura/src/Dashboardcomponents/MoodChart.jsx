import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const MoodChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const myChartRef = chartRef.current.getContext('2d');
    
    // Dummy data for the chart
    const data = {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Mood (1-5)',
        data: [3, 4, 2, 4, 5, 3, 4],
        fill: false,
        borderColor: '#2563eb',
        tension: 0.4,
      }]
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 5,
          ticks: {
            stepSize: 1,
          },
        },
      },
    };
    
    chartInstance.current = new Chart(myChartRef, {
      type: 'line',
      data: data,
      options: options,
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return <canvas ref={chartRef} />;
};

export default MoodChart;