<template>
	<view class="order-detail">
		<view class="detail-top">
			<view class="confirm-title">{{orderDetailInfo.status_name}}</view>
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
				<view class="ad-content" v-if="orderDetailInfo.address" @click="toAddress">
					<view>
						<view class="ad-content-mes">{{orderDetailInfo.address.name}} {{orderDetailInfo.address.mobile}}</view>
						<view class="ad-content-mes ad-content-adress">
							{{orderDetailInfo.address.province + orderDetailInfo.address.city + orderDetailInfo.address.area + orderDetailInfo.address.address}}
						</view>
					</view>
					<image v-if="orderDetailInfo.status == 1 || orderDetailInfo.status == 4" class="ad-content-arrow" src="../../static/order/arrow.png"></image>
				</view>
			</view>
			<view class="detail-wuliu" v-if="orderDetailInfo.express_no">
				<view class="detail-wuliu-title">顺丰速运</view>
				<view class="detail-wuliu-content">
					<view class="detail-wuliu-order">{{orderDetailInfo.express_no}}</view>
					<view class="detail-wuliu-img-box" @click="cofyFun(orderDetailInfo.express_no)">
						<image class="detail-wuliu-img" src="/static/userCenter/copy.png"></image>
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
		</view>
		<view class="order-detail-btn" v-if="orderDetailInfo.status != 7 || orderDetailInfo.status != 2">
			<button class="b-btn order-detail-btn-left" type='default' open-type='contact'>联系客服</button>
			<view v-if="orderDetailInfo.status == 1" class="b-btn" @click="cancelOrder">取消订单</view>
			<view v-if="orderDetailInfo.status == 4 || orderDetailInfo.status == 11 || orderDetailInfo.status == 10" class="b-btn" @click="toAfterSales">申请售后</view>
			<view v-if="orderDetailInfo.status == 10" class="b-btn order-detail-btn-right" @click="clickSure">确认收货</view>
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
		onLoad(option) { // option为object类型，会序列化上个页面传递的参数
			this.getId = option.id;
		},
		onShow() {
			this.getOrderInfoReqFun(this.getId);
		},
		methods: {
			cofyFun(text) {
				uni.setClipboardData({
				  data: text, // 要被复制的内容
				  success:()=>{ // 复制成功的回调函数
					uni.showToast({ // 提示
					  title: `复制成功`,
					  icon: 'success'
					})
				  }
				},true);
			},
			toAfterSales() {
				uni.navigateTo({
					url: '/pages/userCenter/afterSales?id=' + this.getId,
				});
				this.$store.dispatch('goodsList', this.orderDetailInfo.goodsList);
			},
			toAddress() {
				if (this.orderDetailInfo.status == 1 || this.orderDetailInfo.status == 4) {
					uni.navigateTo({
						url: '/pages/userCenter/address',
					})
				}
			},
			clickSure() {
				this.changeStatusFun(11, '确认成功');
			},
			cancelOrder() {
				this.changeStatusFun(2, '取消成功');
			},
			changeStatusFun(status, title) {
				this.$api.getOrderStatus({
					order_id: this.orderDetailInfo.id,
					status,
				}).then((res) => {
					uni.showToast({ // 提示
						title,
						icon: 'success',
					});
					setTimeout(() => {
						uni.$emit('getlist', {})//这里可以传个空,也可以传值过去
						uni.navigateBack({
							delta: 1, //返回层数，2则上上页
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
					res.goods.forEach((item) => {
						arr.push({
							cover: item.product.cover,
							name: item.product.name,
							goods_sku_name: item.sku.name,
							price: item.price,
							goods_count: item.goods_count,
							selected: false,
							id: item.id,
							maxCount: item.goods_count,
						});
					});
					this.orderDetailInfo.goodsList = arr;
				});
			}
		}
	}
</script>

<style scoped lang="less">
	.order-detail {
		background-color: #F7F7F7;
		height: 100vh;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		.detail-top {
			flex: 1;
			overflow: auto;
			padding: 0 40rpx;
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
				color: #333;
				line-height: 46rpx;
			}
			.ad-content-arrow {
				width: 12rpx;
				height: 20rpx;
			}
		}
		.detail-wuliu {
			padding: 40rpx 0;
			border-bottom: 1px solid #E9E9E9;
			.detail-wuliu-title {
				font-size: 26rpx;
				color: #666;
				margin-bottom: 8rpx;
			}
			.detail-wuliu-content {
				display: flex;
				justify-content: space-between;
				.detail-wuliu-order {
					font-size: 24rpx;
					color: #999;
				}
				.detail-wuliu-img-box {
					width: 60rpx;
					text-align: right;
				}
				.detail-wuliu-img {
					width: 22rpx;
					height: 24rpx;
				}
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
			height: 230rpx;
			background-color: #fff;
			width: 100%;
			display: flex;
			justify-content: flex-end;
			.b-btn {
				width: 210rpx;
				height: 90rpx;
				line-height: 90rpx;
				text-align: center;
				border-radius: 2px;
				border: 1px solid #E6E6E6;
				font-size: 28rpx;
				margin-right: 26rpx;
				margin-top: 36rpx;
				background: none;
			}
			.order-detail-btn-left {
				height: 94rpx;
				padding: 0;
			}
			.order-detail-btn-right {
				background-color: #000;
				color: #fff;
			}
		}
	}
</style>