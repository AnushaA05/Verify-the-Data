// src/components/Dashboard.js
import React, { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import { Doughnut, Bar, Line, Pie } from 'react-chartjs-2';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import '../styles/UserDashboard.css';
import UploadHistory from '../components/UploadHistory'; 

const user = JSON.parse(localStorage.getItem('user'));


ChartJS.register(ArcElement, BarElement, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [files, setFiles] = useState([]);
  const [columns, setColumns] = useState([]);
  const [xAxis, setXAxis] = useState('');
  const [yAxis, setYAxis] = useState('');
  const [chartType, setChartType] = useState('Bar');
  const [chartData, setChartData] = useState(null);
  const chartRef = useRef(null);
  const [history, setHistory] = useState([]);
  const [aiInput, setAiInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');

  const handleFileChange = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    if (!uploadedFiles.length) return;
    setFiles(uploadedFiles);
    setHistory((prev) => [...prev, ...uploadedFiles]);

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      if (jsonData.length > 0) {
        setColumns(Object.keys(jsonData[0]));
        const summary = generateInsights(jsonData);
        setAiResponse(`Auto Insights:\n${summary}`);
      }
    };
    reader.readAsArrayBuffer(uploadedFiles[0]);
  };

  const generateInsights = (data) => {
    const summary = [];
    const keys = Object.keys(data[0]);
    keys.forEach((key) => {
      const nums = data.map((row) => parseFloat(row[key])).filter((n) => !isNaN(n));
      if (nums.length > 0) {
        const avg = (nums.reduce((a, b) => a + b, 0) / nums.length).toFixed(2);
        const max = Math.max(...nums);
        const min = Math.min(...nums);
        summary.push(`${key} ➤ Avg: ${avg}, Max: ${max}, Min: ${min}`);
      }
    });
    return summary.join('\n');
  };

  const handleAnalyze = () => {
    if (!files.length || !xAxis || !yAxis) {
      alert('Please select file and columns');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      const chartData = {
        labels: jsonData.map((row) => row[xAxis]),
        datasets: [
          {
            label: `${yAxis} vs ${xAxis}`,
            data: jsonData.map((row) => row[yAxis]),
            backgroundColor: ['#004D40', '#00796B', '#00695C', '#00897B', '#26A69A'],
          },
        ],
      };
      setChartData(chartData);
      setActiveTab('Chart Preview');
    };
    reader.readAsArrayBuffer(files[0]);
  };

  

  const handleDownload = async (format) => {
    const canvas = await html2canvas(chartRef.current);
    if (format === 'png') {
      const link = document.createElement('a');
      link.download = 'chart.png';
      link.href = canvas.toDataURL();
      link.click();
    } else {
      const pdf = new jsPDF();
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 10, 10, 180, 100);
      pdf.save('chart.pdf');
    }
  };

  const handleDelete = (index) => {
    const newHistory = [...history];
    newHistory.splice(index, 1);
    setHistory(newHistory);
  };

  const handleAIAsk = async () => {
    if (!aiInput.trim() || !files.length) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      try {
        const res = await fetch('http://localhost:5000/api/ai/ask', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question: aiInput, data: jsonData }),
        });
        const result = await res.json();
        setAiResponse(result.response);
      } catch (error) {
        console.error(error);
        setAiResponse('AI Error: Could not fetch response.');
      }
    };
    reader.readAsArrayBuffer(files[0]);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return (
          <div className="welcome-section">
            <div className="icon-row">🔔</div>
            <h1>Welcome back to <span>Excel Analytics!</span></h1>
            <p>Start exploring your data today.</p>
            <div className="chart-icon">📊</div>
          </div>
        );

      case 'Upload & Analyze':
        return (
          <div>
            <div className="drop-area">
              <p>📁 Drag and drop Excel file here or click to upload</p>
              <input type="file" accept=".xlsx" onChange={handleFileChange} />
            </div>
            {columns.length > 0 && (
              <div className="selectors">
                <select onChange={(e) => setXAxis(e.target.value)} defaultValue="">
                  <option value="" disabled>Select X Axis</option>
                  {columns.map((col, i) => (
                    <option key={i} value={col}>{col}</option>
                  ))}
                </select>
                <select onChange={(e) => setYAxis(e.target.value)} defaultValue="">
                  <option value="" disabled>Select Y Axis</option>
                  {columns.map((col, i) => (
                    <option key={i} value={col}>{col}</option>
                  ))}
                </select>
                <select value={chartType} onChange={(e) => setChartType(e.target.value)}>
                  <option value="Bar">Bar</option>
                  <option value="Line">Line</option>
                  <option value="Pie">Pie</option>
                  <option value="Donut">Donut</option>
                </select>
                <button onClick={handleAnalyze}>Generate Chart</button>
              </div>
            )}
          </div>
        );

      case 'Chart Preview':
        return (
          chartData && (
            <div className="chart-preview">
              <h3>Chart Preview</h3>
               <div className="chart-box" ref={chartRef}>
  {chartType === 'Donut' && <Doughnut data={chartData} options={{ maintainAspectRatio: false }} height={1000} width={300} />}
  {chartType === 'Pie' && <Pie data={chartData} options={{ maintainAspectRatio: false }} height={900} width={300} />}
  {chartType === 'Bar' && <Bar data={chartData} options={{ maintainAspectRatio: false }} height={400} width={400} />}
  {chartType === 'Line' && <Line data={chartData} options={{ maintainAspectRatio: false }} height={400} width={400} />}
</div>
              <div className="download-buttons">
                <button onClick={() => handleDownload('pdf')}>Download PDF</button>
                <button onClick={() => handleDownload('png')}>Download PNG</button>
              </div>
            </div>
          )
        );

      case 'History':
        return (
          <div>
            <h3>Uploaded Files History</h3>
              {user && user.id ? (
  <UploadHistory userId={user.id} />
) : (
  <p style={{ textAlign: 'center', padding: '20px' }}>Please login to view upload history.</p>
)}
            <ul className="file-history">
              {history.map((file, index) => (
                <li key={index}>
                  {file.name}
                  <div>
                    <button onClick={() => handleDelete(index)}>Delete</button>
                    <button onClick={() => alert('Download not implemented here')}>Download</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        );

      case 'AI Insights':
        return (
          <div className="ai-section">
            <h3>AI Insights Assistant 🤖</h3>
            <textarea placeholder="Ask ChatGPT anything about your data..." value={aiInput} onChange={(e) => setAiInput(e.target.value)} />
            <button onClick={handleAIAsk}>Ask AI</button>
            {aiResponse && <pre className="ai-response">{aiResponse}</pre>}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Excel Analytics</h2>
        <ul>
          {['Dashboard', 'Upload & Analyze', 'Chart Preview', 'History', 'AI Insights'].map((tab) => (
            <li key={tab} onClick={() => setActiveTab(tab)}>{tab}</li>
          ))}
        </ul>
      </aside>
      <main className="main-content">{renderContent()}</main>
    </div>
  );
};

export default Dashboard;


















































