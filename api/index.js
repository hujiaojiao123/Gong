import {
	request
} from '@/utils/request.js'
 
 
// 获取商品分类 
const getCategories = (data) => request({url: 'api/goods/categories', method: 'get', data, loadingText: '加载中',})

// 获取商品列表 
const getList = (data) => request({
	url: 'api/goods/list', 
	method: 'get', 
	data,
	loadingText: '加载中',
})

// 获取商品详情 
const getInfo = (data) => request({
	url: 'api/goods/info', 
	method: 'get', 
	data,
	loadingText: '加载中',
})

// 获取颜色 尺码分类接口 
const getSku = (data) => request({url: 'api/goods/sku', method: 'get', data})

// 详情页面 热门推荐
const getHot = (data) => request({url: 'api/goods/hot', method: 'get', data})

// 获取ID
const getCode2seesion = (data) => request({
	url: 'api/users/code2seesion', 
	method: 'get', 
	data, 
	loadingText: '登录中',
})


// 换取手机号  
const getPhoneNumber = (data) => request({url: 'api/users/getPhoneNumber', method: 'post', data})

// 保存地址  
const getSave = (data) => request({
	url: 'api/users/address/save',
	method: 'post', 
	data, 
	loadingText: '保存中',
})

// 获取地址  
const getAddressInfo = (data) => request({
	url: 'api/users/address/info',
	method: 'get', 
	data, 
	loadingText: '加载中',
})

// 添加购物车接口  
const getCartSave = (data) => request({
	url: 'api/users/cart/save',
	method: 'post', 
	data, 
})

// 购物车列表 
const getCartList = (data) => request({
	url: 'api/users/cart/list',
	method: 'get', 
	data, 
	loadingText: '加载中',
})

// 购物车删除接口
const getCartRemove = (data) => request({
	url: 'api/users/cart/remove',
	method: 'get', 
	data, 
})

// 下单接口 
const getOrderSave = (data) => request({
	url: 'api/users/order/save',
	method: 'post', 
	data, 
})

// 订单确认页面 
const getOrderConfirm = (data) => request({
	url: 'api/users/order/confirm',
	method: 'post', 
	data, 
	loadingText: '加载中',
})

// 首页接口 
const getIndexContent = (data) => request({
	url: 'api/index/content',
	method: 'post', 
	data, 
	loadingText: '加载中',
})
// 我的订单接口 
const getOrderList = (data) => request({
	url: 'api/users/order/list',
	method: 'post', 
	data, 
	loadingText: '加载中',
})

// 退款理由
const getRefundReason = (data) => request({
	url: 'api/refund/reason',
	method: 'get',
	data, 
})
// 退款申请 
const getRefundApply = (data) => request({
	url: 'api/users/refund/apply',
	method: 'post',
	data, 
})

// 订单详情 
const getOrderInfo = (data) => request({
	url: 'api/users/order/info',
	method: 'post', 
	data, 
	loadingText: '加载中',
})

// 退款取消接口
const getRefundCancel = (data) => request({
	url: 'api/users/refund/cancel',
	method: 'get',
	data, 
})
// 订单状态修改 
const getOrderStatus = (data) => request({
	url: 'api/users/order/status',
	method: 'get',
	data, 
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
	getOrderList,
	getRefundReason,
	getRefundApply,
	getOrderInfo,
	getRefundCancel,
	getOrderStatus,
}