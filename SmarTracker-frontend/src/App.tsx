import Navbar from './components/navigation-bar/Navbar';
import { Route, Routes, useLocation } from 'react-router-dom';
import SummaryPage from './views/summary-page/SummaryPage';
import { AnimatePresence } from 'framer-motion';
import ExpenseTable from './views/expense-table/ExpenseTable';
import UserSettings from './views/user-settings/UserSettings';

function App() {
  const location = useLocation();
  return (
    <>
      <Navbar />
      <AnimatePresence mode='wait'>
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={<SummaryPage />} />
          <Route path='/expenses'>
            <Route index element={<ExpenseTable />} />
            <Route path=':id' element={<p>A single expense detail page</p>} />
          </Route>
          <Route path='uers-settings' element={<UserSettings />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
