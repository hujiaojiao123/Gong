<template>
	<view class="common-header" 
	:style="{
		'background':background,
		'padding-top':navBar.top -6 +'px',
		'height':navBar.height+12+'px',
	}">
		<view class="left" v-if="showBack" @click="back">
			<uni-icons type="back" size="22"></uni-icons>
		</view>
		<view class="title">{{title}}</view>
	</view>
</template>

<script>
	export default {
		props:{
			title: {
				type: String,
				default(){
					return ''
				}
			},
			showBack: {
				type: Boolean,
				default(){
					return false
				}
			},
			background: {
				type: String,
				default(){
					return '#ff'
				}
			}
		},
		data() {
			return {
				navBar: '',
				headerHeight: '',
			}
		},
		mounted() {
			this.navBar = uni.getMenuButtonBoundingClientRect();
			console.log('wwww2244======', uni.getMenuButtonBoundingClientRect())
			this.headerHeight = this.navBar.top - 6 + this.navBar.height + 12 + 1;
			console.log(this.headerHeight);
						
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style scoped lang="less">
	.common-header {
		display: flex;
		align-items: center;
		justify-content: center;
		border-bottom: 1rpx solid rgba(0,0,0,0.1);
	}
	.left {
		position: absolute;
		left: 34rpx;
	}
	.title {
		font-size: 34rpx;
		color: #000;
	}
</style>