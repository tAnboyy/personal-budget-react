import React from 'react';

const Homepage = () => {
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
          <h2>Features</h2>
          <p>
            Track expenses, set budgets, view reports, and manage your financial categories.
            Stay organized with our intuitive dashboard and reporting tools.
          </p>
        </article>

        <article>
          <h2>Get Started</h2>
          <p>
            Create an account to start managing your personal budget today.
            It's free, secure, and designed to help you achieve your financial goals.
          </p>
        </article>
      </div>
    </main>
  );
};

export default Homepage;