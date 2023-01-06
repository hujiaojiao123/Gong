import {
	request
} from '@/utils/request.js'
 
 
// 获取商品分类 /api/goods/categories
const getCategories = (data) => request({url: 'api/goods/categories', method: 'get', data, loadingText: '加载中',})

// 获取商品列表 /api/goods/list
const getList = (data) => request({
	url: 'api/goods/list', 
	method: 'get', 
	data,
	loadingText: '加载中',
})

// 获取商品详情 /api/goods/info
const getInfo = (data) => request({
	url: 'api/goods/info', 
	method: 'get', 
	data,
	loadingText: '加载中',
})

// 获取颜色 尺码分类接口 /api/goods/sku
const getSku = (data) => request({url: 'api/goods/sku', method: 'get', data})

// 详情页面 热门推荐 api/goods/hot
const getHot = (data) => request({url: 'api/goods/hot', method: 'get', data})

// 获取ID
const getCode2seesion = (data) => request({
	url: 'api/users/code2seesion', 
	method: 'get', 
	data, 
	loadingText: '登录中',
})


// 换取手机号 /api/users/getPhoneNumber
const getPhoneNumber = (data) => request({url: 'api/users/getPhoneNumber', method: 'post', data})

// 保存地址 /api/users/address/save
const getSave = (data) => request({
	url: 'api/users/address/save',
	method: 'post', 
	data, 
	loadingText: '保存中',
})

// 获取地址 /api/users/address/info
const getAddressInfo = (data) => request({
	url: 'api/users/address/info',
	method: 'get', 
	data, 
	loadingText: '加载中',
})

// 添加购物车接口 /api/users/cart/save
const getCartSave = (data) => request({
	url: 'api/users/cart/save',
	method: 'post', 
	data, 
})

// 购物车列表/api/users/cart/list
const getCartList = (data) => request({
	url: 'api/users/cart/list',
	method: 'get', 
	data, 
	loadingText: '加载中',
})

// 购物车删除接口 /api/users/cart/remove
const getCartRemove = (data) => request({
	url: 'api/users/cart/remove',
	method: 'get', 
	data, 
})

// 下单接口 /api/users/order/save
const getOrderSave = (data) => request({
	url: 'api/users/order/save',
	method: 'post', 
	data, 
})

// 订单确认页面 /api/users/order/confirm
const getOrderConfirm = (data) => request({
	url: 'api/users/order/confirm',
	method: 'post', 
	data, 
	loadingText: '加载中',
})

// 首页接口 /api/index/content
const getIndexContent = (data) => request({
	url: 'api/index/content',
	method: 'post', 
	data, 
	loadingText: '加载中',
})

export default {
    getCategories,
    getList,
    getInfo,
	getSku,
	getHot,
	getCode2seesion,
	getPhoneNumber,
	getSave,
	getAddressInfo,
	getCartSave,
	getCartList,
	getCartRemove,
	getOrderSave,
	getOrderConfirm,
	getIndexContent,
}