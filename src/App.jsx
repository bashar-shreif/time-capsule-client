import "./styles/utilities.css";
import "./styles/colors.css";
import "./styles/index.css";

import Landing from './pages/Landing';
import '@fontsource/sora';
import '@fontsource/sora/400.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';
import ProfilePage from './pages/Profile';
import Layout from './components/shared/Layout';
import Map from './pages/Map';
import NotFound from './pages/NotFound';
const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />

                <Route path="/" element={<Layout />}>
                    <Route path="home" element={<Home />} />
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="map" element={<Map />} />
                </Route>

                <Route path="*" element={<NotFound />} />

            </Routes>
        </BrowserRouter>
    );
};

export default App
