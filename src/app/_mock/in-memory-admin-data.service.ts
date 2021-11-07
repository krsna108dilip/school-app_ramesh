import { ExamType } from './../_models/admin/ExamType';
import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Role } from '../_models/Role';
import { Users } from '../_models/admin/Users';
import { Standard } from '../_models/admin/Standard';

@Injectable({
  providedIn: 'root'
})
export class InMemoryAdminDataService implements InMemoryDbService  {
  constructor() {}

  createDb() {

    const roles: Role[] = [
      {
        id: 'role1',
        rolename: 'role1'
      },
      {
        id: 'role2',
        rolename: 'role2'
      },
      {
        id: 'role3',
        rolename: 'role3'
      },
      {
        id: 'role4',
        rolename: 'role4'
      }
    ];

    const users: Users[] = [
      // {
      //   id: '1',
      //   username: 'Peter1',
      //   password: 'pass1',
      //   role: 'role1'
      // },
      // {
      //   id: '2',
      //   username: 'Peter2',
      //   password: 'pass2',
      //   role: 'role2'
      // },
      // {
      //   id: '3',
      //   username: 'Peter3',
      //   password: 'pass3',
      //   role: 'role3'
      // },
      // {
      //   id: '4',
      //   username: 'Peter4',
      //   password: 'pass4',
      //   role: 'role4'
      // }
      
    ];

    const standards: Standard[] = [
      // {
      //   id: '1',
      //   standardname: 'standard1'
      // },
      // {
      //   id: '2',
      //   standardname: 'standard2'
      // },
      // {
      //   id: '3',
      //   standardname: 'standard3'
      // },
      // {
      //   id: '4',
      //   standardname: 'standard4'
      // }
    ];

    const examtypes: ExamType[] = [
      // {
      //   id: '1',
      //   examtypename:'type1'
      // },
      // {
      //   id: '2',
      //   examtypename: 'type2'
      // },
      // {
      //   id: '3',
      //   examtypename: 'type3'
      // },
      // {
      //   id: '4',
      //   examtypename: 'type4'
      // }
    ];


    const heroes: Hero[] = [
      { id: 1, name: 'Dr Ray Flemming' },
      { id: 2, name: 'Dale Kingston'  },
      { id: 3, name: 'Beth Chadwick' },
      { id: 4, name: 'Emmett Clayton' },
      { id: 5, name: 'Viveca Scott' },
      { id: 6, name: 'Dr Bart Keppel' },
      { id: 7, name: 'Milo Janus' },
      { id: 8, name: 'Harold Van Wick' },
      { id: 9, name: 'Adrian Carsini' },
      { id: 10, name: 'Abigail Mitchell'},
    ];
    return {roles, users, standards, examtypes, heroes};
  }

}

export class Hero {
  id: number;
  name: string;
}
