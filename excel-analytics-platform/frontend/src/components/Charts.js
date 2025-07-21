import React from "react";
import {
  Pie,
  Doughnut,
  Line,
  Bar
} from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement
);

const Charts = ({ data, chartType = "Pie", xField, yField }) => {
  if (!data || data.length === 0) return <p>No data available for charts.</p>;

  const labels = data.map(item => item[xField]);
  const values = data.map(item => item[yField]);

  const chartData = {
    labels,
    datasets: [{
      label: `${yField} by ${xField}`,
      data: values,
      backgroundColor: [
        "#ff6384", "#36a2eb", "#ffce56", "#4bc0c0", "#9966ff",
        "#ff9f40", "#66bb6a", "#ffa726", "#d4e157", "#ab47bc"
      ],
      borderColor: "#36a2eb",
      borderWidth: 1,
      fill: chartType === "Line" ? false : true,
    }]
  };

  let ChartComponent;
  switch (chartType) {
    case "Pie":
      ChartComponent = Pie;
      break;
    case "Doughnut":
      ChartComponent = Doughnut;
      break;
    case "Line":
      ChartComponent = Line;
      break;
    case "Bar":
      ChartComponent = Bar;
      break;
    default:
      ChartComponent = Pie;
  }

  return (
    <div style={{ maxWidth: "700px", margin: "auto" }}>
      <h3 className="text-xl font-semibold text-center mb-4">{chartType} Chart</h3>
      <ChartComponent data={chartData} />
    </div>
  );
};

export default Charts;



