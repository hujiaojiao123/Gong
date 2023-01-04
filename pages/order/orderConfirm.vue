<template>
	<view class="order-confirm">
		<view class="orderConfirm-top">
			<view class="confirm-title">订单确认</view>
			<view class="confirm-adress">
				<view class="ad-title">收货信息</view>
				<view class="ad-content" @click="toAdress">
					<view v-if="address != null">
						<view class="ad-content-mes">{{address.name}} {{address.mobile}}</view>
						<view class="ad-content-mes ad-content-adress">
						{{address.province + address.city + address.area + address.address}}
						</view>
					</view>
					<view v-else>请选择收货地址</view>
					<image class="ad-content-arrow" src="../../static/order/arrow.png"></image>
				</view>
			</view>
			<goodsList :list="confirmList" :showCount="true"></goodsList>
			<view class="order-detail-mes">
				<view class="o-price all-price">
					<view>商品总额</view>
					<view>¥{{total_goods}}</view>
				</view>
				<view class="o-price sale-price">
					<view>优惠金额</view>
					<view>-¥{{total_minus}}</view>
				</view>
				<view class="o-price reality-price">
					<view class="reality-price-left">实付款</view>
					<view>¥<span class="reality-price-right">{{total}}</span></view>
				</view>
			</view>
		</view>
		<view class="orderConfirm-bottom">
			<view class="confirm-btn" @click="toPay">立即支付</view>
		</view>
	</view>
</template>

<script>
	import goodsList from '@/components/goodsList/index.vue';
	export default {
		components: {
			goodsList,
		},
		data() {
			return {
				confirmList: [],
				address: null,
				total_goods: '',
				total: '',
				total_minus: '',
			}
		},
		onShow() {
			this.requestOrderConfirmFun();
		},
		methods: {
			toAdress() {
				uni.navigateTo({
					url: '/pages/userCenter/address',
				})
			},
			toPay() {
				this.$api.getOrderSave(this.$store.getters.chooseArr).then((res) => {
					wx.requestPayment({
						provider: 'wxpay',    //支付类型-固定值
						appid: res.appId,
						timeStamp: res.timestamp, // 时间戳（单位：秒）
						nonceStr: res.nonceStr, // 随机字符串
						package: res.package, // 固定值
						signType: res.signType, //固定值
						paySign: res.paySign, //签名
						success(res) {
							uni.showToast({
								title: '支付成功',
								icon: 'none'
							});
							// 存储刷新购物车的标识
							uni.setStorageSync('addCart', true);
						},
						fail(res) {
							console.log('支付失败', res)
						}
					})
				})
			},
			requestOrderConfirmFun() {
				this.$api.getOrderConfirm(this.$store.getters.chooseArr).then((res) => {
					this.address = res.address;
					this.confirmList = res.goods;
					this.total_goods = res.total_goods;
					this.total = res.total;
					this.total_minus = res.total_minus;
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.order-confirm {
		background-color: #F7F7F7;
		height: 100vh;
		padding: 0 40rpx;
		display: flex;
		flex-direction: column;
		.orderConfirm-top {
			flex: 1;
			overflow: auto;
			padding-bottom: 30rpx;
		}
		.confirm-title {
			font-size: 44rpx;
			padding: 68rpx 0;
		}
		.confirm-adress {
			.ad-title {
				color: #999;
				font-size: 26rpx;
				margin-bottom: 32rpx;
			}
			.ad-content {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-bottom: 40rpx;
				border-bottom: 1px solid #E9E9E9;
				margin-bottom: 20rpx;
			}
			.ad-content-mes {
				font-size: 28rpx;
				
			}
			.ad-content-arrow {
				width: 12rpx;
				height: 20rpx;
			}
		}
		.order-detail-mes {
			margin-top: 20rpx;
			background-color: #fff;
			box-sizing: border-box;
			padding: 50rpx 32rpx 28rpx 32rpx;
			.o-price {
				display: flex;
				justify-content: space-between;
			}
			.all-price, .sale-price {
				margin-bottom: 22rpx;
				font-size: 24rpx;
				color: #999;
			}
			.reality-price {
				margin-top: 6rpx;
			}
			.reality-price-left {
				font-size: 26rpx;
			}
			.reality-price-right {
				font-size: 40rpx;
				margin-left: 6rpx;
			}
		}
		.orderConfirm-bottom {
			height: 180rpx;
			background-color: #F7F7F7;
		}
		.confirm-btn {
			width: 100%;
			height: 100rpx;
			line-height: 100rpx;
			border-radius: 8rpx;
			text-align: center;
			color: #fff;
			font-size: 30rpx;
			background-color: #000;
		}
	}
</style>