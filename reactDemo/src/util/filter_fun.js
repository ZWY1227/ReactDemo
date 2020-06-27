// 在这里实现过滤时间的函数并且导出。根据传入时间戳来拿到当前的时间，再进行拼接
export default
 function filterTime(time){
    let t=new Date(time)
    return t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate()+" "+t.getHours()+":"+t.getMinutes()+":"+t.getSeconds()
}
console.log(filterTime(Date.now()))