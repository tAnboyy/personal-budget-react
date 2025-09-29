import React from 'react';

const Article = () => {
  return (
    <article className="article">
      <div className="article-container">
        <h1>Article Component</h1>
        <p>This is a dummy Article component - article/blog content for the personal budget app.</p>
        <div className="article-content">
          <header className="article-header">
            <h2>Budget Management Tips</h2>
            <p className="article-meta">Published on: January 1, 2025 | Author: Budget Expert</p>
          </header>
          <section className="article-body">
            <p>Here you would find detailed articles about budgeting, financial tips, and money management strategies.</p>
            <h3>Key Points:</h3>
            <ul>
              <li>Track your expenses</li>
              <li>Set realistic goals</li>
              <li>Review regularly</li>
            </ul>
          </section>
        </div>
      </div>
    </article>
  );
};

export default Article;