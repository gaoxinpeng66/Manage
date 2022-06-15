import axios from '../utils/myaxios'
import { BASE_URL } from '../config'

export const reqLogin = (username, password) => axios.post(`${BASE_URL}/login`, { username, password })

export const reqUserList = () => axios.get(`${BASE_URL}/user/list`)
export const reqUserAdd = ({ ...value }) => axios.post(`${BASE_URL}/user/add`, { ...value })
export const reqUserDelete = (_id, state) => axios.post(`${BASE_URL}/user/delete`, { _id, state })
export const reqUserUpdata = ({ ...value }) => axios.post(`${BASE_URL}/user/updata`, { ...value })

export const reqMenuList = () => axios.get(`${BASE_URL}/menu/list`)
export const reqMenuUpdata = (_id, state) => axios.post(`${BASE_URL}/menu/updata`, { _id, state })

export const reqRoleList = () => axios.get(`${BASE_URL}/role/list`)
export const reqRoleAdd = (name) => axios.post(`${BASE_URL}/role/add`, { name })
export const reqRoleDelete = (_id, state) => axios.post(`${BASE_URL}/role/delete`, { _id, state })
export const reqRoleUpdata = (_id, menus) => axios.post(`${BASE_URL}/role/updata`, { _id, menus })

export const reqdepartmentList = () => axios.get(`${BASE_URL}/department/list`)
export const reqdepartmentAdd = (name) => axios.post(`${BASE_URL}/department/add`, { name })
export const reqdepartmentDelete = (_id, state) => axios.post(`${BASE_URL}/department/delete`, { _id, state })
export const reqdepartmentUpdata = (_id, switchs) => axios.post(`${BASE_URL}/department/updata`, { _id, switchs })

export const reqNoticeList = () => axios.get(`${BASE_URL}/notice/list`)
export const reqNoticAdd = (value) => axios.post(`${BASE_URL}/notice/add`, { ...value })
export const reqNoticUpdata = (_id, condition) => axios.post(`${BASE_URL}/notice/updata`, { _id, condition })
export const reqNoticeDelete = (_id, state) => axios.post(`${BASE_URL}/notice/delete`, { _id, state })
export const reqNoticetDetail = (_id) => axios.get(`${BASE_URL}/notice/detail/${_id}`)


export const reqProjectList = () => axios.get(`${BASE_URL}/project/list`)
export const reqProjectAdd = (value) => axios.post(`${BASE_URL}/project/add`, { ...value })
export const reqProjectDelete = (_id, state) => axios.post(`${BASE_URL}/project/delete`, { _id, state })
export const reqProjectUpdata = (value) => axios.post(`${BASE_URL}/project/updata`, {...value})

export const reqPatientList = () => axios.get(`${BASE_URL}/examination/list`)
export const reqPatientAdd = (value) => axios.post(`${BASE_URL}/examination/add`, { ...value })
export const reqPatientUpdata = (_id, emeresultrgency,state) => axios.post(`${BASE_URL}/examination/updata`, {_id, emeresultrgency,state})
export const reqPatientDetail = (_id) => axios.get(`${BASE_URL}/examination/detail/${_id}`)

export const reqRegisterList = () => axios.get(`${BASE_URL}/register/list`)
export const reqRegisterAdd = (value) => axios.post(`${BASE_URL}/register/add`, { ...value })
export const reqRegisterUpdata1 = (_id, diagnosticresults,emeresultrgencyItem,state) => axios.post(`${BASE_URL}/register/updata`, {_id, diagnosticresults,emeresultrgencyItem,state})
export const reqRegisterUpdata2 = (_id, emeresultrgency,state) => axios.post(`${BASE_URL}/register/updata`, {_id, emeresultrgency,state})
export const reqRegisterDetail = (_id) => axios.get(`${BASE_URL}/register/detail/${_id}`)


