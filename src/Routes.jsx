import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import LandingPage from "pages/landing-page";
import LoginPage from "pages/login-page";
import UserRegistration from "pages/user-registration";
import OperationalPlanCreation from "pages/operational-plan-creation";
import UserDashboard from "pages/user-dashboard";
import AdminDashboard from "pages/admin-dashboard";
import AdministrativeNotifications from "pages/administrative-notifications";
import CreateLetter from "pages/administrative-notifications/create";
import SavedLetters from "pages/administrative-notifications/saved";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/login-page" element={<LoginPage />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route path="/operational-plan-creation" element={<OperationalPlanCreation />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        
        {/* Administrative Notifications Routes */}
        <Route path="/administrative-notifications" element={<AdministrativeNotifications />} />
        <Route path="/administrative-notifications/:type/create" element={<CreateLetter />} />
        <Route path="/administrative-notifications/:type/saved" element={<SavedLetters />} />
        
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;