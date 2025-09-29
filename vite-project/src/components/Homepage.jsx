import React, { useState, useEffect } from 'react';
import { dataService } from '../services/DataService';
import ChartJsChart from './ChartJsChart';
import D3Chart from './D3Chart';

const Homepage = () => {
  const [budgetData, setBudgetData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Subscribe to data service updates
    const unsubscribe = dataService.subscribe((data) => {
      setBudgetData(data);
      setLoading(false);
    });

    // Fetch data if not already available
    if (!dataService.hasBudgetData()) {
      dataService.fetchBudgetData()
        .catch((err) => {
          setError('Failed to load budget data. Please make sure the backend server is running.');
          setLoading(false);
        });
    } else {
      setBudgetData(dataService.getBudgetData());
      setLoading(false);
    }

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <main id="main">
        <div className="page-area">
          <div className="loading">Loading budget data...</div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main id="main">
        <div className="page-area">
          <div className="error">{error}</div>
          <article>
            <h2>Personal Budget</h2>
            <p>
              A personal-budget management app built with React. This application helps you track your expenses,
              manage your budget, and stay on top of your financial goals.
            </p>
          </article>
        </div>
      </main>
    );
  }

  return (
    <main id="main">
      <div className="page-area">
        <article>
          <h2>Personal Budget</h2>
          <p>
            A personal-budget management app built with React. This application helps you track your expenses,
            manage your budget, and stay on top of your financial goals.
          </p>
        </article>

        <article>
          <h2>Budget Overview</h2>
          <p>
            Below you can see your current budget distribution in two different chart formats.
            The data is fetched from the backend API using Axios.
          </p>
        </article>

        {budgetData.length > 0 && (
          <article>
            <div className="charts-container">
              <ChartJsChart budgetData={budgetData} />
              <D3Chart budgetData={budgetData} />
            </div>
          </article>
        )}
      </div>
    </main>
  );
};

export default Homepage;