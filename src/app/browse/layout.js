import Navbar from "../components/navbar";
import Footer from "../components/footer";
import VideoOverlay from "../components/videoOverlay";
import CustomVideoPlayer from '../components/backgroundVideo'

const Layout = ({ children }) => {
    return (
        <div>
        
            <main>{children}</main>

        </div>
    );
};

export default Layout;
