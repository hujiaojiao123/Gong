<template>
	<view class="address-page">
		<view class="address-item">
			<view class="item-top">收货人</view>
			<input class="item-input" type="text" @input="inputNameFun" placeholder-class="line" placeholder="请填写收货人姓名" v-model="name"  />
			<view v-show="isShowNameTip" class="red-tip">请输入收货人</view>
		</view>
		<view class="address-item">
			<view class="item-top">手机号码</view>
			<input class="item-input" type="text" 
				placeholder-class="line" placeholder="请填写收货人手机号" 
				@input="inputPhoneFun"
				maxlength="11"
				v-model="mobile"
			/>
			<view v-show="isShowPhoneTip" class="red-tip">请输入正确的手机号</view>
		</view>
		<view class="address-item">
			<view class="item-top">收货地区</view>
			<AddressPicker class="address-picker" @change="change" :value="chooseValue">{{planLocate}}</AddressPicker>
			<view class="address-line"></view>
			<!-- <input class="item-input" disabled="" type="text" placeholder-class="line" placeholder="请选择收货地区"  v-model="phone"  /> -->
		</view>
		<view class="address-item">
			<view class="item-top">详细地址</view>
			<input class="item-input" type="text" placeholder-class="line" 
				@input="inputAddressFun" placeholder="请填写详细地址"  v-model="address"  />
			<view v-show="isShowAddressTip" class="red-tip">请输入详细地址</view>
		</view>
		<view class="address-btn" @click="saveFun">保存</view>
	</view>
</template>

<script>
	import AddressPicker from "../../components/lingdang-AddressPicker/AddressPicker.vue"
	import AllAddress from '../../components/lingdang-AddressPicker/AddressData.js'
	export default {
		components: {
			AddressPicker,
		},
		data() {
			return {
				name: '',
				mobile: '',
				show: false,
				planLocate: '请选择收货地区',
				address: '',
				getChooseName: [],
				chooseValue: [],
				isShowNameTip: false,
				isShowPhoneTip: false,
				isShowAddressTip: false,
			}
		},
		created() {
			this.getAddressInfoFun();
		},
		methods: { 
			//父组件的获取子组件传递的值， 在为josn 有code和name 
			change(result) { 
				this.planLocate = ''; 
				result.data.forEach( (item,index) =>{ 
					if(index===0){ 
						this.planLocate += item.name 
					} else{ 
						this.planLocate += '-' +item.name
					} 
				}) ; 
				let arr = this.planLocate.split('-'); 
				this.getChooseName = arr;
			}, 
			// 获取地址接口
			getAddressInfoFun() {
				this.$api.getAddressInfo({}).then((res) => {
					this.address = res.address;
					this.name = res.name;
					this.mobile = res.mobile;
					let arr = [];
					AllAddress.forEach((provinceItem, provinceIndex) => {
						if (provinceItem.name == res.province) {
							arr[0] = provinceIndex;
							provinceItem.children.forEach((cityItem, cityIndex) => {
								if (cityItem.name == res.city) {
									arr[1] = cityIndex;
								}
								cityItem.children.forEach((areaItem, areaIndex) => {
									if (areaItem.name == res.area) {
										arr[2] = areaIndex;
									}
								})
							})
						}
					})
					this.getChooseName = [res.province, res.city, res.area];
					this.chooseValue = arr;
					this.planLocate = `${res.province}-${res.city}-${res.area}`;
					// console.log(arr);
				})
			},
			saveFun() {
				if (!this.name) {
					return;
				}
				if (!this.mobile) {
					return;
				}
				if (!this.address) {
					return;
				}
				if (!this.getChooseName[0]) {
					uni.showToast({ title: '请选择收货地区～', icon:'none' });
					return;
				}
				this.$api.getSave({
					name: this.name,
					mobile: this.mobile,
					address: this.address,
					province: this.getChooseName[0],
					city: this.getChooseName[1],
					area: this.getChooseName[2]
				}).then((res) => {
					uni.showToast({ title: '保存成功', icon:'none' });
					uni.navigateBack({
						delta: 1,
					});
				})
			},
			inputPhoneFun(str) {
				this.isShowPhoneTip = !this.validatePhoneNumber(str.target.value);
			},
			inputNameFun(str) {
				this.isShowNameTip = !str.target.value;
			},
			inputAddressFun(str) {
				this.isShowAddressTip = !str.target.value;
			},
			validatePhoneNumber(str) {
			  const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
			  return reg.test(str);
			}
		},
	}
</script>

<style lang="less">
	.address-page {
		height: 100vh;
		background-color: #f7f7f7;
		box-sizing: border-box;
		padding: 100rpx 50rpx;
		.address-item {
			margin-bottom: 80rpx;
			.item-top {
				font-size: 24rpx;
				color: #666;
				margin-bottom: 20rpx;
			}
			.item-input {
				padding: 12rpx 0;
				border-bottom: 1px solid #ECECEC;
			}
			.line {
				color: #999;
				font-size: 32rpx;
			}
			.address-picker {
				color: #4B4B4B;
				font-size: 32rpx;
			}
			.address-line {
				margin-top: 12rpx;
				height: 1px;
				background-color: #ECECEC;
			}
			.red-tip {
				color: red;
				font-size: 24rpx;
			}
		}
		.address-btn {
			width: 90%;
			height: 100rpx;
			background: #000000;
			border-radius: 8rpx;
			position: fixed;
			bottom: 80rpx;
			left: 5%;
			line-height: 100rpx;
			text-align: center;
			color: #fff;
			font-size: 30rpx;
		}
	}
</style>