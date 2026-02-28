import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Info from './pages/Info';
import Report from './pages/Report';
import Status from './pages/Status';
import Contact from './pages/Contact';
import Partner from './pages/Partner';

// Admin imports
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminReports from './pages/admin/AdminReports';
import AdminReportDetail from './pages/admin/AdminReportDetail';
import AdminInquiries from './pages/admin/AdminInquiries';

function App() {
    return (
        <Routes>
            {/* Public User Routes */}
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="report" element={<Report />} />
                <Route path="status" element={<Status />} />
                <Route path="info" element={<Info />} />
                <Route path="contact" element={<Contact />} />
                <Route path="partner" element={<Partner />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/ty-manage-desk/login" element={<AdminLogin />} />
            <Route path="/ty-manage-desk" element={<ProtectedRoute />}>
                <Route index element={<AdminDashboard />} />
                <Route path="reports" element={<AdminReports />} />
                <Route path="reports/:id" element={<AdminReportDetail />} />
                <Route path="inquiries" element={<AdminInquiries />} />
            </Route>

            {/* Catch-all route to redirect unknown paths to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default App;
