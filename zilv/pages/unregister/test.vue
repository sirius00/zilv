<template>
  <div class="input-captcha-20190115">
    <h3>栗子1：简单的input框</h3>
    <div class="input-box">
      <input v-model.trim="simpleInput0" type="number" placeholder="请输入六位数字验证码">
    </div>
    <br>
    <br>
    <h3>栗子2：由六个span代替输入框</h3>
    <div class="input-box">
      <div class="tips">用六个span代替输入框：</div>
      <label class="simple-input-content" for="simpleInput1">
        <span class="highlight">{{simpleInput1.slice(0,1)}}</span>
        <span :class="simpleInput1.length > 1?'highlight':''">{{simpleInput1.slice(1,2)}}</span>
        <span :class="simpleInput1.length > 2?'highlight':''">{{simpleInput1.slice(2,3)}}</span>
        <span :class="simpleInput1.length > 3?'highlight':''">{{simpleInput1.slice(3,4)}}</span>
        <span :class="simpleInput1.length > 4?'highlight':''">{{simpleInput1.slice(4,5)}}</span>
        <span :class="simpleInput1.length > 5?'highlight':''">{{simpleInput1.slice(5,6)}}</span>
      </label>
      <div class="tips">要隐藏的输入框：</div>
      <input id="simpleInput1" v-model.trim="simpleInput1" type="number" placeholder="请输入六位数字验证码">
    </div>
    <br>
    <br>
    <h3>栗子3：由六个input组成</h3>
    <div class="input-box">
      <div class="input-content">
        <input v-model.trim.number="input0" ref="input0" @keydown.8="deleteValue('input0','input0')" @keyup="changeValue($event,'input0','input1')" type="number" placeholder="空">
        <input v-model.trim.number="input1" ref="input1" @keydown.8="deleteValue('input1','input0')" @keyup="changeValue($event,'input1','input2')" type="number" placeholder="空">
        <input v-model.trim.number="input2" ref="input2" @keydown.8="deleteValue('input2','input1')" @keyup="changeValue($event,'input2','input3')" type="number" placeholder="空">
        <input v-model.trim.number="input3" ref="input3" @keydown.8="deleteValue('input3','input2')" @keyup="changeValue($event,'input3','input4')" type="number" placeholder="空">
        <input v-model.trim.number="input4" ref="input4" @keydown.8="deleteValue('input4','input3')" @keyup="changeValue($event,'input4','input5')" type="number" placeholder="空">
        <input v-model.trim.number="input5" ref="input5" @keydown.8="deleteValue('input5','input4')" @keyup="changeValue($event,'input5','input5')" type="number" placeholder="空">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'inputCaptcha',
  data () {
    return {
      simpleInput0: '',
      simpleInput1: '',
      input0: '',
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      input5: ''
    }
  },
  methods: {
    deleteValue (inputValue, previousItem) { // 键盘按下时$event，当前input，上一个input
      console.log(this[inputValue], this[previousItem])
      if (this[inputValue].length > 0) { // 当前有值，清空之
        this[inputValue] = ''
      } else { // 当前没有值，光标跳转到上一个input，并清空该input值
        this.$nextTick(() => {
          this.$refs[previousItem].focus()
          this[previousItem] = ''
          this[inputValue] = ''
        })
      }
    },
    changeValue (e, inputValue, nextItem) { // 键盘抬起时$event，当前input，下一个input
      console.log(e.keyCode, this[inputValue], this[nextItem])
      if (e.keyCode !== 8) {
        this.$nextTick(() => {
          this.$refs[nextItem].focus() // 截取当前值最后一位，跳到下一个input
          this[inputValue] = (this[inputValue]).toString().slice(-1)
        })
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.input-captcha-20190115 {
  min-height: 200px;
  .input-box {
    min-height: 100px;
    box-shadow: 0 0 5px 1px black;
    border-radius: 8px;
    width: 100%;
    max-width: 500px;
    display: inline-block;
    padding: 20px;
    box-sizing: border-box;
    input {
      vertical-align: middle;
    }
    & + .input-box {
      margin-top: 20px;
    }
    // 六个span时的样式
    .simple-input-content {
      label {
        padding: 20px;
      }
      span {
        vertical-align: middle;
        border: 1px solid silver;
        display: inline-block;
        height: 20px;
        width: 20px;
        &.highlight {
          border-color: purple;
        }
      }
    }
    // 六个input时的样式
    .input-content {
      padding: 20px;
      input {
        width: 20px;
        height: 20px;
        text-align: center;
      }
    }
    /* 去掉input[type=number]浏览器默认的icon显示 */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button { // chrome
        -webkit-appearance: none;
        appearance: none;
        margin: 0;
    }
    input{ // 火狐
        -moz-appearance:textfield;
    }
  }
}
</style>
View Style Code