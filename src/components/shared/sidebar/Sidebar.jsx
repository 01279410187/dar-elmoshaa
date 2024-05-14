import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import { LIGHT_THEME } from "../../../constants/themeConstants";
import LogoBlue from "../../../../public/assets/images/logo_blue.svg";
import LogoBrown from "../../../../public/assets/images/logo_brown.svg";
import LogoDAR from "../../../../public/assets/images/Dar_logo.svg";
import LogoWhite from "../../../../public/assets/images/logo_white.svg";
import { useNavigate } from "react-router-dom";
import { CgDanger } from "react-icons/cg";

import {
  FaCodePullRequest,
  FaKitchenSet,
  FaWarehouse,
  FaCashRegister,
  FaTruckArrowRight,
  FaCalendarXmark
} from "react-icons/fa6";
import { BsCashCoin } from "react-icons/bs";

import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { GiTomato } from "react-icons/gi";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { MdDelete, MdLogout } from "react-icons/md";

import { TbReport, TbBrandUnity, TbReportSearch } from "react-icons/tb";
import {
  MdOutlineClose,
  MdOutlineLogout,
  MdPerson,
  MdProductionQuantityLimits,
  MdTableBar,
} from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.scss";
import { SidebarContext } from "../../../context/SidebarContext";
import { useTranslation } from "react-i18next";
import { RightOutlined } from "@ant-design/icons";

const Sidebar = () => {
  const { theme } = useContext(ThemeContext);
  const { closeSidebar } = useContext(SidebarContext);
  const navbarRef = useRef(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [activeLink, setActiveLink] = useState(pathname); // State to track active link

  const [display, setDisplay] = useState("d-block");
  const [sidebarWidth, setSidebarWidth] = useState("w-defualt");
  const [arrowDirection, setArrowDirection] = useState("");
  const [justifyContent, setJustifyContent] = useState("d-flex-start");
  const { wrapperMargin, toggleWrapperMargin } = useContext(SidebarContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/login");
  };
  // Handle clicking on menu links
  const handleMenuLinkClick = (link) => {
    setActiveLink(link);
  };

  // closing the navbar when clicked outside the sidebar area
  const handleClickOutside = (event) => {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target) &&
      event.target.className !== "sidebar-oepn-btn"
    ) {
      // closeSidebar();
    }
  };

  const handleCloseSidebar = () => {
    {
      display === "d-block" ? setDisplay("d-none") : setDisplay("d-block");
    }
    {
      sidebarWidth === "w-auto"
        ? setSidebarWidth("w-defualt")
        : setSidebarWidth("w-auto");
    }
    {
      arrowDirection === "rotate-y-180"
        ? setArrowDirection("")
        : setArrowDirection("rotate-y-180");
    }
    {
      justifyContent === "d-flex-start"
        ? setJustifyContent("d-justify-center")
        : setJustifyContent("d-flex-start");
    }
    toggleWrapperMargin(); // Call toggleWrapperMargin from context
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className={`sidebar ${sidebarWidth}`} ref={navbarRef}>
      <div className="sidebar-top">
        <div className="sidebar-brand">
          <img src={LogoDAR} alt="" />
          <span className={`sidebar-brand-text ${display}`}>دار المشاه</span>
        </div>
        <div className={`arrows ${arrowDirection}`}>
          <RightOutlined
            className={`arrow-right `}
            onClick={() => {
              handleCloseSidebar();
            }}
          />
          {/* <i class="arrow right"></i> */}
          {/* <i class="arrow left"></i> */}
        </div>
        <button className="sidebar-close-btn">
          <MdOutlineClose size={24} />
        </button>
      </div>
      <div className="sidebar-body">
        <div className="sidebar-menu">
          <ul className="menu-list">
            <li className="menu-item" title="الموردين">
              <Link
                to="/warehouse/suppliers/show-suppliers"
                // className={`menu-link ${active? active: ""}`} onClick={handleActiveClass}
                className={`menu-link ${activeLink === "/warehouse/suppliers/show-suppliers"
                  ? "active"
                  : ""
                  } ${justifyContent}`}
                onClick={() => {
                  console.log("show-suppliers");
                  handleMenuLinkClick("/warehouse/suppliers/show-suppliers");
                }}
              >
                <span className="menu-link-icon">
                  <FaTruckArrowRight size={30} />
                </span>
                <span
                  className={`menu-link-text ${display}`}
                  style={{ fontSize: "20px" }}
                >
                  الموردين
                </span>
              </Link>
            </li>
            <li className="menu-item" title="اقسام المخزن">
              <Link
                to="/warehouse/recipes/show-departments"
                className={`menu-link ${activeLink === "/warehouse/recipes/show-departments"
                  ? "active"
                  : ""
                  } ${justifyContent}`}
                onClick={() => {
                  console.log("show-departments");
                  handleMenuLinkClick("/warehouse/recipes/show-departments");
                }}
              >
                <span className="menu-link-icon">
                  <GiTomato size={30} />
                </span>
                <span
                  className={`menu-link-text ${display}`}
                  style={{ fontSize: "20px" }}
                >
                  اقسام المخزن
                </span>
              </Link>
            </li>

            <li className="menu-item" title="الفواتير">
              <Link
                to="/warehouse/invoices/show"
                className={`menu-link ${activeLink === "/warehouse/invoices/show" ? "active" : ""
                  } ${justifyContent}`}
                onClick={() => handleMenuLinkClick("/warehouse/invoices/show")}
              >
                <span className="menu-link-icon">
                  <TbReport size={30} />
                </span>
                <span
                  className={`menu-link-text ${display}`}
                  style={{ fontSize: "20px" }}
                >
                  الفواتير
                </span>
              </Link>
            </li>


            <li className="menu-item" title="الهالك">
              <Link
                to="/warehouse/invoices/show-tained"
                className={`menu-link ${activeLink === "/warehouse/invoices/show-tained" ? "active" : ""
                  } ${justifyContent}`}
                onClick={() => handleMenuLinkClick("/warehouse/invoices/show-tained")}
              >
                <span className="menu-link-icon">
                  <MdDelete size={30} />
                </span>
                <span
                  className={`menu-link-text ${display}`}
                  style={{ fontSize: "20px" }}
                >
                  الهالك
                </span>
              </Link>
            </li>

            <li className="menu-item" title="المدفوعات">
              <Link
                to="/warehouse/payable/show-payable"
                className={`menu-link ${activeLink === "/warehouse/payable/show-payable" ? "active" : ""
                  } ${justifyContent}`}
                onClick={() => handleMenuLinkClick("/warehouse/payable/show-payable")}
              >
                <span className="menu-link-icon">
                  <BsCashCoin size={30} />
                </span>
                <span
                  className={`menu-link-text ${display}`}
                  style={{ fontSize: "20px" }}
                >
                  المدفوعات
                </span>
              </Link>
            </li>
            <li className="menu-item" title="الطلبات">
              <Link
                to="/warehouse/requests/show-requests"
                className={`menu-link ${activeLink === "/warehouse/requests/show-requests"
                  ? "active"
                  : ""
                  } ${justifyContent}`}
                onClick={() =>
                  handleMenuLinkClick("/warehouse/requests/show-requests")
                }
              >
                <span className="menu-link-icon">
                  <FaCodePullRequest size={30} />
                </span>
                <span
                  className={`menu-link-text ${display}`}
                  style={{ fontSize: "20px" }}
                >
                  الطلبات
                </span>
              </Link>
            </li>
            <li className="menu-item" title="الكاشير">
              <Link
                to="/warehouse/cashier/create-order"
                className={`menu-link ${activeLink === "/warehouse/cashier/create-order"
                  ? "active"
                  : ""
                  } ${justifyContent}`}
                onClick={() => {
                  console.log("show-departments");
                  handleMenuLinkClick("/warehouse/cashier/create-order");
                }}
              >
                <span className="menu-link-icon">
                  <FaCashRegister size={30} />
                </span>
                <span
                  className={`menu-link-text ${display}`}
                  style={{ fontSize: "20px" }}
                >
                  الكاشير
                </span>
              </Link>
            </li>
            <li className="menu-item" title="ترابيزات مفتوحة">
              <Link
                to="/warehouse/cashier/opened-tables"
                className={`menu-link ${activeLink === "/warehouse/cashier/opened-tables"
                  ? "active"
                  : ""
                  } ${justifyContent}`}
                onClick={() =>
                  handleMenuLinkClick("/warehouse/cashier/opened-tables")
                }
              >
                <span className="menu-link-icon">
                  <MdTableBar size={30} />
                </span>
                <span
                  className={`menu-link-text ${display}`}
                  style={{ fontSize: "20px" }}
                >
                  ترابيزات مفتوحة
                </span>
              </Link>
            </li>
            <li className="menu-item" title=" طلبات المخزن">
              <Link
                to="/warehouse/cashier/warehouse-requests"
                className={`menu-link ${activeLink === "/warehouse/cashier/warehouse-requests"
                  ? "active"
                  : ""
                  } ${justifyContent}`}
                onClick={() =>
                  handleMenuLinkClick("/warehouse/cashier/warehouse-requests")
                }
              >
                <span className="menu-link-icon">
                  <FaWarehouse size={30} />
                </span>
                <span
                  className={`menu-link-text special-txt ${display}`}
                  style={{ fontSize: "20px" }}
                >
                  طلبات المخزن
                </span>
              </Link>
            </li>
            <li className="menu-item" title="طلبات المطبخ">
              <Link
                to="/warehouse/cashier/kitchen-requests"
                className={`menu-link ${activeLink === "/warehouse/cashier/kitchen-requests"
                  ? "active"
                  : ""
                  } ${justifyContent}`}
                onClick={() =>
                  handleMenuLinkClick("/warehouse/cashier/kitchen-requests")
                }
              >
                <span className="menu-link-icon">
                  <FaKitchenSet size={30} />
                </span>
                <span
                  className={`menu-link-text special-txt ${display}`}
                  style={{ fontSize: "20px" }}
                >
                  الاوردارات
                </span>
              </Link>
            </li>
            <li className="menu-item" title=" حد الامان">
              <Link
                to="/warehouse/underLimit/show-under-limit"
                className={`menu-link ${activeLink === "/warehouse/underLimit/show-under-limit"
                  ? "active"
                  : ""
                  } ${justifyContent}`}
                onClick={() =>
                  handleMenuLinkClick("/warehouse/underLimit/show-under-limit")
                }
              >
                <span className="menu-link-icon">
                  <AiOutlineSafetyCertificate size={30} />
                </span>
                <span
                  className={`menu-link-text ${display}`}
                  style={{ fontSize: "20px" }}
                >
                  حد الامان

                </span>
                <CgDanger size={30} style={{ color: "red" }} />
              </Link>
            </li>

            <li className="menu-item" title=" حد الامان">
              <Link
                to="/warehouse/underLimit/show-under-limit/show-expire-limit"
                className={`menu-link ${activeLink === "/warehouse/underLimit/show-under-limit/show-expire-limit"
                  ? "active"
                  : ""
                  } ${justifyContent}`}
                onClick={() =>
                  handleMenuLinkClick("/warehouse/underLimit/show-under-limit/show-expire-limit")
                }
              >
                <span className="menu-link-icon">
                  <FaCalendarXmark size={30} />
                </span>
                <span
                  className={`menu-link-text ${display}`}
                  style={{ fontSize: "20px" }}
                >
                  حد الصلاحية

                </span>
                <CgDanger size={30} style={{ color: "red" }} />
              </Link>
            </li>




            <li className="menu-item" title="المنتجات">
              <Link
                to="/warehouse/returants/show-resturants"
                className={`menu-link ${activeLink === "/warehouse/returants/show-resturants"
                  ? "active"
                  : ""
                  } ${justifyContent}`}
                onClick={() => {
                  console.log("show-departments");
                  handleMenuLinkClick("/warehouse/returants/show-resturants");
                }}
              >
                <span className="menu-link-icon">
                  <MdProductionQuantityLimits size={30} />
                </span>
                <span
                  className={`menu-link-text ${display}`}
                  style={{ fontSize: "20px" }}
                >
                  المنتجات
                </span>
              </Link>
            </li>

            <li className="menu-item" title="القارير">
              <Link
                to="/warehouse/reports/show-reports"
                className={`menu-link ${activeLink === "/warehouse/reports/show-reports"
                  ? "active"
                  : ""
                  } ${justifyContent}`}
                onClick={() =>
                  handleMenuLinkClick("/warehouse/reports/show-reports")
                }
              >
                <span className="menu-link-icon">
                  <TbReportSearch size={30} />
                </span>
                <span
                  className={`menu-link-text ${display}`}
                  style={{ fontSize: "20px" }}
                >
                  التقارير
                </span>
              </Link>
            </li>

            <li className="menu-item" title="المنافذ">
              <Link
                to="/warehouse/departments/show-departments"
                className={`menu-link ${activeLink === "/warehouse/departments/show-departments"
                  ? "active"
                  : ""
                  } ${justifyContent}`}
                onClick={() =>
                  handleMenuLinkClick("/warehouse/departments/show-departments")
                }
              >
                <span className="menu-link-icon">
                  <HiOutlineOfficeBuilding size={30} />
                </span>
                <span
                  className={`menu-link-text ${display}`}
                  style={{ fontSize: "20px" }}
                >
                  المنافذ
                </span>
              </Link>
            </li>

            <li className="menu-item" title="الوحدات">
              <Link
                to="/warehouse/units/show-units"
                className={`menu-link ${activeLink === "/warehouse/units/show-units"
                  ? "active"
                  : ""
                  } ${justifyContent}`}
                onClick={() =>
                  handleMenuLinkClick("/warehouse/units/show-units")
                }
              >
                <span className="menu-link-icon">
                  <TbBrandUnity size={30} />
                </span>
                <span
                  className={`menu-link-text ${display}`}
                  style={{ fontSize: "20px" }}
                >
                  الوحدات
                </span>
              </Link>
            </li>

            <li className="menu-item" title="تسجيل خروج">
              <button className={`menu-link logout ${activeLink === "/warehouse/*"
                ? "active"
                : ""
                } ${justifyContent}`} onClick={handleLogout}>
                <span className="menu-link-icon">
                  <MdLogout size={30} />
                </span>
                {/* <button onClick={handleLogout} style={{ fontSize: "20px", }}> */}
                <span
                  className={`menu-link-text ${display}`}
                  style={{ fontSize: "20px" }}
                >
                  تسجيل خروج
                </span>
                {/* </button> */}
              </button>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
