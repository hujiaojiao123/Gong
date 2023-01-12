<template>
	<view class="apply-refund">
		<view class="apply-title">
			<view class="title-top">{{getStatusName}}</view>
			<view>退款总金额：¥{{orderDetailInfo.refund[0].amount || ''}}</view>
			<view>发起时间：{{orderDetailInfo.refund[0].created_at || ''}}</view>
			<image class="apply-bj" src="../../static/userCenter/applyBj.png"></image>
		</view>
		<view class="apply-refund-content">
			<goodsList v-if="orderDetailInfo.goodsList.length != 0" :list="orderDetailInfo.goodsList" :showCount="true"></goodsList>
			<view class="order-detail-mes">
				<view class="o-price all-price">
					<view>商品总额</view>
					<view>¥{{orderDetailInfo.amount_goods || ''}}</view>
				</view>
				<view class="o-price sale-price">
					<view>优惠金额</view>
					<view>-¥{{orderDetailInfo.amount_minus || ''}}</view>
				</view>
				<view class="o-price reality-price">
					<view class="reality-price-left">实付款</view>
					<view>¥<span class="reality-price-right">{{orderDetailInfo.amount || ''}}</span></view>
				</view>
			</view>
			<view class="confirm-adress">
				<view class="ad-title">收货信息</view>
				<view class="ad-content" v-if="orderDetailInfo.address">
					<view>
						<view class="ad-content-mes">{{orderDetailInfo.address.name}} {{orderDetailInfo.address.mobile}}</view>
						<view class="ad-content-mes ad-content-adress">
							{{orderDetailInfo.address.province + orderDetailInfo.address.city + orderDetailInfo.address.area + orderDetailInfo.address.address}}
						</view>
					</view>
				</view>
			</view>
			<view class="order-bottom-mes">
				<view class="order-b-title">订单信息</view>
				<view class="order-b-content">
					<view>订单编号</view>
					<view>{{orderDetailInfo.orderno || ''}}</view>
				</view>
			</view>
			<view class="order-detail-btn">
				<button class="b-btn order-detail-btn-left" type='default' open-type='contact'>联系客服</button>
				<view v-if="orderDetailInfo.refund[0].status == 0" class="b-btn order-detail-btn-right" @click="revokeFun">撤销申请</view>
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
				orderDetailInfo: {
					goodsList: [],
				},
				getId: '',
			}
		},
		computed: {
			getStatusName() {
				if (this.orderDetailInfo.refund[0].status == 0) {
					return '申请退款中'
				} 
				if (this.orderDetailInfo.refund[0].status == 1) {
					return '已退款'
				} 
				if (this.orderDetailInfo.refund[0].status == 2) {
					return '拒绝退款'
				} 
				if (this.orderDetailInfo.refund[0].status == 3) {
					return '取消退款'
				} 
			}
		},
		onLoad(option) { //option为object类型，会序列化上个页面传递的参数
			this.getId = option.id;
			this.getOrderInfoReqFun(option.id);
		},
		methods: {
			revokeFun() {
				this.$api.getRefundCancel({
					refund_id: this.orderDetailInfo.refund[0].id,
				}).then((res) => {
					uni.showToast({ // 提示
						title: '撤销成功',
						icon: 'success'
					});
					setTimeout(() => {
						uni.$emit('getlist', {})//这里可以传个空,也可以传值过去
						uni.navigateBack({
							delta: 1, // 返回层数，2则上上页
						});
					}, 1000);
				});
			},
			getOrderInfoReqFun(id) {
				this.$api.getOrderInfo({
					order_id: id,
				}).then((res) => {
					let arr = [];
					this.orderDetailInfo = res;
					res.refund[0].goods.forEach((item) => {
						arr.push({
							cover: item.order_goods.product.cover,
							name: item.order_goods.product.name,
							goods_sku_name: item.order_goods.sku.name,
							price: item.order_goods.price,
							goods_count: item.order_goods.goods_count,
							selected: false,
							id: item.order_goods.id,
							maxCount: item.order_goods.goods_count,
						});
					});
					this.orderDetailInfo.goodsList = arr;
				});
			}
		}
	}
</script>

<style scoped lang="less">
	.apply-refund {
		background-color: #F7F7F7;
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
				color: #333;
				line-height: 46rpx;
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
				background: none;
			}
			.order-detail-btn-left {
				height: 94rpx;
				padding: 0;
			}
		}
	}
</style>