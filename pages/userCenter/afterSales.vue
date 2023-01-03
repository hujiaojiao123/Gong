<template>
	<view class="after-sales">
		<view class="sales-title">申请售后</view>
		<view class="sales-choose">请选择你要退款的商品</view>
		<view class="goods-box goods-box-single">
			<view class="selected-box" @click="salesList.selected = !salesList.selected">
				<view class="no-choose" v-if="!salesList.selected"></view>
				<!-- <image src="/static/shop/gouxuan.png" mode="" ></image> -->
				<image src="/static/shop/gouxuan.png" mode="" v-else></image>
			</view>
			<view class="goods-box">
				<view class="goods-img">
					<image :src="salesList.image" mode=""></image>
				</view>
				<view class="content">
					<view>
						<view class="title">
							<view class="text-box">
								{{salesList.name}}
							</view>
						</view>
						<view class="info">
							规格：
							<span v-for="(citem, cindex) in salesList.specifications" :key="cindex">
								{{citem}}  
							</span>
						</view>
					</view>
					<view class="content-bottom">
						<view class="price">
							<span class="big-text">￥{{salesList.price}}</span>
						</view>
						<view class="count">
							<uni-number-box :min="1" v-model="salesList.count" @change="changeGoodsCount"></uni-number-box>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="refund-price">
			<view>退款总金额</view>
			<view>¥569</view>
		</view>
		<view class="refund-reason" @click="clickReason">
			<view>退款理由</view>
			<view class="refund-reason-right">
				<view class="right-text">{{refundReasonValue}}</view>
				<uni-icons type="bottom" color="#4B4B4B"></uni-icons>
			</view>
		</view>
		<view class="else-reason">
			<view>补充描述</view>
			<input class="else-reason-input" type="text" placeholder-class="line" placeholder="请输入"  v-model="elseReason"  />
		</view>
		<view class="sales-bottom-tip">
			建议您退款前先与客服人员沟通好，我们将做好每一步保障工作
		</view>
		<view class="after-sales-btn">发起退款申请</view>
		<!-- 弹出层 -->
		<!-- 弹出层 -->
		<uni-popup ref="afterSalesPopup" type="bottom" background-color="#fff">
			<view class="after-sales-popup">
				<view class="popup-top">
					<view class="popup-top-text">请选择</view>
					<view class="popup-top-icon" @click="clickClose">
						<uni-icons size="14" type="closeempty" color="#000"></uni-icons>
					</view>
				</view>
				<view>
					<view class="popup-list"
						v-for="(item, index) in refundReasonList" :key="index"
						:class="{popupChoose: refundReasonChoose == item.id}"
						@click="clickItem(item)"
					>
						{{item.value}}
					</view>
				</view>
				<view class="popup-btn" @click="surePop">确认</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		components: {
		},
		data() {
			return {
				salesList: {
					image: 'https://www.mescroll.com/demo/res/img/pd1.jpg',
					name: '大国工匠精神谱系系列产品',
					specifications: ['S', '黑色'],
					price: 68.6,
					count: 1,
					selected: false,
					show: true
				},
				elseReason: '',
				refundReasonList: [
					{
						value: '长时间未收到货物',
						id: 0,
					},
					{
						value: '包裹破损',
						id: 1,
					},
					{
						value: '尺码不对',
						id: 2,
					},
					{
						value: '有瑕疵',
						id: 3,
					},
					{
						value: '少发/漏发',
						id: 4,
					},
					{
						value: '错发',
						id: 5,
					},
				],
				refundReasonChoose: 0,
				refundReasonValue: '请选择',
				temporaryValue: '', // 临时值
			}
		},
		methods: {
			changeGoodsCount() {},
			clickReason() {
				this.$refs.afterSalesPopup.open('bottom');
			},
			clickItem(item) {
				this.temporaryValue = item.value;
				this.refundReasonChoose = item.id;
			},
			clickClose() {
				this.$refs.afterSalesPopup.close();
			},
			surePop() {
				this.clickClose();
				this.refundReasonValue = this.temporaryValue || '请选择';
			}
		}
	}
</script>

<style lang="less">
	.after-sales {
		background-color: #F7F7F7;
		height: 100vh;
		padding: 68rpx 40rpx 100rpx 40rpx;
		box-sizing: border-box;
		.sales-title {
			font-size: 44rpx;
			margin-bottom: 12rpx;
		}
		.sales-choose {
			color: #999;
			font-size: 24rpx;
		}
		.goods-box-single {
			margin-bottom: 20rpx;
		}
		.selected-box {
			width: 44rpx;
			position: relative;
			display: flex;
			align-items: center;
			margin-right: 30rpx;
			image{
				width: 40rpx;
				height: 40rpx;
				position: absolute;
				top: 50%;
				margin-top: -18rpx;
			}
		}
		.goods-img{
			width: 200rpx;
			height: 200rpx;
			overflow: hidden;
			border-radius: 8rpx;
			border: 1px solid #f00;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.goods-box{
			display: flex;
			padding: 22rpx 0;
			padding-right: 0;
			box-sizing: border-box;
			&-single{
				// border-bottom: 1px solid #f0f0f0;
			} 
			.no-choose {
				width: 39rpx;
				height: 39rpx;
				border: 2rpx solid #ccc;
				border-radius: 100%;
			}
			.selected-box {
				width: 44rpx;
				position: relative;
				display: flex;
				align-items: center;
				image{
					width: 40rpx;
					height: 40rpx;
					position: absolute;
					top: 50%;
					margin-top: -18rpx;
				}
			}
			.goods-img{
				width: 200rpx;
				height: 200rpx;
				overflow: hidden;
				border-radius: 8rpx;
				border: 1px solid #f00;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.content{
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
				}
				.price{
					.big-text{
						font-weight: 800;
						font-size: 35rpx;
					}
				}
				.count{
					display: flex;
					justify-content: flex-end;
				}
			}
		}
		.uni-numbox {
			border: 1px solid #e7e7e7;
			.uni-numbox__minus {
				border-right: 1px solid #e7e7e7;
			}
			.uni-numbox__plus {
				border-left: 1px solid #e7e7e7;
			}
		}
		.refund-price {
			height: 120rpx;
			background-color: #fff;
			border-radius: 16rpx;
			line-height: 120rpx;
			display: flex;
			justify-content: space-between;
			padding: 0 32rpx;
		}
		.refund-reason {
			display: flex;
			height: 120rpx;
			line-height: 120rpx;
			justify-content: space-between;
			border-bottom: 1px solid #E9E9E9;
			font-size: 24rpx;
			.refund-reason-right {
				display: flex;
				color: #4B4B4B;
			}
			.right-text {
				margin-right: 6rpx;
			}
		}
		.else-reason {
			display: flex;
			height: 120rpx;
			line-height: 120rpx;
			justify-content: space-between;
			font-size: 24rpx;
			align-items: center;
			.else-reason-input {
				text-align: right;
			}
			.line {
				color: #999;
			}
		}
		.sales-bottom-tip {
			color: #999;
			font-size: 22rpx;
			margin-top: 20rpx;
		}
		.after-sales-btn {
			width: 90%;
			position: fixed;
			left: 5%;
			bottom: 80rpx;
			height: 100rpx;
			line-height: 100rpx;
			text-align: center;
			color: #fff;
			background-color: #000;
			border-radius: 8rpx;
			font-size: 30rpx;
		}
		.after-sales-popup {
			padding: 60rpx 30rpx 50rpx 30rpx;
			display: flex;
			flex-direction: column;
			.popup-top {
				display: flex;
				justify-content: space-between;
				margin-bottom: 54rpx;
				.popup-top-text {
					font-size: 32rpx;
				}
				.popup-top-icon {
					width: 50rpx;
					display: flex;
					align-items: center;
					justify-content: flex-end;
				}
			}
			.popup-list {
				height: 80rpx;
				line-height: 80rpx;
				font-size: 26rpx;
				color: #999;
				padding: 0 20rpx;
			}
			.popupChoose {
				background-color: #F7F7F7;
				color: #000;
				
			}
			.popup-btn {
				width: 100%;
				height: 100rpx;
				line-height: 100rpx;
				text-align: center;
				background-color: #000;
				bottom: 80rpx;
				font-size: 30rpx;
				color: #fff;
				border-radius: 8rpx;
				margin-top: 30rpx;
			}
		}
	}
</style>