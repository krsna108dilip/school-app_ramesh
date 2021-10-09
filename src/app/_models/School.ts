/* import { Key } from "protractor";
import { UserList } from "./UserList";

export interface School {
  jwtToken: string;
  school: SchoolObject;
}

export interface SchoolObject {
  id: number;
  name: string;
  address: string;
  mobileno: number;
  email: string;
  phoneno: number;
  userList: UserList [];
}


 */
export interface School {
  id: number;
  schoolname: string;
  address: string;
  mobileno: number;
  email: string;
  phoneno: number;
  roleid: number;
  rolename: string;
  userid: number;
  username: string;
  lastlogin: string;
  jwtToken: string;
  }
  