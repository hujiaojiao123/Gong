<template>
	<view class="my-order-page">
		<view class="order-page-padding" v-if="orderList.length != 0" >
			<view class="good-li" v-for="(orderItem, orderIndex) in orderList" :key="orderIndex" v-if="orderItem.goods.length != 0">
				<view class="good-li-item" v-for="(item, index) in orderItem.goods" :key="index" @click="toClickFun(orderItem)">
					<image class="goodsImg" :src="item.product.cover"/>
					<view class="goods-content">
						<view>
							<view class="title">
								<view class="text-box">
									{{item.product.name}}
								</view>
							</view>
							<view class="info">
								规格：{{item.sku.name}}
							</view>
						</view>
						<view class="status-content-bottom">
							<view class="s-b-top">
								<span class="price-top">¥{{item.price}}</span>
								<span class="price-top-num">X{{item.goods_count}}</span>
							</view>
							<view class="s-b-bottom">
								<view class="price">
									<span class="big-text">实付款￥{{orderItem.goods.length === 1 ? orderItem.amount : item.amount}}</span>
								</view>
								<view class="bottom-right-mes">{{orderItem.status_name}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="order-blank" v-if="isRequestFinish && orderList.length == 0">
			<image src="/static/order/orderBlank.png"></image>
			<view>暂无任何订单</view>
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
				orderList: [],
				isRequestFinish: false,
			}
		},
		created() {
			this.getOrderListReqFun();
		},
		onShow() {
			uni.$on("getlist", (e)=>{
				this.getOrderListReqFun(); // 需要重新访问一下接口。
			}) 
		},
		onUnload() {
			uni.$off('getlist');
		},
		computed: {
			isShowBlank() {
				return this.isRequestFinish && this.orderList.length == 0;
			}
		},
		methods: {
			toClickFun(item) {
				if (item.status == 9) { // 跳转到
					uni.navigateTo({
						url: '/pages/userCenter/applyRefund?id=' + item.id,
					})
				} else {
					uni.navigateTo({
						url: '/pages/userCenter/orderDetail?id=' + item.id,
					})
				}
				
			},
			getOrderListReqFun() {
				this.isRequestFinish = false;
				this.$api.getOrderList({}).then((res) => {
					this.orderList = res;
					this.isRequestFinish = true;
				});
			},
		}
	}
</script>

<style lang="less">
	.my-order-page {
		height: 100%;
		background-color: #f7f7f7;
		box-sizing: border-box;
		.order-page-padding {
			padding: 40rpx;
		}
		.good-li {
			padding: 30rpx 28rpx;
			background-color: #fff;
			margin-bottom: 20rpx;
			.good-li-item {
				display: flex;
				margin-bottom: 30rpx;
			}
			.good-li-item:last-child {
				margin-bottom: 0;
			}
			.goodsImg {
				width: 200rpx;
				height: 200rpx;
				overflow: hidden;
				border-radius: 8rpx;
			}
			.goods-content {
				flex: 1;
				margin-left: 26rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.title{
					width: 365rpx;
					font-size: 28rpx;
					font-weight: 700;
					margin-bottom: 10rpx;
					color: #000;
					.text-box{
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
				}
				.info{
					color: #999;
					font-size: 24rpx;
				}
				.content-bottom {
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
				.price{
					.big-text{
						font-weight: 800;
						font-size: 35rpx;
					}
				}
				.bottom-right-mes {
					font-size: 26rpx;
					color: #999;
				}
				.s-b-top {
					margin-bottom: 4rpx;
				}
				.s-b-bottom {
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
				.price-top {
					font-size: 26rpx;
					color: #666;
				}
				.price-top-num {
					font-size: 24rpx;
					color: #999;
					margin-left: 8rpx;
				}
			}
		}
		.order-blank {
			display: flex;
			align-items: center;
			flex-direction: column;
			height: 100vh;
			padding-top: 320rpx;
			box-sizing: border-box;
			image {
				width: 226rpx;
				height: 154rpx;
				margin-bottom: 42rpx;
			}
			view {
				font-size: 32rpx;
				color: #BCBCBC;
			}
		}
	}
</style>