// @material-ui/icons
import Group from "@material-ui/icons/Group";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/icons/Menu";
import PlaylistAdd from "@material-ui/icons/PlaylistAdd";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import LibraryAdd from "@material-ui/icons/LibraryAdd";
import PhotoSizeSelectLarge from "@material-ui/icons/PhotoSizeSelectLarge";
import AddPhotoAlternate from "@material-ui/icons/AddPhotoAlternate";
// core components/views for Admin layout
import Profile from "./views/Profile/Profile.jsx";
import Advertisements from "./views/Advertisements/Advertisements.jsx";
import ServiceRequests from './views/ServiceRequests/ServiceRequests.jsx';
import AdRequests from './views/AdRequests/AdRequests.jsx';
// core components/views for RTL layout
import Services from "./views/Services/Services";
import Categories from "./views/Categories/Categories";
import Users from "./views/Users/Users";
import CategoryRequests from "./views/CategoryRequests/CategoryRequests";
import SignIn from "./views/SignIn";

const dashboardRoutes = [
  {
    path: "/profile",
    name: "Trang cá nhân",
    icon: AccountCircle,
    component: Profile,
    layout: "/admin"
  },
  {
    path: "/users",
    name: "Danh sách người dùng",
    icon: Group,
    component: Users,
    layout: "/admin"
  },
  {
    path: "/services",
    name: "Danh sách dịch vụ",
    icon: Menu,
    component: Services,
    layout: "/admin",
  },
  {
    path: "/service_requests",
    name: "Thêm dịch vụ",
    icon: PlaylistAdd,
    component: ServiceRequests,
    layout: "/admin"
  },
  {
    path: "/categories",
    name: "Danh sách loại dịch vụ",
    icon: LibraryBooks,
    component: Categories,
    layout: "/admin"
  },
  {
    path: "/category_requests",
    name: "Thêm loại dịch vụ",
    icon: LibraryAdd,
    component: CategoryRequests,
    layout: "/admin"
  },
  {
    path: "/advertisements",
    name: "Danh sách quảng cáo",
    icon: PhotoSizeSelectLarge,
    component: Advertisements,
    layout: "/admin"
  },
  {
    path: "/ad_requests",
    name: "Thêm quảng cáo",
    icon: AddPhotoAlternate,
    component: AdRequests,
    layout: "/admin"
  },
];

export default dashboardRoutes;
