<template>
	<view class="page-detail" v-if="detailData != null">
		<view class="detail-banner">
			<swiper class="b-top" 
			 interval="3000" duration="300" circular="true"
			@change="changeSwiper"
			>
			  <swiper-item v-for="(item, index) in detailData.pictures" :key="index">
			    <image style="width: 100%;height: auto;" :src="item" mode="widthFix"/>
			  </swiper-item>
			</swiper>
			<!-- 轮播指示点样式修改 -->
			<view class="dots">
				<block v-for="(item, index) in detailData.pictures.length" :key="index">
					<view :style="{width: (detailData.pictures.length ? Math.floor(100 / detailData.pictures.length) + '%' : '50%')}" class="dot" :class="index==swiperCurrent ? ' active' : ''"></view>
				</block>
			</view>
		</view>
		<!-- 其他颜色列表展示 -->
		<view class="else-color">
			<view class="else-color-list" v-for="(item, index) in detailData.recommend_goods" :key="index">
				<image :src="item.cover"></image>
			</view>
		</view>
		<!-- 标题 -->
		<view class="d-content">
			<view class="d-titile">{{detailData.name}}</view>
			<view class="d-label">
				<view>货号：{{detailData.cargo}}</view>
				<view v-if="detailData.status != 1">已售{{detailData.sale_number || 0}}件</view>
			</view>
			<view class="d-message">
				<view class="d-price" v-if="detailData.status != 1">
					<view class="d-price-new">¥{{detailData.price}}</view>
					<view class="d-price-old">¥{{detailData.price_sale}}</view>
				</view>
				<view class="d-price" v-else>¥--</view>
				<view class="d-m-right"  v-if="detailData.status != 1">
					<image src="../../static/detail/sf.png"></image>
					顺丰包邮
				</view>
			</view>
		</view>
		 <!-- 热门推荐 -->
		 <view class="d-hot">
			 <view class="hot-title">热门推荐</view>
			 <scroll-view scroll-with-animation :scroll-x="true" class="hot-scroll">
			 	<view class="hot-item" v-for="(item, index) in hotList" @click="toDetail(index)"
			 	 :key="item.id">
			 		<view class="hot-image">
						<image :src="item.cover"></image>
					</view>
			 		<view class="hot-name">{{item.name}}</view>
			 		<view class="hot-price">¥{{item.price}}</view>
			 	</view>
			 </scroll-view>
		 </view>
		 <!-- 底部 -->
		 <view class="detail-foot">
			 <view class="customer">
				 <image src="../../static/detail/customer.png"></image>
				 客服
			 </view>
			 <view class="add-shopcart" @click="addShopCart">
				 <image src="../../static/detail/shop.png"></image>
				 加入购物袋
			 </view>
			 <view class="purchase" @click="toBuy">立刻购买</view>
		 </view>
		 <!-- 弹出层 -->
		 <uni-popup ref="popup" type="bottom" background-color="#fff">
			 <view class="bottom-pop">
				 <view class="pop-top">
					 <view class="pop-top-left">
						 <image :src="detailData.pictures[0]"></image>
						 <!-- <image src="http://www.gong-official.com/uploads/image/2022/12/20/31e548c7269570a37710710287774bc905d4731b.jpg"></image> -->
					 </view>
					 <view class="pop-top-right">
						 <view class="pop-r-title">
							 <view>{{detailData.name}}</view>
							 <view class="presale-label" v-if="detailData.status == 2">下单后{{detailData.days}}天内发货</view>
						 </view>
						 <view class="pop-r-price">¥{{detailData.status != 1 ? detailData.price : '--'}}</view>
					 </view>
				 </view>
				 <!-- 选择尺码 -->
				 <view class="pop-choose">
					 <view class="c-title">选择尺码</view>
					 <uni-data-checkbox :disabled="detailData.status == 1" mode="tag" v-model="popChoose" :localdata="sizeData"></uni-data-checkbox>
				 </view>
				 <view class="pop-btn pop-btn-disable" v-if="detailData.status == 1">暂未发售</view>
				 <view class="pop-btn" v-else @click="popSure">确认</view>
				 
			 </view>
		 </uni-popup>
	</view>
</template>

<script>
	import LoginMixin from '@/components/mixin/login.js';
	export default {
		mixins: [LoginMixin],
	    components: {
	    },
	    data() {
	        return {
				detailData: {
					pictures: [],
					recommend_goods: [], // 更多款式
				},
				swiperImg: [
					{img: 'https://www.mescroll.com/img/swiper1.jpg', id: '0'},
					{img: 'https://www.mescroll.com/img/swiper2.jpg', id: '1'},
					{img: 'https://www.mescroll.com/img/swiper2.jpg', id: '2'},
				],
				swiperCurrent: 0,
				hotList: [
					{ name: '新青年运动休闲背心 经典款', id: '0', price: '569' },
					{ name: '新青年背心', id: '1', price: '569' },
					{ name: '新青年运动休闲背心 经典款', id: '2', price: '569' },
					{ name: '新青年运动休闲背心 经典款', id: '3', price: '569' },
					{ name: '新青年运动休闲背心 经典款', id: '4', price: '569' },
					{ name: '新青年运动休闲背心 经典款', id: '5', price: '569' },
				],
				showShopPop: false,
				sizeData: [
					
				],
				popChoose: '',
				clickStatus: 1, // 1：加入购物车 2:立即购买
			}
	    },
		onLoad(option) { //option为object类型，会序列化上个页面传递的参数
			console.log('option.id========', option.id); //打印出上个页面传递的参数。
			this.getDetailFun(option.id || 1);
			this.getHotFun();
		},
	    methods: {
			requestSussessFun() {
				console.log('请求成功的要做的事情');
				this.showChoosePop();
			},
	        changeSwiper(e) {
	        	this.swiperCurrent = e.detail.current;
	        },
			// 显示选择尺码
			showChoosePop() {
				this.showShopPop = true;
				this.$refs.popup.open('bottom');
				this.getSkuFun(2);
			},
			// 加入购物车
			addShopCart() {
				if (!this.getToken) {
					this.wxLogin();
					return;
				}
				this.clickStatus = 1;
				this.showChoosePop();
			},
			// 立即购买
			toBuy() {
				if (!this.getToken) {
					this.wxLogin();
					return;
				}
				this.clickStatus = 2;
				this.showChoosePop();
			},
			// 确认
			popSure() {
				if (!this.popChoose) {
					uni.showToast({ title: '请先选择尺码', icon:'none' });
					return;
				}
				this.$refs.popup.close();
				if (this.clickStatus == 1) { // 加入购物车
					this.getCartSaveReqFun();
				} else {
					this.sureBuyReqFun();
				}
			},
			// 加入购物车请求
			getCartSaveReqFun() {
				this.$api.getCartSave({
					goods_id: this.detailData.id,
					goods_sku_ids: this.popChoose,
					goods_amount: 1,
				}).then((res) => {
					this.popChoose = '';
					uni.showToast({ title: '操作成功', icon:'none' });
					// 存储加入购物车标识
					uni.setStorageSync('addCart', true);
				});
			},
			// 确认购买
			sureBuyReqFun() {
				let chooseArr = [
					{
						goods_id: this.detailData.id,
						goods_sku_id: this.popChoose,
						goods_count: 1,
					}
				]
				this.$store.dispatch('chooseArr', chooseArr);
				uni.navigateTo({
					url: '/pages/order/orderConfirm',
				});
			},
			getDetailFun(id) {
				this.$api.getInfo({
				  id,
				}).then((res)=>{
					this.detailData = res;
					this.detailData.status = 0;
				});
			},
			getSkuFun(id) {
				let newData = [];
				this.detailData.skus.forEach((item) => {
					newData.push({
						text: item.sku_name,
						value: item.sku_id,
						disabled: item.stock == 0 || this.detailData.status == 1,
					});
				});
				this.sizeData = newData;
			},
			getHotFun(id) {
				this.$api.getHot({}).then((res)=>{
					this.hotList = res;
				});
			},
	    },
	}
</script>

<style lang="scss">
	.page-detail {
		padding-bottom: 250rpx;
	}
	.detail-banner {
		height: 750rpx;
		display: flex;
		justify-content: center;
		position: relative;
		box-sizing: border-box;
		.b-top {
			width: 100%;
			height: 630rpx;
		}
	}
	.else-color {
		display: flex;
		margin: 35rpx 0 60rpx 0;
		justify-content: center;
		.else-color-list {
			width: 140rpx;
			height: 140rpx;
			background-color: #f9f9f9;
			margin-right: 24rpx;
			image {
				width: 100%;
				height: 100%;
			}
		}
	}
	.dots {
		position: absolute;
		bottom: 36rpx;
		z-index: 4;
		display: flex;
		justify-content: center;
		width: 168rpx;
	
		.dot {
			// width: 24rpx;
			height: 4rpx;
			transition: all .6s;
			background: rgba(0, 0, 0, .16);
		}
	
		.active {
			height: 4;
			background: #000;
		}
	}
	.d-content {
		padding: 20px;
		box-sizing: border-box;
		.d-titile {
			font-size: 40rpx;
			font-weight: bold;
			margin-bottom: 8rpx;
		}
		.d-label {
			display: flex;
			justify-content: space-between;
			font-size: 26rpx;
			color: #999999;
			margin-bottom: 44rpx;
		}
		.d-message {
			display: flex;
			align-items: center;
			justify-content: space-between;
			.d-price{
				display: flex;
				align-items: center;
				.d-price-new {
					font-size: 48rpx;
					font-weight: bold;
					margin-right: 14rpx;
				}
				.d-price-old {
					font-size: 28rpx;
					color: #999;
					text-decoration: line-through;
				}
			}
			.d-m-right {
				font-size: 24rpx;
				color: #616161;
				display: flex;
				align-items: center;
				image {
					width: 26rpx;
					height: 26rpx;
					margin-right: 4rpx;
				}
			}
		}
	}
	.d-hot {
		margin-top: 60rpx;
		padding: 0 40rpx;
		box-sizing: border-box;
		.hot-title {
			font-size: 28rpx;
			font-weight: bold;
			margin-bottom: 28rpx;
		}
		.hot-scroll {
			white-space: nowrap;
		}
		.hot-item {
			width: 430rpx;
			text-align: center;
			display: inline-flex;
			justify-content: center;
			flex-direction: column;
			margin-right: 40rpx;
		}
		.hot-image {
			width: 100%;
			background-color: #fff;
			height: 430rpx;
			border: 1px solid #999;
			border-radius: 4px 4px 0 0;
			margin-bottom: 40rpx;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.hot-name {
			width: 430rpx;
			font-size: 24rpx;
			font-weight: bold;
			margin-bottom: 24rpx;
		}
		.hot-price {
			font-size: 28rpx;
			font-weight: bold;
		}
	}
	.detail-foot {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 230rpx;
		display: flex;
		padding: 36rpx 40rpx 0 44rpx;
		// justify-content: center;
		background-color: #FFFFFF;
		border-top: 1px solid #DEDEDE;
		box-sizing: border-box;
		justify-content: space-between;
		.customer {
			display: flex;
			flex-direction: column;
			font-size: 24rpx;
			height: 90rpx;
			justify-content: center;
			image {
				width: 44rpx;
				height: 40rpx;
			}
			
		}
		.add-shopcart {
			width: 308rpx;
			height: 86rpx;
			border-radius: 2px;
			border: 1px solid #E6E6E6;
			display: flex;
			align-items: center;
			font-size: 28rpx;
			justify-content: center;
			image {
				width: 28rpx;
				height: 34rpx;
				margin-right: 8rpx;
			}
		}
		.purchase {
			width: 240rpx;
			height: 90rpx;
			background: #000000;
			border-radius: 2px;
			color: #fff;
			text-align: center;
			line-height: 90rpx;
			font-size: 28rpx;
		}
	}
	.bottom-pop {
		padding: 50rpx 40rpx;
		.pop-top {
			display: flex;
			margin-bottom: 48rpx;
			.pop-top-left {
				width: 250rpx;
				height: 250rpx;
				margin-right: 40rpx;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.pop-top-right {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.pop-r-title {
					font-size: 30rpx;
				}
				.presale-label {
					background: #FFF0E8;
					height: 42rpx;
					line-height: 42rpx;
					padding: 0 14rpx;
					color: #FF5C00;
					font-size: 24rpx;
					margin-top: 16rpx;
				}
			}
		}
		.pop-choose {
			margin-bottom: 50rpx;
			.c-title {
				font-size: 28rpx;
				margin-bottom: 28rpx;
			}
		}
		.uni-data-checklist .checklist-group .checklist-box {
			box-sizing: border-box;
			width: 210rpx;
			height: 100rpx;
		}
		.uni-data-checklist .checklist-group .checklist-box.is--tag {
			margin-right: 20rpx;
			margin-bottom: 20rpx;
			border: none;
			.checklist-text {
				font-size: 28rpx;
				color: #000;
			}
		}
		.uni-data-checklist .checklist-group .checklist-box.is--tag.is-disable  {
			background-color: #f7f7ff !important;
			opacity: 1 !important;
			.checklist-text {
				color: #ccc !important;
			}
		}
		.uni-data-checklist .checklist-group .checklist-box.is--tag:nth-child(3n) {
			margin-right: 0;
		}
		.uni-data-checklist .checklist-group .checklist-box .checklist-content {
			justify-content: center;
		}
		.pop-btn {
			width: 100%;
			height: 100rpx;
			line-height: 100rpx;
			text-align: center;
			font-size: 30rpx;
			color: #fff;
			background-color: #000;
			border-radius: 4px;
		}
		.pop-btn-disable {
			background-color: #999;
		}
	}
</style>