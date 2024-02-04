import Content from "./layouts/Content";
import Header from "./layouts/Header";
import { Navbar } from "./layouts/Navbar";
import Sidebar from "./layouts/Sidebar";

const Layout = ({ children }) => {
  return (
    <Header>
      <Navbar />
      <Sidebar />
      <Content>{children}</Content>
    </Header>
  );
};

export default Layout;
