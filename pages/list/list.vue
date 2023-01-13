<template>
	<view class="list-page">
		<view class="list-page-container" ref="container"
		:style="{'padding-top': statusBarHeight.top - 6 + 'px', 
		height: statusBarHeight.height + 12 + 'px', 'line-height': statusBarHeight.height + 12 + 'px'}">
			<image src="/static/list/list_logo.png"></image>
			<view class="top-title">分类</view>
		</view>
		<!-- tab -->
		<view class="top-tab">
			<view 
				class="top-tab-text" :class="{choose: tabChooseIndex === item.id}" 
				v-for="item in tabList"
				:key="item.id"
				@click="clickTabBtn(item.id)"
			>
				<image :src="tabChooseIndex === item.id ? item.chooseImg : item.img"></image>
			</view>
		</view>
		<!-- content -->
		<view class="tab-content">
			<!-- 左侧菜单选项 -->
			<scroll-view v-if="menuList.length != 0" :scroll-top="scrollTop" class="left-aside" scroll-y="true" show-scrollbar="false">
				<view class="left-aside-item" :class="{active: current == item.id}" v-for="(item, index) in menuList" @click="menuTab(item.id)"
				 :key="item.id">
					{{item.name}}
				</view>
			</scroll-view>
			<!-- 右侧菜单选项 -->
			<scroll-view v-if="contentList.length != 0" scroll-with-animation scroll-y class="right-aside" @scroll="asideScroll" :scroll-top="tabScrollTop">
				<view class="r-content">
					<view class="right-aside-item" v-for="(item, index) in contentList" @click="toDetail(item.id)"
					 :key="item.id">
						<view class="r-image">
							<image :src="item.cover"></image>
						</view>
						<view class="r-title">{{item.name}}</view>
						<view class="r-price">¥{{item.price}}</view>
					</view>
				</view>
			</scroll-view>
			<view class="blank-text" v-if="isShowBlank">
				<image src="/static/list/listBlank.png"></image>
				<view>敬请期待～</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
	    components: {
	    },
	    data() {
	        return {
				tabChooseIndex: 2,
	            tabList: [
					{id: 1, name: '金', img: '/static/list/jin.png', chooseImg: '/static/list/jin_choose.png'},
					{id: 2, name: '木', img: '/static/list/mu.png', chooseImg: '/static/list/mu_choose.png'},
					{id: 3, name: '水', img: '/static/list/shui.png', chooseImg: '/static/list/shui_choose.png'},
					{id: 4, name: '火', img: '/static/list/huo.png', chooseImg: '/static/list/huo_choose.png'},
					{id: 5, name: '土', img: '/static/list/tu.png', chooseImg: '/static/list/tu_choose.png'},
				],
				menuList: [], // 左侧分类列表
				current: 0, // 当前点击项
				rectInfoList: [],
				tempCurrent: 0,
				scrollTop: 0, // 左侧导航栏距离顶部的位置
				tabScrollTop: 0,
				contentList: [],
				statusBarHeight: '',
				leftRequestEnd: false,
				rightRequestEnd: false,
			}
	    },
		onShow() {
			// this.getCategoriesFun(0);
			this.tabChooseIndex = 2;
			this.getCategoriesFun(this.tabChooseIndex);
		},
		created() {
			this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px';
		},
		computed: {
			isShowBlank() {
				return (this.leftRequestEnd && this.menuList.length == 0) || (this.rightRequestEnd && this.contentList.length == 0);
			}
		},
		mounted() {
			//#ifdef APP-PLUS
			this.statusBarHeight.top = uni.getSystemInfoSync()['statusBarHeight'];
			this.statusBarHeight.height = 40;
			// #endif
			//#ifdef MP
			this.statusBarHeight = uni.getMenuButtonBoundingClientRect()
			// #endif
		},
	    methods: {
			getCategoriesFun(catId){
				this.leftRequestEnd = false;
				this.$api.getCategories({
					cat_id: catId,
				}).then((res)=>{
					this.contentList = [];
					this.leftRequestEnd = true;
					if (catId == 0) {
						// this.tabList = res;
					} else {
						this.menuList = res;
						if (res.length != 0) {
							this.getListFun(res[0].id);
							this.current = res[0].id;
						}
					}
				});
			},
	        clickTabBtn(id) {
				this.tabChooseIndex = id;
				this.getCategoriesFun(id);
			},
			asideScroll() {
				
			},
			menuTab(id) {
				this.current = id;
				this.getListFun(id);
			},
			toDetail(id) {
				uni.navigateTo({
					url: '/pages/detail/detail?id=' + id,
				});
			},
			getListFun(catId) {
				this.rightRequestEnd = false;
				this.$api.getList({
				  cat_id: catId,
				}).then((res)=>{
				  this.contentList = res;
				  this.rightRequestEnd = true;
				});
			}
	    },
	}
</script>

<style lang="scss">
	.list-page {
		background-color: #fff;
		height: calc(100vh);
		display: flex;
		flex-direction: column;
		.list-page-container {
			font-size: 40rpx;
			color: #fff;
			width: 100%;
			display: flex;
			align-items: center;
			border-bottom: 1rpx solid rgba(0,0,0,0.1);
			text-align: center;
			position: relative;
			image {
				width: 48rpx;
				height: 54rpx;
				position: absolute;
				left: 36rpx;
			}
			.top-title {
				font-size: 34rpx;
				color: #000;
				flex: 1;
			}
		}
		.top-tab {
			display: flex;
			padding: 0 54rpx;
			background-color: #fff;
			justify-content: space-between;
			height: 142rpx;
			box-sizing: border-box;
			.top-tab-text {
				height: 142rpx;
				padding: 66rpx 10rpx 30rpx 10rpx;
				color: #ccc;
				font-weight: bold;
				image {
					width: 56rpx;
					height: 44rpx;
				}
			}
			.top-tab-text.choose {
				color: #000;
			}
		}
		.tab-content {
			padding: 40rpx 32rpx;
			display: flex;
			flex: 1;
			overflow: hidden;
			.left-aside {
				width: 168rpx;
				padding-right: 32rpx;
				flex-shrink: 0;
				height: 100%;
				box-sizing: border-box;
				.left-aside-item {
					font-size: 24rpx;
					color: #888;
					margin-bottom: 60rpx;
				}
				.left-aside-item.active {
					font-size: 30rpx;
					color: #333;
				}
			}
			.right-aside {
				flex: 1;
				overflow: hidden;
				.r-content {
					display: flex;
					flex-wrap: wrap;
					justify-content: space-between;
				}
				.right-aside-item {
					width: 250rpx;
					text-align: center;
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;
					margin-bottom: 60upx;
				}
				.r-image {
					width: 250upx;
					height: 250upx;
					background-color: #fff;
					border-radius: 4px 4px 0 0;
					margin-bottom: 24upx;
					image {
						width: 100%;
						height: 100%;
					}
				}
				.r-title {
					width: 216upx;
					height: 68upx;
					font-size: 24upx;
					font-weight: bold;
					margin-bottom: 24upx;
				}
				.r-price {
					font-size: 28upx;
					font-weight: bold;
				}
			}
		}
		.blank-text {
			display: flex;
			flex-direction: column;
			font-size: 32rpx;
			text-align: center;
			align-items: center;
			display: flex;
			padding-top: 300rpx;
			width: 100%;
			color: #BCBCBC;
			image {
				width: 200rpx;
				height: 188rpx;
				margin-bottom: 18rpx;
			}
		}
	}
</style>