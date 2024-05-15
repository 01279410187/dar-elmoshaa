import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import LogoDAR from "../../../../public/assets/images/Dar_logo.svg";
import { MdAssignmentLate } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { CgDanger } from "react-icons/cg";

import {
  FaCodePullRequest,
  FaKitchenSet,
  FaWarehouse,
  FaCashRegister,
  FaTruckArrowRight,
  FaCalendarXmark,
} from "react-icons/fa6";
import { FaUserCircle, FaUser } from "react-icons/fa";
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
import { useAuth } from "../../../context/AuthContext";
const Sidebar = () => {
  const { theme } = useContext(ThemeContext);
  const { closeSidebar } = useContext(SidebarContext);
  const navbarRef = useRef(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [activeLink, setActiveLink] = useState(pathname); // State to track active link
  const { user } = useAuth();
  const [display, setDisplay] = useState("d-block");
  const [sidebarWidth, setSidebarWidth] = useState("w-defualt");
  const [arrowDirection, setArrowDirection] = useState("");
  const [justifyContent, setJustifyContent] = useState("d-flex-start");
  const { wrapperMargin, toggleWrapperMargin } = useContext(SidebarContext);
  const checkMenuItemPermission = (requiredPermission) => {
    return user
      ? user?.permissions.some(
        (permission) => permission.name === requiredPermission.name
      )
      : false;
  };
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
          <div>
            <FaUser size={30} />
            <span>{user?.name}</span>
          </div>
          <ul className="menu-list">
            <li
              className="menu-item"
              title="الموردين"
              style={{
                display: `${checkMenuItemPermission({
                  id: 88,
                  name: "view suppliers",
                })
                  ? ""
                  : "none"
                  }`,
              }}
            >
              <Link
                to="/warehouse/suppliers/show-suppliers"
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
            <li
              className="menu-item"
              title="اقسام المخزن"
              style={{
                display: `${checkMenuItemPermission({
                  id: 135,
                  name: "view departments",
                })
                  ? ""
                  : "none"
                  }`,
              }}
            >
              <Link
                to="/warehouse/recipes/show-departments"
                className={`menu-link ${activeLink === "/warehouse/recipes/show-departments"
                  ? "active"
                  : ""
                  } ${justifyContent}`}
                onClick={() => {

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

            <li
              className="menu-item"
              title="الفواتير"
              style={{
                display: `${checkMenuItemPermission({
                  id: 140,
                  name: "view invoices",
                })
                  ? ""
                  : "none"
                  }`,
              }}
            >
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
                className={`menu-link ${activeLink === "/warehouse/invoices/show-tained"
                  ? "active"
                  : ""
                  } ${justifyContent}`}
                onClick={() =>
                  handleMenuLinkClick("/warehouse/invoices/show-tained")
                }
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
                className={`menu-link ${activeLink === "/warehouse/payable/show-payable"
                  ? "active"
                  : ""
                  } ${justifyContent}`}
                onClick={() =>
                  handleMenuLinkClick("/warehouse/payable/show-payable")
                }
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
            <li
              className="menu-item"
              title="الكاشير"
              style={{
                display: `${checkMenuItemPermission({
                  id: 124,
                  name: "add orders",
                })
                  ? ""
                  : "none"
                  }`,
              }}
            >
              <Link
                to="/warehouse/cashier/create-order"
                className={`menu-link ${activeLink === "/warehouse/cashier/create-order"
                  ? "active"
                  : ""
                  } ${justifyContent}`}
                onClick={() => {

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
            <li
              className="menu-item"
              title="ترابيزات مفتوحة"
              style={{
                display: `${checkMenuItemPermission({
                  id: 124,
                  name: "add orders",
                })
                  ? ""
                  : "none"
                  }`,
              }}
            >
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

            <li
              className="menu-item"
              title="طلبات المطبخ"
              style={{
                display: `${checkMenuItemPermission({
                  id: 124,
                  name: "add orders",
                })
                  ? ""
                  : "none"
                  }`,
              }}
            >
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
                  الأوردرات
                </span>
              </Link>
            </li>
            <li
              className="menu-item"
              title=" حد الامان"
              style={{
                display: `${checkMenuItemPermission({
                  id: 85,
                  name: "safe limit",
                })
                  ? ""
                  : "none"
                  }`,
              }}
            >
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

            <li
              className="menu-item"
              title=" حد الامان"
              style={{
                display: `${checkMenuItemPermission({
                  id: 86,
                  name: "safe limit",
                })
                  ? ""
                  : "none"
                  }`,
              }}
            >
              <Link
                to="/warehouse/underLimit/show-under-limit/show-expire-limit"
                className={`menu-link ${activeLink ===
                  "/warehouse/underLimit/show-under-limit/show-expire-limit"
                  ? "active"
                  : ""
                  } ${justifyContent}`}
                onClick={() =>
                  handleMenuLinkClick(
                    "/warehouse/underLimit/show-under-limit/show-expire-limit"
                  )
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

            <li
              className="menu-item"
              title="المنتجات"
              style={{
                display: `${checkMenuItemPermission({
                  id: 93,
                  name: "view categories",
                })
                  ? ""
                  : "none"
                  }`,
              }}
            >
              <Link
                to="/warehouse/returants/show-resturants"
                className={`menu-link ${activeLink === "/warehouse/returants/show-resturants"
                  ? "active"
                  : ""
                  } ${justifyContent}`}
                onClick={() => {

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

            <li
              className="menu-item"
              title="الأدوار"
              style={{
                display: `${checkMenuItemPermission({
                  id: 113,
                  name: "view requests",
                })
                  ? ""
                  : "none"
                  }`,
              }}
            >
              <Link
                to="/warehouse/users/show-users"
                className={`menu-link ${activeLink === "/warehouse/users/show-users" ? "active" : ""
                  } ${justifyContent}`}
                onClick={() => {

                  handleMenuLinkClick("/warehouse/users/show-users");
                }}
              >
                <span className="menu-link-icon">
                  <MdAssignmentLate size={30} />
                </span>
                <span
                  className={`menu-link-text ${display}`}
                  style={{ fontSize: "20px" }}
                >
                  المستخدمين
                </span>
              </Link>
            </li>
            <li
              className="menu-item"
              title="الأدوار"
              style={{
                display: `${checkMenuItemPermission({
                  id: 110,
                  name: "view orders",
                })
                  ? ""
                  : "none"
                  }`,
              }}
            >
              <Link
                to="/warehouse/roles/show-roles"
                className={`menu-link ${activeLink === "/warehouse/roles/show-roles" ? "active" : ""
                  } ${justifyContent}`}
                onClick={() => {

                  handleMenuLinkClick("/warehouse/roles/show-roles");
                }}
              >
                <span className="menu-link-icon">
                  <MdAssignmentLate size={30} />
                </span>
                <span
                  className={`menu-link-text ${display}`}
                  style={{ fontSize: "20px" }}
                >
                  الأدوار
                </span>
              </Link>
            </li>
            <li
              className="menu-item"
              title="طرق الدفع"
              style={{
                display: `${checkMenuItemPermission({
                  id: 123,
                  name: "view orders",
                })
                  ? ""
                  : "none"
                  }`,
              }}
            >
              <Link
                to="/warehouse/clients/payment-method"
                className={`menu-link ${activeLink === "/warehouse/clients/payment-method"
                  ? "active"
                  : ""
                  } ${justifyContent}`}
                onClick={() => {

                  handleMenuLinkClick("/warehouse/clients/payment-method");
                }}
              >
                <span className="menu-link-icon">
                  <MdAssignmentLate size={30} />
                </span>
                <span
                  className={`menu-link-text ${display}`}
                  style={{ fontSize: "20px" }}
                >
                  طرق الدفع
                </span>
              </Link>
            </li>
            <li
              className="menu-item"
              title="أنواع العملاء"
              style={{
                display: `${checkMenuItemPermission({
                  id: 123,
                  name: "view orders",
                })
                  ? ""
                  : "none"
                  }`,
              }}
            >
              <Link
                to="/warehouse/clients/client-type"
                className={`menu-link ${activeLink === "/warehouse/clients/client-type"
                  ? "active"
                  : ""
                  } ${justifyContent}`}
                onClick={() => {

                  handleMenuLinkClick("/warehouse/clients/client-type");
                }}
              >
                <span className="menu-link-icon">
                  <MdAssignmentLate size={30} />
                </span>
                <span
                  className={`menu-link-text ${display}`}
                  style={{ fontSize: "20px" }}
                >
                  أنواع العملاء
                </span>
              </Link>
            </li>
            <li
              className="menu-item"
              title="أنواع العملاء"
              style={{
                display: `${checkMenuItemPermission({
                  id: 123,
                  name: "view orders",
                })
                  ? ""
                  : "none"
                  }`,
              }}
            >
              <Link
                to="/warehouse/clients/client"
                className={`menu-link ${activeLink === "/warehouse/clients/client" ? "active" : ""
                  } ${justifyContent}`}
                onClick={() => {

                  handleMenuLinkClick("/warehouse/clients/client");
                }}
              >
                <span className="menu-link-icon">
                  <MdAssignmentLate size={30} />
                </span>
                <span
                  className={`menu-link-text ${display}`}
                  style={{ fontSize: "20px" }}
                >
                  العملاء
                </span>
              </Link>
            </li>
            <li
              className="menu-item"
              title="طرق الدفع"
              style={{
                display: `${checkMenuItemPermission({
                  id: 123,
                  name: "view orders",
                })
                  ? ""
                  : "none"
                  }`,
              }}
            >
              <Link
                to="/warehouse/clients/discount-reason"
                className={`menu-link ${activeLink === "/warehouse/clients/discount-reason"
                  ? "active"
                  : ""
                  } ${justifyContent}`}
                onClick={() => {

                  handleMenuLinkClick("/warehouse/clients/discount-reason");
                }}
              >
                <span className="menu-link-icon">
                  <MdAssignmentLate size={30} />
                </span>
                <span
                  className={`menu-link-text ${display}`}
                  style={{ fontSize: "20px" }}
                >
                  أسباب الخصم
                </span>
              </Link>
            </li>


            <li className="menu-item" title="التقارير">
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
                className={`menu-link ${activeLink === "/warehouse/units/show-units" ? "active" : ""
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
              <button
                className={`menu-link logout ${activeLink === "/warehouse/*" ? "active" : ""
                  } ${justifyContent}`}
                onClick={handleLogout}
              >
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
