import React from 'react';
import { Helmet } from 'react-helmet';
import Login from './components/Login';
import Search from './components/Search';
import Messaging from './components/Messaging';
import Booking from './components/Booking';
import Payment from './components/Payment';
import Logistics from './components/Logistics';
import Verification from './components/Verification';
import Advertising from './components/Advertising';
import Analytics from './components/Analytics';
import EmailSignup from './components/EmailSignup';
import Referral from './components/Referral';
import Share from './components/Share';

function App() {
  return (
    <div className="container">
      <Helmet>
        <title>Repair Platform - Fix Electronics, Textiles, Footwear</title>
        <meta name="description" content="Connect with verified artisans for repairs or get DIY tips." />
        <meta name="keywords" content="repair, artisans, electronics, textiles, footwear" />
      </Helmet>
      <h1>Repair Platform</h1>
      <Login />
      <Search />
      <Messaging receiverId={1} /> {/* Replace with dynamic ID */}
      <Booking artisanId={1} />   {/* Replace with dynamic ID */}
      <Payment />
      <Logistics artisanId={1} /> {/* Replace with dynamic ID */}
      <Verification />
      <Advertising />
      <Analytics />
      <EmailSignup />
      <Referral />
      <Share />
    </div>
  );
}

export default App;
