import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import Elections from './pages/Elections';
import Results from './pages/Results';
import CandidateRegistration from './pages/CandidateRegistration';

import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';

function App() {

  // UI-only state – no web3 required
  const [state, setState] = useState({
    web3: null,
    accounts: [],
    contract: null,
    candidates: [],
    canVote: false,
    isAdmin: false,
    adminAddress: null
  });

  // Skip blockchain setup entirely
  useEffect(() => {
    console.log("UI-only mode: Blockchain disabled.");
    setState(s => ({
      ...s,
      web3: null,
      accounts: [],
      contract: null
    }));
  }, []);

  // Dummy refresh function (no blockchain)
  const refreshCandidates = () => {
    console.log("Blockchain disabled. refreshCandidates skipped.");
  };

  // Dummy vote function
  const vote = (candidateId) => {
    console.log("Blockchain disabled. vote(", candidateId, ") skipped.");
  };

  // UI ONLY — remove Web3 blocking screen
  // REMOVE the old condition:
  // if (!state.web3 || state.accounts.length === 0) { ... }

  return (
    <Router>
      <div style={{ backgroundColor: '#E0E0FF', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

        {/* Optional banner for UI-only mode */}
        <div style={{
          background: '#ffcccc',
          padding: '10px',
          textAlign: 'center'
        }}>
          ⚠ Blockchain Disabled – UI Running in Demo Mode
        </div>

        <header className="header">
          <div className="header-content">
            <div className="logo">TrustVote</div>
            <nav className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/elections">Elections</Link>
              <Link to="/results">Results</Link>
              <Link to="/candidate-registration">Candidate Registration</Link>
            </nav>
          </div>
        </header>

        <main style={{ flex: 1 }}>
          <Route exact path="/" component={Home} />

          <Route
            path="/elections"
            render={props => <Elections {...props} state={state} vote={vote} />}
          />

          <Route
            path="/results"
            render={props => <Results {...props} state={state} />}
          />

          <Route
            path="/candidate-registration"
            render={props => (
              <CandidateRegistration
                {...props}
                state={state}
                onCandidateAdded={refreshCandidates}
              />
            )}
          />
        </main>

        <footer className="footer">
          <div className="container">
            <p>&copy; 2025 TrustVote System. All rights reserved.</p>
          </div>
        </footer>

      </div>
    </Router>
  );
}

export default App;
