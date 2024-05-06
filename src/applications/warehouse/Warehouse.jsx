import { Outlet, Link, useLocation } from "react-router-dom";
import Sidebar from "../../components/shared/sidebar/Sidebar";
import { ArrowLeftOutlined } from '@ant-design/icons';

const Warehouse = () => {
  const location = useLocation();

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <>
      <Sidebar />
      <div className="content-wrapper">
        <button className="back-arrow" onClick={handleGoBack}>
          <ArrowLeftOutlined />

        </button>
        <Outlet />
      </div>
    </>
  );
};

export default Warehouse;
