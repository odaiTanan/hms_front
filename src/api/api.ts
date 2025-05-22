//host
export const HOST: string = "https://hms-back-5z37.vercel.app/api/v1/";
//Auth
export const REGISTER: string = "/user/patient/register";
export const LOGIN: string = "/user/login";
export const ADMIN_LOOGOUT: string = "/user/admin/logout";
export const USER_LOGOUT: string = "/user/patient/logout";
//User
export const ADMIN: string = "/user/admin/me";
export const USER: string = "/user/patient/me";
//Doctor
export const GET_ALL_DOCTORS: string = "/user/doctors";
export const ADD_DOCTOR: string = "/user/doctor/addnew";
export const DELETE_DOCTOR: string = "/user/doctor/";
export const GET_DOCTOR_BYID: string = "/user/doctor/";
//Appointment
export const GET_ALL_APPOINTEMENTS: string = "/appointment/getall";
export const GET_MY_APPOINTEMENTS: string = "/appointment/myappointments";
export const CANCEL_APPOINTMENT: string = "/appointment/cancel/";
export const DELETE_APPOINTMENT: string = "/appointment/delete/";
export const UPDATE_APPOINTMENT: string = "/appointment/update/";
export const ADD_APPOINTMENT: string = "/appointment/post";
export const GET_AVAILABLE_TIME: string = "/appointment/available-slots";
//Message
export const DELETE_MESSAGE: string = "/message/message/";
export const SEND_MESSAGE: string = "/message/send";
export const GET_MESSAGES: string = "/message/getall";
