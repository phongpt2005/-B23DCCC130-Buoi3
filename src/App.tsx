import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GoodsTable from './components/GoodsTable';
import { GoodsDetails } from './components/GoodsDetails';

import { Provider } from 'react-redux';
// TODO: Add the Redux store implementation or correct the import path.
// import store from './redux/store';

import store from './store';

const App: React.FC = () => {
  return (
    <Provider store={store}><Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<GoodsTable />} />
          <Route path="/goods/:id" element={<GoodsDetails />} />
        </Routes>
      </div>
    </Router></Provider>
  );
};

export default App;