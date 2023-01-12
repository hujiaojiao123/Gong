<template>
	<view class="list-page">
		<!-- <view class="list-page-logo" ref="container" :style="{top: statusBarHeight}">廾</view> -->
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
			<view class="blank-text" v-if="isShowBlank">暂无数据</view>
		</view>
	</view>
</template>

<script>
	export default {
	    components: {},
	    data() {
	        return {
				tabChooseIndex: 1,
	            tabList: [
					{id: 1, name: '金', img: '/static/list/jin.png', chooseImg: '/static/list/jin_choose.png'},
					{id: 2, name: '木', img: '/static/list/mu.png', chooseImg: '/static/list/mu_choose.png'},
					{id: 3, name: '水', img: '/static/list/shui.png', chooseImg: '/static/list/shui_choose.png'},
					{id: 4, name: '火', img: '/static/list/huo.png', chooseImg: '/static/list/huo_choose.png'},
					{id: 5, name: '土', img: '/static/list/tu.png', chooseImg: '/static/list/tu_choose.png'},
				],
				menuList: [
					{name: '全部商品', id: 'all'},
					{name: '建军95周年系列', id: '95'},
					{name: '周年限定', id: 'only'},
				], // 左侧分类列表
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
			this.getCategoriesFun(1);
		},
		created() {
			this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px';
		},
		computed: {
			isShowBlank() {
				return (this.leftRequestEnd && this.menuList.length == 0) || (this.rightRequestEnd && this.contentList.length == 0);
			}
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
						this.getListFun(res[0].id);
						this.current = res[0].id;
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
		background-color: #eee;
		height: calc(100vh);
		display: flex;
		flex-direction: column;
		.list-page-logo {
			font-size: 40rpx;
			color: #fff;
			height: 88rpx;
			position: fixed;
			left: 36rpx;
			line-height: 70rpx;
			z-index: 10;
		}
		.top-tab {
			display: flex;
			padding: 44upx 64upx 26upx 64upx;
			background-color: #fff;
			justify-content: space-between;
			.top-tab-img {
				// width: 29px;
				// height: 23px;
			}
			.top-tab-text {
				color: #ccc;
				line-height: 72upx;
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
			padding: 40upx 32upx;
			display: flex;
			flex: 1;
			overflow: hidden;
			.left-aside {
				width: 168upx;
				padding-right: 32upx;
				flex-shrink: 0;
				height: 100%;
				box-sizing: border-box;
				.left-aside-item {
					font-size: 24upx;
					color: #888;
					margin-bottom: 60upx;
				}
				.left-aside-item.active {
					font-size: 30upx;
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
					width: 250upx;
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
			font-size: 32rpx;
			text-align: center;
			align-items: center;
			display: flex;
			justify-content: center;
			width: 100%;
		}
	}
</style>