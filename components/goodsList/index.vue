<template>
	<view>
		<view class="good-li" v-for="(item, index) in list" :key="index">
			<image class="goods-img" :src="item.image" mode="widthFix"/>
			<view class="goods-content">
				<view>
					<view class="title">
						<view class="text-box">
							{{item.name}}
						</view>
					</view>
					<view class="info">
						规格：
						<span v-for="(citem, cindex) in item.specifications" :key="cindex">
							{{citem}}  
						</span>
					</view>
				</view>
				<view class="content-bottom" v-if="!showStatus">
					<view class="price">
						<span class="big-text">￥{{item.price}}</span>
					</view>
					<view v-if="showCount" class="bottom-right-mes">共{{item.count}}件</view>
				</view>
				<view class="status-content-bottom" v-if="showStatus">
					<view class="s-b-top">
						<span class="price-top">¥569</span>
						<span class="price-top-num">X2</span>
					</view>
					<view class="s-b-bottom">
						<view class="price">
							<span class="big-text">实付款￥{{item.price}}</span>
						</view>
						<view class="bottom-right-mes">已发货</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			list: {
				type: Array,
				default(){
					return []
				}
			},
			showCount: {
				type: Boolean,
				default(){
					return false
				}
			},
			showStatus: {
				type: Boolean,
				default(){
					return false
				}
			}
		}
	}
</script>

<style scoped lang="less">
	.good-li {
		padding: 30rpx 28rpx;
		display: flex;
		.goods-img {
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
	
</style>