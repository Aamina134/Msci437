import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Analysis from '../Page3';
import Planning from '../Page2';
import HomePage from '../Page1';

export default function PrivateRoute({ authenticated }) {
    return (
        <Router>
            <Routes>
                <Route path="/" element={authenticated ? <HomePage /> : <Navigate to="/" />} />
                <Route path="/Planning" element={<Planning />} />
                <Route path="/Analysis" element={<Analysis />} />
                {/* Handle 404 - Not Found */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}
/*(
  <LandingPage {...props} {...rest} />
  )*/

