import React from 'react';

const Breadcrumbs = ({ path = [] }) => {
  return (
    <nav className="breadcrumbs">
      <div className="breadcrumbs-container">
        <h2>Breadcrumbs Component</h2>
        <p>This is a dummy Breadcrumbs component - navigation breadcrumbs for the personal budget app.</p>
        <div className="breadcrumbs-content">
          <ol className="breadcrumb-list">
            <li><a href="/">Home</a></li>
            {path.length > 0 && (
              <>
                {path.map((item, index) => (
                  <React.Fragment key={index}>
                    <li className="separator">/</li>
                    <li className={index === path.length - 1 ? 'current' : ''}>
                      {index === path.length - 1 ? item : <a href="#">{item}</a>}
                    </li>
                  </React.Fragment>
                ))}
              </>
            )}
          </ol>
        </div>
      </div>
    </nav>
  );
};

export default Breadcrumbs;