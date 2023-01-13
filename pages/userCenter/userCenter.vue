<template>
	<view class="user-page">
		<image class="user-page-bj" src="/static/userCenter/userCenterBj.png"></image>
		<view class="user-content">
			<view class="user-c-top">
				<view class="top-left">
					<button class="top-left" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
					  <image class="avatar" :src="avatarUrl"></image>
					</button>
				</view>
				<view class="top-right">
					<view class="top-right-title">{{nickName}}</view>
					<!-- <button  class="top-right-btn" open-type="getPhoneNumber" @getphonenumber="getphonenumberInfo" >登录后查看</button> -->
					<view v-if="!getToken" class="top-right-btn" @click="wxLogin">登录后查看</view>
				</view>
			</view>
			<view class="user-list">
				<view class="user-list-item" @click="toOrder">
					<view class="user-list-item-left">
						<image class="user-order-img" src="/static/userCenter/myOrder.png"></image>
						<view>我的订单</view>
					</view>
					<image class="user-list-item-arrow" src="/static/order/arrow.png"></image>
				</view>
				<view class="user-list-item"  @click="toAddress">
					<view class="user-list-item-left">
						<image class="user-address-img" src="/static/userCenter/address.png"></image>
						<view>收货地址</view>
					</view>
					<image class="user-list-item-arrow" src="/static/order/arrow.png"></image>
				</view>
				<button class="user-list-item item-button" type='default' open-type='contact'>
					<view class="user-list-item-left">
						<image class="user-customer-img" src="/static/userCenter/customer.png"></image>
						<view class="item-button-text">联系客服</view>
					</view>
					<image class="user-list-item-arrow" src="/static/order/arrow.png"></image>
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	import LoginMixin from '@/components/mixin/login.js';
	export default {
		components: {
		},
		mixins: [LoginMixin],
		data() {
			return {
				// wxCode: '',
				// nickName: '',
				// avatarUrl: '',
				// getToken: '',
			}
		},
		// onShow() {
		// 	this.getToken = uni.getStorageSync('token');
		// 	this.avatarUrl = uni.getStorageSync('avatarUrl') || '../../static/userCenter/weixin.png';
		// 	this.nickName = uni.getStorageSync('nickName') || '微信用户';
		// },
		methods: {
			onGetPhoneNumber(e) {
				console.log('e====', e);
			},
			onChooseAvatar(e) {
				console.log('e=====', e);
				const { avatarUrl } = e.detail 
			    this.avatarUrl = avatarUrl;
				uni.setStorageSync('avatarUrl', avatarUrl);
			},
			
			toOrder() {
				if(!this.getToken) {
					this.wxLogin();
					return;
				}
				uni.navigateTo({
					url: '../../userCenterPages/myOrder',
				})
			},
			toAddress() {
				if(!this.getToken) {
					this.wxLogin();
					return;
				}
				uni.navigateTo({
					url: '../../userCenterPages/address',
				})
			},
			requestSussessFun() {
				console.log('请求成功的要做的事情');
			}
		}
	}
</script>

<style lang="less" scoped>
	.user-page {
		.aaa {
			width: 160rpx;
			height: 160rpx;
			image {
				width: 100%;
				height: 100%;
			}
		}
		height: 100vh;
		background-color: #F7F7F7;
		.user-page-bj {
			width: 100%;
			height: 864rpx;
			position: absolute;
			top: 0;
		}
		.user-content {
			position: absolute;
			z-index: 10;
			width: 100%;
			height: 100vh;
			padding: 266rpx 26rpx 0 26rpx;
			box-sizing: border-box;
		}
		.user-c-top {
			display: flex;
			padding-left: 24rpx;
			margin-bottom: 50rpx;
			.top-left {
				width: 160rpx;
				height: 160rpx;
				background-color: #fff;
				border-radius: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 0;
				image {
					width: 100%;
					height: 100%;
					border-radius: 100%;
				}
			}
			.top-right {
				margin-left: 36rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				.top-right-title {
					font-size: 44rpx;
					margin-bottom: 12rpx;
				}
				.top-right-btn {
					background: rgba(0, 0, 0, .2);
					border-radius: 24rpx;
					height: 48rpx;
					line-height: 48rpx;
					padding: 0 24rpx;
					color: #fff;
					font-size: 28rpx;
				}
			}
		}
		.user-list {
			background-color: #fff;
			padding: 60rpx 34rpx 60rpx 46rpx;
			box-sizing: border-box;
			.user-list-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 35rpx;
				line-height: 88rpx;
				.user-order-img {
					width: 44rpx;
					height: 44rpx;
					margin-right: 20rpx;
				}
				.user-address-img {
					width: 44rpx;
					height: 46rpx;
					margin-right: 20rpx;
				}
				.user-customer-img {
					width: 44rpx;
					height: 46rpx;
					margin-right: 20rpx;
				}
				.user-list-item-arrow {
					width: 12rpx;
					height: 20rpx;
				}
			}
			.user-list-item:last-child {
				margin-bottom: 0;
			}
			.user-list-item-left {
				display: flex;
				align-items: center;
			}
		}
		button::after {
			border: none;
		}
		.item-button {
			background: none;
			padding: 0;
			line-height: 88rpx;
			.item-button-text {
				font-size: 32rpx;
			}
		}
	}
</style>