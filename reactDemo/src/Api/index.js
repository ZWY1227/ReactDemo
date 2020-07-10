import ajax from "./axios"
import jsonp from "jsonp"
//登录接口的封装
export const reqlogin=(username,password)=>ajax("/login",{username,password},"POST")
//天气接口的封装
export const reqweather=(city)=>{
    return new Promise((resolve,reject)=>{
        let url=`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        jsonp(url,{},(err,data)=>{
            // console.log(data.results[0].weather_data[0].dayPictureUrl,data.results[0].weather_data[0].weather)
            if(data.status==="success"){
                let url=data.results[0].weather_data[0].dayPictureUrl
                let weather=data.results[0].weather_data[0].weather
                resolve({url,weather})
            }
        })
    })
}
// 6). 获取一级或某个二级分类列表
export const reqCategorys = (parentId) => ajax( '/manage/category/list',{parentId})
// 7). 添加一级分类
export const reqAddCategory = (categoryName) => ajax( '/manage/category/add', {categoryName}, 'POST')
//添加二级分类
export const reqAddCategoryT = (parentId, categoryName) => ajax( '/manage/category/add',{parentId, categoryName}, 'POST')
// 8). 更新品类名称
export const reqUpdateCategory = (categoryId, categoryName) => ajax( '/manage/category/update', {categoryId, categoryName}, 'POST')




// ---------------------------商品的接口
//10). 获取商品分页列表
export const reqshopList=(pageNum,pageSize)=>ajax('/manage/product/list',{pageNum,pageSize})
//11)search根据关键字或者描述来搜索商品
export const searchShop=(pageNum,pageSize,productType,content)=>ajax('/manage/product/search',{
    pageNum,pageSize,
    [productType]:content
})
// ### 参数类型:
//     |参数		       |是否必选 |类型     |说明
//     |_id           |Y       |string   |商品ID
//     |categoryId    |Y       |string   |分类ID
//     |pCategoryId   |Y       |string   |父分类ID
//     |name          |Y       |string   |商品名称
//     |desc          |N       |string   |商品描述
//     |price         |N       |string   |商品价格
//     |detail        |N       |string   |商品详情
//     |imgs          |N       |array   |商品图片名数组
//12)添加商品或者更新商品
export const addUpdata=(product)=>ajax(`/manage/product/${product._id?'update':'add'}`,product,'POST')
//13)对商品进行上架或者下架处理
export const checkStatus=(productId,status)=>ajax('/manage/product/updateStatus',{productId,status},'POST')
//14)上传图片
export const upPic=(image)=>ajax('/manage/img/upload',{image},'POST')
//15)删除图片
export const deleteImage=(name)=>ajax('/manage/img/delete',{name},'POST')
//16）根据id来获取分类、
export const reqcatebyid=(categoryId)=>ajax("/manage/category/info",{categoryId})





//--------------------------角色接口
//16添加角色
export const reqRole=(roleName)=>ajax("/manage/role/add",{roleName},'POST')
//17获取角色列表
export const reqRoleList=()=>ajax("/manage/role/list")
//18更新角色
export const updataRole=(_id,menus,auth_time,auth_name)=>ajax("/manage/role/update",{_id,menus,auth_time,auth_name},'POST')
//----------------------------用户接口






//增加用户:用户名，密码，手机号，邮箱，角色id
export const addUse=(username,password,phone,email,role_id)=>ajax('/manage/user/add',{username,password,phone,email,role_id},'POST')
//删除用户：用户id
export const deleteUse=(userId)=>ajax('/manage/user/delete',{userId},'POST')
//更改用户：用户ID，用户名，手机号，邮箱，角色id
export const updateUse=(_id,username,phone,email,role_id)=>ajax('/manage/user/update',{_id,username,phone,email,role_id},'POST')
//查看所有用户列表
export const showUse=()=>ajax('/manage/user/list')