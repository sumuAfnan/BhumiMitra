import './App.css';
import { Routes, Route } from 'react-router-dom';

// Admin Pages
import AdminLogin from './components/AdminLogin';

import AdminResetPassword from './components/AdminResetPassword';
import AdminNewPass from './components/AdminNewPass';

// Citizen Pages
import CitizenLogin from './components/CitizenLogin';
import UserPortal from './components/UserPortal';
import CitizenResetPassword from './components/CitizenResetPassword';
import CitizenNewPass from './components/CitizenNewPass';

// Other Pages Start Here
import Home from './components/layout/Home';
import AboutT from './components/AboutT';
import FAQ from './components/FAQ';
import Registration from './components/Registration';
import LandRegistrationForm from './components/LandRegistrationForm';
import LandRegistryPortal from './components/LandRegistryPortal';
import Header from './components/Header';
// Other Pages Start Close

import AdminDashboard from './components/AdminDashboard';
import RegistryOfficerLogin from './components/RegistryOfficerLogin';
import ComplaintOfficerLogin from './components/ComplaintOfficerLogin';
import OwnershipOfficerLogin from './components/OwnershipOfficerLogin';
import RegistryOfficerPortal from './components/RegistryOfficerPortal'; 
import OwnershipTransferPortal from './components/OwnershipTransferPortal';
import OwnershipOfficerPortal from './components/OwnershipOfficerPortal';
import LandServicesPortal from './components/LandServicesPortal';
import Aboutlink from './components/Aboutlink';
//
import PublicLayout from './components/layout/PublicLayout';
import NoHeaderLayout from './components/layout/NoHeaderLayout';
import ComplaintPortal from './components/ComplaintPortal';
import LuxeHeader from './components/LuxeHeader';

function App() {
  return (
    
      
      <Routes>
         {/* Pages WITH header */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<><Home />    </>} />
         
        {/* Admin Routes */}
      
      
      
    

        {/* Citizen Routes */}
   
        <Route path="/userportal" element={ <UserPortal /> } />

       
     
       <Route path="/OwnershipPortal" element={<OwnershipTransferPortal/>} />
      



        {/* Other Pages */}
        <Route path="/about" element={<AboutT />} />
        <Route path="/faq" element={<FAQ />} />
        
   
        <Route path="/portal" element={<LandRegistryPortal />} />
         

</Route>
       
    {/* Pages WITHOUT header */}
      <Route element={<NoHeaderLayout />}>
          <Route path="/aboutlink" element={<Aboutlink />} />
           <Route path="/RegistryOfficer" element={<RegistryOfficerPortal />} />
            <Route path="/comportal" element={<ComplaintPortal/>} />
            <Route path="/loginRegistryOfficer" element={<> <RegistryOfficerLogin/></>} />
        <Route path="/loginComplaintOfficer" element={<> <ComplaintOfficerLogin/>  </>} />
       <Route path="/loginOwnershipOfficer" element={<> <OwnershipOfficerLogin/>  </>} />
         <Route path="/loginAdmin" element={<AdminLogin />} />
           <Route path="/reset-password" element={<AdminResetPassword />} />
        <Route path="/reset-adminnewpassword" element={<AdminNewPass />} />
             <Route path="/loginCitizen" element={<CitizenLogin />} />
        <Route path="/reset-password-citizen" element={<CitizenResetPassword />} />
        <Route path="/reset-newpassword" element={<CitizenNewPass />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
         <Route path="/OwnershipOfficer"  element={<OwnershipOfficerPortal/>} />
              <Route path="/land-form" element={<LandRegistrationForm />} />
              <Route path="/h" element={<LuxeHeader/>} />
      </Route>

      </Routes>
   
  );
}

export default App;
