<template>
	<view class="order-confirm">
		<view class="confirm-title">订单确认</view>
		<view class="confirm-adress">
			<view class="ad-title">收货信息</view>
			<view class="ad-content" @click="toAdress">
				<view>
					<view class="ad-content-mes">沙林 15959225155</view>
					<view class="ad-content-mes ad-content-adress">北京市朝阳区姚家园东里8号楼一单元803</view>
				</view>
				<image class="ad-content-arrow" src="../../static/order/arrow.png"></image>
			</view>
		</view>
		<goodsList :list="confirmList" :showCount="true"></goodsList>
		<view class="order-detail-mes">
			<view class="o-price all-price">
				<view>商品总额</view>
				<view>¥569</view>
			</view>
			<view class="o-price sale-price">
				<view>优惠金额</view>
				<view>-¥10.00</view>
			</view>
			<view class="o-price reality-price">
				<view class="reality-price-left">实付款</view>
				<view>¥<span class="reality-price-right">480</span></view>
			</view>
		</view>
		<view class="confirm-btn">立即支付</view>
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
				confirmList: [
					{
						image: 'https://www.mescroll.com/demo/res/img/pd1.jpg',
						name: '大国工匠精神谱系系列产品',
						specifications: ['S', '黑色'],
						price: 68.6,
						count: 1,
						selected: false,
						show: true
					},
				]
			}
		},
		methods: {
			toAdress() {
				// uni.navigateTo({
				// 	url: '/pages/order/orderConfirm',
				// })
			}
		}
	}
</script>

<style scoped lang="less">
	.order-confirm {
		background-color: #F7F7F7;
		height: 100vh;
		padding: 0 40rpx;
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
			padding: 50rpx 32rpx;
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
		.confirm-btn {
			position: fixed;
			bottom: 110rpx;
			left: 50%;
			transform: translateX(-50%);
			width: 90%;
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