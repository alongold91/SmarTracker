import Navbar from './components/navigation-bar/Navbar';
import { Route, Routes } from 'react-router-dom';
import SummaryPage from './views/summary-page/SummaryPage';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<SummaryPage />} />
        <Route path='/expenses'>
          <Route index element={<p>Expense table</p>} />
          <Route path=':id' element={<p>A single expense detail page</p>} />
        </Route>
        <Route path='uers-settings' element={<p>edit user details</p>} />
      </Routes>
    </>
  );
}

export default App;
