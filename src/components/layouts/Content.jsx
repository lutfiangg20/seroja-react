import { useLocation } from "react-router-dom";

const Content = ({ children }) => {
  const location = useLocation();
  const last = location.pathname.split("/")[1];
  const first = location.pathname.split("/")[2];
  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0 text-capitalize">{!first ? last : first}</h1>
            </div>
            {/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">{last}</a>
                </li>
                <li className="breadcrumb-item active">{first}</li>
              </ol>
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </div>
      {/* /.content-header */}
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">{children}</div>
        {/* /.container-fluid */}
      </section>
      {/* /.content */}
    </div>
  );
};

export default Content;
