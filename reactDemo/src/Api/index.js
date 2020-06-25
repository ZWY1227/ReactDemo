import ajax from "./axios"
export const reqlogin=(username,password)=>ajax("/login",{username,password},"POST")