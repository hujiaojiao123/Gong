<template>
	<view class="list-page">
		<!-- tab -->
		<view class="top-tab">
			<view 
				class="top-tab-text" :class="{choose: tabChooseIndex === item.id}" 
				v-for="item in tabList"
				:key="item.id"
				@click="clickTabBtn(item.id)"
			>
				{{item.name}}
			</view>
		</view>
		<!-- content -->
		<view class="tab-content">
			<!-- 左侧菜单选项 -->
			<scroll-view :scroll-top="scrollTop" class="left-aside" scroll-y="true" show-scrollbar="false">
				<view class="left-aside-item" :class="{active: current == item.id}" v-for="(item, index) in menuList" @click="menuTab(item.id)"
				 :key="item.id">
					{{item.name}}
				</view>
			</scroll-view>
			<!-- 右侧菜单选项 -->
			<scroll-view scroll-with-animation scroll-y class="right-aside" @scroll="asideScroll" :scroll-top="tabScrollTop">
				<view class="r-content">
					<view class="right-aside-item" v-for="(item, index) in contentList" @click="toDetail(item.id)"
					 :key="item.id">
						<view class="r-image">
							<image :src="item.cover"></image>
							<!-- <image src="http://www.gong-official.com/uploads/image/2022/12/20/4f5a613010defb80eddf6d24b8bf41191a78e9b8.jpg"></image> -->
						</view>
						<view class="r-title">{{item.name}}</view>
						<view class="r-price">¥{{item.price}}</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
	    components: {},
	    data() {
	        return {
				tabChooseIndex: 1,
	            tabList: [],
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
			}
	    },
		onShow() {
			this.getCategoriesFun(0);
			this.getCategoriesFun(1);
		},
		created() {
			console.log('11njcdnjcnjd')
			console.log(this.$api);
		},
	    methods: {
			async getCategoriesFun(catId){
				try {
					const res = await this.$api.getCategories({
						cat_id: catId,
					});
					this.contentList = [];
					if (catId == 0) {
						this.tabList = res;
					} else {
						this.menuList = res;
						this.getListFun(res[0].id);
						this.current = res[0].id;
					}
					// 保存数据
				} catch (err) {
					// uni.showToast({ title: err, icon:'none' })
				}
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
				this.$api.getList({
				  cat_id: catId,
				}).then((res)=>{
				  this.contentList = res;
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
			font-size: 60upx;
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
</style>