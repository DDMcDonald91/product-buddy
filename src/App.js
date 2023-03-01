import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { UserContextProvider } from './context/UserContext';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './navigation/Navigation';
import Home from './Home';
import * as All from './form';
import Success from './customer pages/Success';
import Cancel from './customer pages/Cancel';
import Checkout from './customer pages/Checkout';
import Dashboard from './customer pages/Dashboard';
import Register from './customer pages/Register';
import Login from './customer pages/Login';
import Profile from './customer pages/Profile';
import Support from './customer pages/Support';
import Layout from './assets/components/Layout';
import Error from './customer pages/Error';
import VIPRegister from './customer pages/VIPRegister';


function App() {
  return (
    <UserContextProvider>
    <Router>
      <Navigation />
    <Container fluid className='p-0'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/ecommerce-generator' element={<Layout title="Product Description Generator" instructions="Use the form below to have Keni generate a SEO friendly product description for your product." form={<All.AIForm />} />} />
        <Route path='/title-generator' element={<Layout title="Product Name Generator" instructions="Use the form below to generate a creative name for your new product." form={<All.TitleForm />} />} />
        <Route path='/business-name-generator' element={<Layout title="Business Name Generator" instructions="Use the form below to generate a creative name for your business." form={<All.NameForm />} />} />
        <Route path='/image-generator' element={<Layout title="AI Art Creation Generator" instructions="Use the form below to create a unique image with Keni." form={<All.ImageForm />} />} />
        <Route path='/youtube-script-generator' element={<Layout title="YouTube Script Outline Generator" instructions="Use the form below to create a unique script outline for your YouTube video." form={<All.YTScriptForm />} />} />
        <Route path='/youtube-topic-generator' element={<Layout title="YouTube Topic Generator" instructions="Use the form below to create a list of topics for your YouTube video." form={<All.YTTopicForm />} />} />
        <Route path='/youtube-title-generator' element={<Layout title="YouTube Title Generator" instructions="Use the form below to create a list of titles for your YouTube video." form={<All.YTTitleForm />} />} />
        <Route path='/youtube-description-generator' element={<Layout title="YouTube Description Generator" instructions="Use the form below to a list of descriptions for your YouTube video." form={<All.YTDescriptionForm />} />} />
        <Route path='/register' element={<Register />} />
        <Route path='/vip-register' element={<VIPRegister />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/success/*' element={<Success />} />
        <Route path='/support' element={<Support />} />
        <Route path='/cancel' element={<Cancel />} />
        <Route path='/*' element={<Error />} />
      </Routes>
    </Container>
    </Router>
    </UserContextProvider>
  );
}

export default App;
