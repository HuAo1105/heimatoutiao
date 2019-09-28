<template>
  <div class="login">
      <el-card class="login-card">
          <div style='text-align:center'>
              <img src="../../assets/images/logo_index.png" alt="">
          </div>
          <el-form ref='mylogin' :model='formdata' style="margin-top:10px" :rules='loginRules'>
              <!-- prop为需要校验的字段 -->
              <el-form-item prop='mobile'>
                  <el-input v-model="formdata.mobile" placeholder="请输入手机号"></el-input>
              </el-form-item>
              <el-form-item prop='code'>
                  <el-input v-model="formdata.code" style="width:60%" placeholder="请输入验证码"></el-input>
                  <el-button style="float:right">发送验证码</el-button>
              </el-form-item>
              <el-form-item prop='agree'>
                  <el-checkbox v-model='formdata.agree'>我已阅读并同意用户协议和隐私条款</el-checkbox>
              </el-form-item>
              <el-form-item>
                  <el-button @click='login(formdata)' type="primary" style="width:100%">登陆</el-button>
              </el-form-item>
          </el-form>
      </el-card>
  </div>
</template>

<script>
import { login } from '../../api/articles'
export default {
  data () {
    let validator = function (rule, value, callBack) {
      // rule为当前的规则，value为当前表单项的值，callback为回调函数
    //   if (value) {
    //     //   如果为true，执行回调函数，请继续
    //     callBack()
    //   } else {
    //     // 否则的话，也执行该回调函数
    //     callBack(new Error('您必须同意该条款'))
    //   }

      // 三元表达式
      value ? callBack() : new Error('您必须同意该条款')
    }
    return {
      formdata: {
        mobile: '',
        code: '',
        agree: false // 是否同意协议
      },
      // 校验规则
      loginRules: {
        // 为true的话，表示此项必填
        mobile: [{ required: true, message: '请输入您的手机号' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号' }
        ],
        code: [{ required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码' }],
        agree: [{ validator }]
      }
    }
  },
  methods: {
    async login (formdata) {
      await this.$refs.mylogin.validate(async (isOk) => {
        if (isOk) {
          let result = await login(formdata)
          // console.log(result)
          // 将token令牌保存在localstorage里
          window.localStorage.setItem('user-token', result.data.token)
          this.$router.push('/')
          // .catch(() => {
          //   this.$message({
          //     type: 'warning',
          //     message: '您输入的有误'
          //   })
          // })
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
/* 在style标签里加入lang='less'，就可以使用less */
// 如果其它组件也使用了相同的选择器，在其他组件也会显示
// 解决办法：使用scoped
.login{
    background-image: url('../../assets/images/login_bg.jpg');
    /* 将这个图片在屏幕中显示100份 */
    height: 100vh;
    /* 自适应屏幕 */
    background-size: cover;
    // 使用flex布局来调整在屏幕上的位置
    display: flex;
    align-items: center;
    justify-content: center;
    .login-card{
        height: 330px;
        width: 440px;
        img{
            height: 40px;
        }
    }
}
</style>
