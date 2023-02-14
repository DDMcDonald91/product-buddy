import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './navigation/Navigation';
import Home from './Home';
import Ecommerce from './generators/Ecommerce';
import ProductTitle from './generators/ProductTitle';
import BusinessName from './generators/BusinessName';
import ImageGenerator from './generators/ImageGenerator';
import Success from './customer pages/Success';
import Cancel from './customer pages/Cancel';
import Checkout from './customer pages/Checkout';
import Dashboard from './customer pages/Dashboard';
import Register from './customer pages/Register';
import Login from './customer pages/Login';
import Profile from './customer pages/Profile';
import YTScriptGenerator from './generators/YTScriptGenerator';
import YTTopicGenerator from './generators/YTTopicGenerator';
import YTTitleGenerator from './generators/YTTitleGenerator';
import YTDescriptionGenerator from './generators/YTDescriptionGenerator';
import Error from './customer pages/Error';


function App() {
  return (
    <Router>
      <Navigation />
    <Container fluid className='p-0'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/ecommerce-generator' element={<Ecommerce />} />
        <Route path='/title-generator' element={<ProductTitle />} />
        <Route path='/business-name-generator' element={<BusinessName />} />
        <Route path='/image-generator' element={<ImageGenerator />} />
        <Route path='/youtube-script-generator' element={<YTScriptGenerator />} />
        <Route path='/youtube-topic-generator' element={<YTTopicGenerator />} />
        <Route path='/youtube-title-generator' element={<YTTitleGenerator />} />
        <Route path='/youtube-description-generator' element={<YTDescriptionGenerator />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/success/*' element={<Success />} />
        <Route path='/cancel' element={<Cancel />} />
        <Route path='/*' element={<Error />} />
      </Routes>
    </Container>
    </Router>
  );
}

export default App;
