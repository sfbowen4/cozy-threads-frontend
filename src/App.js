import './App.css';
import LandingPage from './pages/LandingPage/LandingPage';
import NavigationBar from './components/NavigationBar/NavigationBar';

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <LandingPage />
    </div>
  );
}

export default App;
