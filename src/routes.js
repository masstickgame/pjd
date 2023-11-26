
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import Information from "views/examples/Information.js";
import Process from "views/examples/Process.js";
import Search from "views/examples/Search.js";
import Search1 from "views/examples/Search1.js";
import Search2 from "views/examples/Search2.js";
import Search3 from "views/examples/Search3.js";
import Compare from "views/examples/Compare.js";
import Finish from "views/examples/Finish.js";
import Rooms from "views/teacher/Room.js"
var routes = [
  {
    path: "/index",
    name: "หน้าหลัก",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
    hidder : true,
    type : "admin"
  },
  {
    path: "/icons",
    name: "จัดการรายชื่อผู้ใช้งาน",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/admin",
    hidder : false,
    type : "admin"
  },
  {
    path: "/tables",
    name: "โครงสร้างข้อมูล",
    icon: "ni ni-pin-3 text-orange",
    component: Tables,
    layout: "/admin",
    hidder : false,
    type : "admin"
  },
  {
    path: "/maps",
    name: "ตารางเทียบโอน",
    icon: "ni ni-pin-3 text-orange",
    component: Maps,
    layout: "/admin",
    hidder : false,
    type : "admin"
  },
  {
    path: "/search2",
    name: "ประวัติผู้เทียบโอน",
    icon: "ni ni-single-02 text-yellow",
    component: Search2,
    layout: "/admin",
    hidder : true,
    type : "admin"
  },
  {
    path: "/information",
    name: "นักเรียน",
    icon: "ni ni-single-02 text-yellow",
    component: Information,
    layout: "/admin",
    hidder : false,
    type : "user"
  },
  // {
  //   path: "/tables",
  //   name: "ข้อมูลนักศึกษา",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: Tables,
  //   layout: "/admin",
  //   hidder : true,
  //   type : "admin"
  // }
  // ,
  {
    path: "/search3",
    name: "ข้อมูลรายวิชาเดิม",
    icon: "ni ni-bullet-list-67 text-red",
    component: Search3,
    layout: "/admin",
    hidder : true,
    type : "admin"
  },
  {
    path: "/Search1",
    name: "สรุปผล",
    icon: "ni ni-single-02 text-yellow",
    component: Search1,
    layout: "/admin",
    hidder : true,
    type : "user"
  },
  {
    path: "/search",
    name: "สรุปผล",
    icon: "ni ni-bullet-list-67 text-red",
    component: Search,
    layout: "/admin",
    hidder : false,
    type : "admin"
  },
  {
    path: "/compare",
    name: "สรุปผล",
    icon: "ni ni-bullet-list-67 text-red",
    component: Compare,
    layout: "/admin",
    hidder : false,
    type : "compare"
  },
  {
    path: "/rooms",
    name: "ปีการศึกษา",
    icon: "ni ni-bullet-list-67 text-red",
    component: Rooms,
    layout: "/admin",
    hidder : false,
    type : "teacher"
  },
  {
    path: "/mapsteacher",
    name: "เพิ่มหลักสูตร",
    icon: "ni ni-pin-3 text-orange",
    component: Maps,
    layout: "/admin",
    hidder : false,
    type : "teacher"
  },
  // {
  //   path: "/search2",
  //   name: "Search2",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: Search2,
  //   layout: "/admin"
  // },
  // {
  //   path: "/search3",
  //   name: "Search3",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: Search3,
  //   layout: "/admin"
  // },
  // {
  //   path: "/compare",
  //   name: "ข้อมูลรายวิชาเดิม",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: Compare,
  //   layout: "/admin"
  // },
  // {
  //   path: "/finish",
  //   name: "Finish",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: Finish,
  //   layout: "/admin"
  // },
  // {
  //   path: "/login",
  //   name: "Login",
  //   icon: "ni ni-key-25 text-info",
  //   component: Login,
  //   layout: "/auth"
  // },
  // {
  //   path: "/register",
  //   name: "Register",
  //   icon: "ni ni-circle-08 text-pink",
  //   component: Register,
  //   layout: "/auth"
  // }
];
export default routes;
