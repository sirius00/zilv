<template>
	<view>
		<button class="button">
			<slot></slot> 
		</button>
	</view>
</template>

<script>
	export default {
		name:"button_one",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.button{
	background-color: #000;
	color: #fff;
	border-radius: 14px;
	width: 80vw;
}
</style>