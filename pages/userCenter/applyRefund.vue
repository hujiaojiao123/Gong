<template>
	<view class="apply-refund">
		<view class="apply-title">
			<view class="title-top">申请退款中</view>
			<view>退款总金额：¥480.00</view>
			<view>发起时间：2022-07-05 10:50</view>
			<image class="apply-bj" src="../../static/userCenter/applyBj.png"></image>
		</view>
		<view class="apply-refund-content">
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
			<view class="order-bottom-mes">
				<view class="order-b-title">订单信息</view>
				<view class="order-b-content">
					<view>订单编号</view>
					<view>89898989898989</view>
				</view>
				<view class="order-b-content">
					<view>交易码</view>
					<view>89898989iiiipppp898989</view>
				</view>
			</view>
			<view class="order-detail-btn">
				<view class="b-btn order-detail-btn-left">联系客服</view>
				<view class="b-btn order-detail-btn-right" @click="toAfterSales">撤销申请</view>
			</view>
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
			toAfterSales() {
				uni.navigateTo({
					url: '/pages/userCenter/afterSales',
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.apply-refund {
		background-color: #F7F7F7;
		height: 100vh;
		.apply-title {
			width: 100%;
			height: 290rpx;
			background: linear-gradient(247deg, #386A55 0%, #21473E 100%);
			padding: 70rpx 20rpx 0 20rpx;
			box-sizing: border-box;
			font-size: 24rpx;
			color: #ccc;
			position: relative;
			margin-bottom: 20rpx;
			.title-top {
				font-size: 44rpx;
				margin-bottom: 20rpx;
				color: #fff;
			}
			.apply-bj {
				width: 246rpx;
				position: absolute;
				right: 0;
				top: 0;
				height: 290rpx;
			}
		}
		.apply-refund-content {
			padding: 0 40rpx 230rpx 40rpx;
			box-sizing: border-box;
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
			margin-bottom: 44rpx;
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
		.order-bottom-mes {
			.order-b-title {
				margin: 40rpx 0 30rpx 0;
				color: #666;
				font-size: 26rpx;
			}
			.order-b-content {
				display: flex;
				justify-content: space-between;
				color: #999;
				font-size: 24rpx;
				margin-bottom: 24rpx;
			}
		}
		.order-detail-btn {
			position: fixed;
			height: 230rpx;
			background-color: #fff;
			bottom: 0;
			width: 100%;
			left: 0;
			display: flex;
			justify-content: flex-end;
			.b-btn {
				width: 240rpx;
				height: 90rpx;
				line-height: 90rpx;
				text-align: center;
				border-radius: 2px;
				border: 1px solid #E6E6E6;
				font-size: 28rpx;
				margin-right: 36rpx;
				margin-top: 36rpx;
			}
		}
	}
</style>