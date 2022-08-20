<template>
	<view class="input">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name: "input",
		data() {
			return {

			};
		}
	}
</script>

<style>
	.input {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		border: 1px solid #dfe5ea;
		height: 2.7rem;
		width: 21rem;
		line-height: 2.7rem;
		border-radius: 16px;
		box-shadow: 0px 0 3px 1px rgb(221, 227, 232, 0.6);
		background-color: #fff;
	}
</style>
