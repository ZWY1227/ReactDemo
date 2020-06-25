let USER="USER"
export default{
    setStor:(user)=>{
        localStorage.setItem(USER,JSON.stringify(user))
    },
    getStor:()=>{
     return JSON.parse(localStorage.getItem(USER))||{}
    },
    removeStor:()=>{
        localStorage.removeItem(USER)
    }
}