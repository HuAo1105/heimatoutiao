import axios from '../utils/axios-config'
// import vue from '../utils/event-bus'
import API from '../constant/api'
// account组件
// 获取用户信息
export function getUser () {
  return axios({
    url: API.API_USER
  })
}
// 修改用户信息
export function modify (formData) {
  return axios({
    url: API.API_USER,
    method: 'patch',
    data: formData
  })
}
// 修改头像
export function changePhoto (data) {
  return axios({
    url: API.API_PHOTO,
    method: 'patch',
    data
  })
}
// articals
// 删除文章
export function delArticle (id) {
  return axios({
    url: `${API.API_ARTICLE}/${id.toString()}`,
    method: 'delete'
  })
}
// 获取文章列表
export function getAticels (params) {
  return axios({
    url: API.API_ARTICLE,
    params
  })
}
// 获取文章频道
export function getChannels () {
  return axios({
    url: API.API_CHANNELS
  })
}
// 修改评论状态
export function openOrClose (row) {
  return axios({
    url: API.API_OPENORCLOSE,
    method: 'put',
    params: { article_id: row.id.toString() }, // params为路径参数，对应的是query参数
    data: { allow_comment: !row.comment_status } // 原来是关闭的，给打开；原来是打开的，给关闭
  })
}
// 获取评论列表
export function getComments (pageSize, currentPage) {
  return axios({
    url: API.API_ARTICLE,
    params: { response_type: 'comment', per_page: pageSize, page: currentPage }
  })
}
// login
export function login (formdata) {
  return axios({
    url: API.API_LOGIN,
    method: 'post',
    data: formdata
  })
}
// material
// 删除素材
export function deleteAll (id) {
  return axios({
    url: `${API.API_METERIAL}/${id}`,
    method: 'delete'
  })
}
// 收藏或者取消收藏
export function collectOrCancle (item) {
  return axios({
    url: `${API.API_METERIAL}/${item.id}`,
    method: 'put',
    data: { collect: !item.is_collected }
  })
}
// 上传图片
export function uploadImg (data) {
  return axios({
    url: API.API_METERIAL,
    method: 'post',
    data
  })
}
// 获取数据
export function getMaterial (currentPage, pageSize, activeName) {
  return axios({
    url: API.API_METERIAL,
    params: { page: currentPage, per_page: pageSize, collect: activeName === 'select' }
  })
}
// publish
// 获取指定文章内容
export function getArticle (target) {
  return axios({
    url: `${API.API_ARTICLE}/${target}`
  })
}
// 发表文章
export function publishArticles (draft, formData, target) {
  return axios({
    url: target ? `${API.API_ARTICLE}/${target}` : API.API_ARTICLE,
    method: target ? 'put' : 'post',
    params: { draft },
    data: formData
  })
}
// layout-header
// 获取用户信息
export function getProfile () {
  return axios({
    url: API.API_PROFILE
  })
}
// select-iamge
// 获取素材
export function getImage (currentPage, pageSize) {
  return axios({
    url: API.API_METERIAL,
    params: { page: currentPage, per_page: pageSize }
  })
}
// 上传图片
export function uploadImgs (data) {
  return axios({
    url: API.API_METERIAL,
    method: 'post',
    data
  })
}
