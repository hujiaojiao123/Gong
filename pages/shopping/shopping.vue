<template>
	<view class="shop-page">
		<view v-if="goods_list.length !== 0">
			<uni-swipe-action>
				<uni-swipe-action-item :index="bindex"
					v-for="(bitem, bindex) in goods_list" :key="bindex" 
					@click="clickH(bindex, bitem)" @open="openH"
					:right-options="options">
					<view class="item u-border-bottom">
						<view class="goods-box goods-box-single">
							<view class="selected-box" @click="chooseItem(bitem, bindex)">
								<view class="no-choose" v-if="!goods_list[bindex].selected"></view>
								<!-- <image src="/static/shop/gouxuan.png" mode="" ></image> -->
								<image class="choose-img" src="/static/shop/gouxuan.png" mode="" v-else></image>
							</view>
							<view class="goods-box">
								<view class="goods-img">
									<image :src="bitem.cover" mode=""></image>
								</view>
								<view class="content">
									<view>
										<view class="title">
											<view class="text-box">
												{{bitem.name}}
											</view>
										</view>
										<view class="info">
											规格：
											<span v-for="(citem, cindex) in bitem.goods_sku_names" :key="cindex">
												{{citem}}  
											</span>
										</view>
									</view>
									<view class="content-bottom">
										<view class="price">
											<span class="big-text">￥{{bitem.price}}</span>
										</view>
										<view class="count">
											<uni-number-box :min="1" :max="200" background="#fff" v-model="bitem.goods_amount" @change="changeGoodsCount(bindex)"></uni-number-box>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</uni-swipe-action-item>
			</uni-swipe-action>
			<!-- 底部全选 -->
			<view class="pay-tabbar">
				<view class="left">
					<view class="left-img">
						<view class="no-choose" v-if="!isAllSelected" @click="selectAll"></view>
						<!-- <image src="" mode="" v-if="!isAllSelected" @click="selectAll"></image> -->
						<image class="choose-img" src="/static/shop/gouxuan.png" mode="" v-else  @click="selectAll"></image>
					</view>
					<span class="left-all">全选</span>
				</view>
				<view class="center">
					<view class="center-all">
						<span class="center-label">合计:</span>
						<span class="price">
							￥{{totalPrice}}
						</span>
					</view>
					<view class="center-sale">共优惠¥{{salePrice}}</view>
				</view>
				<view class="right" @click="toPay">
					结算
				</view>
			</view>	
		</view>
		<!-- 空白页面 -->
		<view class="shop-blank" v-if="isRequest && (goods_list.length === 0 || !isToken)">
			<image class="blank-img" src="/static/shop//blank.png"></image>
			<view class="blank-mes">赶快把购物袋装满吧～</view>
			<view class="blank-btn" @click="toList">去选品</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {
		},
		data() {
			return {
				list: [],
				isToken: '',
				AllSelectedState: false,
				windowWidth: 0,
				isAuthor: false,
				goods_list:[],
				isRequest: false,
				options: [
					{
						text: '删除',
						style: {
							backgroundColor: '#dd524d'
						}
					}
				]
			}
		},
		computed: {
			isAllSelected() {
				let allSelected = true
				this.goods_list.map((val, idx) => {
					if(val.selected == false) {
						allSelected = false
					}
				})
				this.AllSelectedState = allSelected
				return allSelected
			},
			totalPrice(){
				let tPrice = 0
				this.goods_list.forEach(res=>{
					if(res.selected){
						tPrice += res.price * res.goods_amount
					}
				})
				return tPrice.toFixed(1)
			},
			salePrice() {
				let tPrice = 0
				this.goods_list.forEach(res=>{
					if(res.selected){
						tPrice += (res.price_sale * res.goods_amount) - (res.price * res.goods_amount)
					}
				})
				return tPrice.toFixed(1)
			}
		},
		onLoad() {
			this.getCartListReqFun();
		},
		onShow() {
			if (uni.getStorageSync('addCart')) {
				this.getCartListReqFun();
			}
			this.isToken = uni.getStorageSync('token');
		},
		methods:{
			// 请求列表
			getCartListReqFun() { 
				this.$api.getCartList({}).then((res) => {
					res.forEach((item) => {
						item.selected = false;
						item.show = true;
					});
					this.goods_list = res;
					this.isRequest = true;
					uni.removeStorageSync('addCart')
				});
			},
			chooseItem(item, index) {
				this.goods_list[index].selected = !this.goods_list[index].selected;
				// goods_list[bindex].selected = !goods_list[bindex].selected
			},
			toPay(){
				if(this.goods_list.findIndex(target=>target.selected===true) == -1){
					uni.showToast({ title: '您还没有选择哦～', icon:'none' });
				    return;
				}
				let chooseArr = [];
				this.goods_list.forEach((item, index) => {
					if (item.selected) {
						chooseArr.push({
							goods_id: item.goods_id,
							goods_sku_id: item.goods_sku_ids,
							goods_count: item.goods_amount
						})
					}
				})
				this.$api.getOrderSave(chooseArr).then((res) => {
					uni.navigateTo({
						url: '/pages/order/orderConfirm',
					});
				})
				
			},
			toList() {
				uni.switchTab({
					url: '/pages/list/list'
				});
			},
			selectAll(){
				let changeAllSelectedState = false
				if(!this.AllSelectedState) changeAllSelectedState = true
				this.goods_list.map((val, idx) => {
					this.goods_list[idx].selected = changeAllSelectedState
				})
			},
			changeTab(res) {
			  console.log(res);
			  if (res != 2) {
			    this.$changeFun(res);
			  }
			},
			changeGoodsCount(e){
				console.log(e)
			},
			clickH(index, item) {
				this.goods_list.splice(index, 1);
				this.$api.getCartRemove({
					cart_id: item.id,
				}).then((res) => {
					uni.showToast({ title: '删除成功', icon:'none' });
					uni.navigateBack({
						delta: 1,
					});
				});
			},
			// 如果打开一个的时候，不需要关闭其他，则无需实现本方法
			openH(index) {
				// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
				// 原本为'false'，再次设置为'false'会无效
				// console.log('open>>',index)
				console.log('open>>',index)
				this.goods_list[index].show = true;
				this.goods_list.map((val, idx) => {
					console.log('oppp>>>', val, '>>>>',idx)
					if(index != idx) {
						this.goods_list[idx].show = false
					}
				})
			}
		}
	}
</script>
<style>
	
</style>
<style lang="scss">
	.shop-page {
		background-color: #F7F7F7;
		padding: 32rpx 20rpx 200rpx 20rpx;
		box-sizing: border-box;
		height: 100vh;
		.item {
			display: flex;
			background: #FFFFFF;
			border-radius: 4px;
			
		}
		.uni-swipe {
			margin-bottom: 20rpx;
		}
		.no-choose {
			width: 39rpx;
			height: 39rpx;
			border: 2rpx solid #ccc;
			border-radius: 100%;
		}
		.choose-img {
			width: 42rpx;
			height: 42rpx;
		}
		.pay-tabbar{
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			background-color: #FFFFFF;
			display: flex;
			align-items: center;
			padding: 32rpx;
			box-sizing: border-box;
			justify-content: space-between;
			z-index: 10;
			.left{
				display: flex;
				align-items: center;
				font-weight: 600;
				.left-img {
					margin-right: 24rpx;
					display: flex;
				}
				.left-all {
					font-size: 28rpx;
				}
				
			}
			.center{
				text-align: right;
				.center-label {
					color: #999;
					font-size: 24rpx;
				}
				.price {
					font-size: 32rpx;
					font-weight: bold;
				}
				.center-sale {
					font-size: 24rpx;
					color: #333;
				}
			}
			.right{
				width: 226rpx;
				height: 90rpx;
				background: #000000;
				border-radius: 2px;
				text-align: center;
				line-height: 90rpx;
				font-size: 30rpx;
				color: #fff;
			}
		}
		.goods-box{
			display: flex;
			padding: 22rpx;
			padding-right: 0;
			box-sizing: border-box;
			&-single{
				// border-bottom: 1px solid #f0f0f0;
			}
			.selected-box {
				width: 44rpx;
				position: relative;
				display: flex;
				align-items: center;
			}
			.goods-img{
				width: 200rpx;
				height: 200rpx;
				overflow: hidden;
				border-radius: 8rpx;
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
		.shop-blank {
			padding-top: 336rpx;
			text-align: center;
			display: flex;
			flex-direction: column;
			align-items: center;
			.blank-img {
				width: 160rpx;
				height: 184rpx;
				margin-bottom: 40rpx;
			}
			.blank-mes {
				font-size: 32rpx;
				color: #BCBCBC;
				margin-bottom: 84rpx;
			}
			.blank-btn {
				width: 220rpx;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				background: #000;
				border-radius: 4rpx;
				color: #fff;
				font-size: 28rpx;
			}
		}
	}
</style>