import DoctorWork from '../pages/RouteChildren/DoctorWork/DoctorWork'
import Register from '../pages/RouteChildren/ReceptionWork/Register'
import Examine from '../pages/RouteChildren/ReceptionWork/Examine'
import AuthorityList from '../pages/RouteChildren/AuthoritySection/AuthorityList'
import RoleList from '../pages/RouteChildren/AuthoritySection/RoleList'
import DepartmentList from '../pages/RouteChildren/HospitalSection/DepartmentList'
import UserList from '../pages/RouteChildren/HospitalSection/UserList'
import HomePage from '../pages/RouteChildren/HomePage/HomePage'
import NoticeList from '../pages/RouteChildren/Notice/NoticeList'
import NoticeRelease from '../pages/RouteChildren/Notice/NoticeRelease'
import NoticeDetail from '../pages/RouteChildren/Notice/components/NoticeDetail'
import Personal from '../pages/RouteChildren/Personal/Personal'
import ProjectList from '../pages/RouteChildren/LaboratorianWork/ProjectList'
import TestWork from '../pages/RouteChildren/LaboratorianWork/TestWork'
import ExaminationWork from '../pages/RouteChildren/LaboratorianWork/ExaminationWork'
import ExpatientList from '../pages/RouteChildren/Patient/ExpatientList'
import ExpatientDetail from '../pages/RouteChildren/Patient/components/ExpatientDetail'
import RegisterList from '../pages/RouteChildren/Patient/RegisterList'
import RegisterListDetail from '../pages/RouteChildren/Patient/components/RegisterListDetail'

export const RouteList ={
    "/homepage" : HomePage,
    "/doctor/work" :DoctorWork ,
    "/laboratorian/project" :ProjectList,
    "/patient/examine" :ExpatientList,
    "/patient/examine/detail/:id": ExpatientDetail,
    "/reception/register": Register,
    "/reception/examine":Examine ,
    "/authoritys/role": RoleList,
    "/authoritys/authority": AuthorityList,
    "/hospital/user": UserList,
    "/hospital/department": DepartmentList,
    "/notice/release": NoticeRelease,
    "/notice/list": NoticeList,
    "/notice/detail/:id": NoticeDetail,
    "/personal": Personal,
    "/laboratorian/test":TestWork,
    "/laboratorian/examination":ExaminationWork,
    "/patient/outpatient":RegisterList,
    "/patient/outpatient/detail/:id":RegisterListDetail ,
}