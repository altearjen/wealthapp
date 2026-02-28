import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Overview from './pages/Overview';
import Portfolio from './pages/Portfolio';
import Holdings from './pages/Holdings';
import Performance from './pages/Performance';
import Transactions from './pages/Transactions';
import Markets from './pages/Markets';
import Accounts from './pages/Accounts';
import Research from './pages/Research';
import Reports from './pages/Reports';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/holdings" element={<Holdings />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/markets" element={<Markets />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/research" element={<Research />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
