import Content from "./layouts/Content";
/* import DrawerMobileNavigation from "./layouts/Drawser"; */
import Header from "./layouts/Header";
import { Navbar } from "./layouts/Navbar";
import Sidebar from "./layouts/Sidebar";

const Layout = ({ children }) => {
  return (
    <Header>
      <Navbar />
      <Sidebar />
      {/* <DrawerMobileNavigation /> */}
      <Content>{children}</Content>
    </Header>
  );
};

export default Layout;
