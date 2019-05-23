// @material-ui/icons
import Timeline from "@material-ui/icons/Timeline";
import Group from "@material-ui/icons/Group";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/icons/Menu";
import PlaylistAdd from "@material-ui/icons/PlaylistAdd";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import LibraryAdd from "@material-ui/icons/LibraryAdd";
import PhotoSizeSelectLarge from "@material-ui/icons/PhotoSizeSelectLarge";
// core components/views for Admin layout
import Statistics from "views/Statistics/Statistics.jsx";
import Profile from "views/Profile/Profile.jsx";
import Advertisements from "views/Advertisements/Advertisements.jsx";
import ServiceRequests from 'views/ServiceRequests/ServiceRequests.jsx';
// core components/views for RTL layout
import Services from "./views/Services/Services";
import Categories from "./views/Categories/Categories";
import Users from "./views/Users/Users";
import CategoryRequests from "./views/CategoryRequests/CategoryRequests";
import SignIn from "./views/SignIn";

const dashboardRoutes = [
  {
    path: "/login",
    component: SignIn,
    layout: "/admin"
  },
  // {
  //   path: "/statistics",
  //   name: "Thống kê",
  //   rtlName: "لوحة القيادة",
  //   icon: Timeline,
  //   component: Statistics,
  //   layout: "/admin"
  // },
  {
    path: "/profile",
    name: "Trang cá nhân",
    rtlName: "ملف تعريفي للمستخدم",
    icon: AccountCircle,
    component: Profile,
    layout: "/admin"
  },
  {
    path: "/users",
    name: "Danh sách người dùng",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Group,
    component: Users,
    layout: "/admin"
  },
  {
    path: "/services",
    name: "Danh sách dịch vụ",
    rtlName: "قائمة الجدول",
    icon: Menu,
    component: Services,
    layout: "/admin",
  },
  {
    path: "/service_requests",
    name: "Thêm dịch vụ",
    icon: PlaylistAdd,
    rtlName: 'asdoag',
    component: ServiceRequests,
    layout: "/admin"
  },
  {
    path: "/categories",
    name: "Danh sách loại dịch vụ",
    icon: LibraryBooks,
    rtlName: 'asdoag',
    component: Categories,
    layout: "/admin"
  },
  {
    path: "/category_requests",
    name: "Thêm loại dịch vụ",
    icon: LibraryAdd,
    rtlName: 'asdoag',
    component: CategoryRequests,
    layout: "/admin"
  },
  {
    path: "/advertisements",
    name: "Quản lý quảng cáo",
    rtlName: "طباعة",
    icon: PhotoSizeSelectLarge,
    component: Advertisements,
    layout: "/admin"
  },
];

export default dashboardRoutes;