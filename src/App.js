import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { UserContextProvider } from './context/UserContext';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.scss';
import Home from './Home';
import * as All from './assets/components/forms';
import ScrollToTop from './assets/components/ScrollToTop';
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
import Footer from './assets/components/Footer';
import Contact from './customer pages/Contact';
import SiteNav from './assets/components/SiteNav';
import PasswordUpdate from './customer pages/PasswordUpdate';
import PasswordReset from './customer pages/PasswordReset';

function App() {
  return (
    <UserContextProvider>
    <Router>
      <SiteNav />
      <ScrollToTop />
        <Container fluid className='p-0 layout'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/product-description-template' element={<Layout title="Product Description Template" instructions="Use the form below to have Kenzo generate a SEO friendly product description for your product." form={<All.ProductDescForm />} />} />
            <Route path='/product-title-template' element={<Layout title="Product Name Template" instructions="Use the form below to generate a creative name for your new product." form={<All.ProductTitleForm />} />} />
            <Route path='/business-name-template' element={<Layout title="Business Name Template" instructions="Use the form below to generate a creative name for your business." form={<All.NameForm />} />} />
            <Route path='/business-slogan-template' element={<Layout title="Business Slogan Template" instructions="Use the form below to generate a creative slogan for your business." form={<All.BrandSloganForm />} />} />
            <Route path='/image-template' element={<Layout title="AI Art Creation Template" instructions="Use the form below to create a unique image with Kenzo." form={<All.ImageForm />} />} />
            <Route path='/social-media-strategy-template' element={<Layout title="Social Media Strategy Template" instructions="Use the form below to create an effective social media strategy for your brand." form={<All.SocialMediaStrategyForm />} />} />
            <Route path='/social-media-post-template' element={<Layout title="Social Media Post Template" instructions="Use the form below to create an effective social media post" form={<All.SocialMediaPostForm />} />} />
            <Route path='/social-media-content-format-template' element={<Layout title="Social Media Content Format Template" instructions="Use the form below to create a list of new unique content formats for your brand." form={<All.SocialMediaContentFormatForm />} />} />
            <Route path='/youtube-script-template' element={<Layout title="YouTube Script Outline Template" instructions="Use the form below to create a unique script outline for your YouTube video." form={<All.YTScriptForm />} />} />
            <Route path='/youtube-topic-template' element={<Layout title="YouTube Topic Template" instructions="Use the form below to create a list of topics for your YouTube video." form={<All.YTTopicForm />} />} />
            <Route path='/youtube-title-template' element={<Layout title="YouTube Title Template" instructions="Use the form below to create a list of titles for your YouTube video." form={<All.YTTitleForm />} />} />
            <Route path='/youtube-description-template' element={<Layout title="YouTube Description Template" instructions="Use the form below to a list of descriptions for your YouTube video." form={<All.YTDescriptionForm />} />} />
            <Route path='/register' element={<Register />} />
            <Route path='/vip-register' element={<VIPRegister />} />
            <Route path='/login' element={<Login />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/update-password' element={<PasswordUpdate />} />
            <Route path='/reset-password' element={<PasswordReset />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/success/*' element={<Success />} />
            <Route path='/support' element={<Support />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/cancel' element={<Cancel />} />
            <Route path='/*' element={<Error />} />
          </Routes>
        </Container>
      <Footer />
    </Router>
    </UserContextProvider>
  );
}

export default App;
