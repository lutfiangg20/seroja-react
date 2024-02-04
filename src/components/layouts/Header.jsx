const Header = ({ children }) => {
  return (
    <div className="wrapper">
      {children}
      <footer className="main-footer">
        <strong>
          Copyright © 2023 <a href="#">Seroja</a>.
        </strong>
        All rights reserved.
        <div className="d-none d-sm-inline-block float-right">
          <b>Version</b> 1.0.0
        </div>
      </footer>
      <aside className="control-sidebar control-sidebar-dark"></aside>
    </div>
  );
};

export default Header;
