<template>
	<view class="my-order-page">
		<goodsList :list="orderList" :showStatus="true"></goodsList>
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
				orderList: [
					{
						image: 'https://www.mescroll.com/demo/res/img/pd1.jpg',
						name: '大国工匠精神谱系系列产品',
						specifications: ['S', '黑色'],
						price: 68.6,
						count: 1,
						selected: false,
						show: true
					},
					{
						image: 'https://www.mescroll.com/demo/res/img/pd1.jpg',
						name: '大国工匠精神谱系系列产品',
						specifications: ['S', '黑色'],
						price: 68.6,
						count: 1,
						selected: false,
						show: true
					},
				]
			}
		},
		methods: {
			toAdress() {
				// uni.navigateTo({
				// 	url: '/pages/order/orderConfirm',
				// })
			}
		}
	}
</script>

<style lang="less">
	.my-order-page {
		height: 100vh;
		background-color: #f7f7f7;
		padding: 40rpx;
		box-sizing: border-box;
		.good-li {
			background-color: #fff;
			margin-bottom: 20rpx;
		}
	}
</style>