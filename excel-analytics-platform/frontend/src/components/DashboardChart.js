// components/DashboardChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const DashboardChart = ({ chartData }) => {
  if (!chartData) return null;

  return (
    <div style={{ marginTop: '30px' }}>
      <h3>📊 Data Visualization</h3>
      <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
    </div>
  );
};

export default DashboardChart;
