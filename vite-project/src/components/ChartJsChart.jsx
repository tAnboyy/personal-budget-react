import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// Error boundary component
class ChartErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error: error.message };
  }

  componentDidCatch(error, errorInfo) {
    console.log('Chart.js Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="chart-container">
          <h3>Budget Distribution (Chart.js)</h3>
          <div className="chart-error">
            <p><strong>Chart Error:</strong> {this.state.error}</p>
            <div className="fallback-chart">
              <h4>Budget Data:</h4>
              <ul>
                {this.props.budgetData.map((item, index) => (
                  <li key={index}>
                    <strong>{item.title}:</strong> ${item.budget}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const ChartJsChart = ({ budgetData }) => {
  // Check if budgetData is valid
  if (!budgetData || budgetData.length === 0) {
    return (
      <div className="chart-container">
        <h3>Budget Distribution (Chart.js)</h3>
        <div className="chart-placeholder">No data available</div>
      </div>
    );
  }

  // Prepare data for Chart.js
  const chartData = {
    labels: budgetData.map(item => item.title),
    datasets: [
      {
        data: budgetData.map(item => item.budget),
        backgroundColor: [
          '#ffcd56',
          '#ff6384',
          '#36a2eb',
          '#fd6b19',
          '#4bc0c0',
          '#9966ff',
          '#ff9f40',
        ],
        borderWidth: 2,
        borderColor: '#ffffff',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: $${value} (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <ChartErrorBoundary budgetData={budgetData}>
      <div className="chart-container">
        <h3>Budget Distribution (Chart.js)</h3>
        <div className="chart-wrapper" style={{ height: '400px', width: '400px' }}>
          <Pie data={chartData} options={options} />
        </div>
      </div>
    </ChartErrorBoundary>
  );
};

export default ChartJsChart;