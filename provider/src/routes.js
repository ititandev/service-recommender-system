// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage from "./views/Dashboard/Dashboard.jsx";
import TableList from "./views/TableList/TableList.jsx";
import ServiceList from './views/TableList/ServiceList.jsx';

import NotificationsPage from "./views/Notifications/Notifications.jsx";

// core components/views for RTL layout
//import RTLPage from "./views/RTLPage/RTLPage.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Statistics",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    props :true,
    layout: "/provider"
  },
  // {
  //   path: "/user",
  //   name: "User Profile",
  //   rtlName: "ملف تعريفي للمستخدم",
  //   icon: Person,
  //   component: UserProfile,
  //   layout: "/provider"
  // },
  {
    path: "/table",
    name: "Services",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: ServiceList,
    layout: "/provider",
  },
  {
    path:"/typography",
    name:"Buy Advertisement",
    icon:LocationOn,
    rtlName:'asdoag',
    component:TableList,
    layout:"/provider"
  },

  // {
  //   path: "/typography",
  //   name: "Advertisements",
  //   rtlName: "طباعة",
  //   icon: LibraryBooks,
  //   component: TableList,
  //   layout: "/admin"
  // },
  // {
  //   path: "/advertisement",
  //   name: "New Advertisement",
  //   rtlName: "الرموز",
  //   icon: BubbleChart,
  //   component: ServiceList,
  //   layout: "/admin"
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   rtlName: "خرائط",
  //   icon: LocationOn,
  //   component: Maps,
  //   layout: "/admin"
  // },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "إخطارات",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/provider"
  },
  // {
  //   path: "/upgrade-to-pro",
  //   name: "Upgrade To PRO",
  //   rtlName: "التطور للاحترافية",
  //   icon: Unarchive,
  //   component: UpgradeToPro,
  //   layout: "/admin"
  // },
  // {
  //   path: "/rtl-page",
  //   name: "RTL Support",
  //   rtlName: "پشتیبانی از راست به چپ",
  //   icon: Language,
  //   component: RTLPage,
  //   layout: "/rtl"
  // }
];

export default dashboardRoutes;
