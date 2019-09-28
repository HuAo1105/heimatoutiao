<template>
  <el-card>
    <bread-crumb slot='header'>
      <template slot="title">账户信息</template>
    </bread-crumb>
    <el-form label-width='100px' :model='formData' :rules='checkRule' ref='form'>
      <el-form-item label='用户名' prop='name'>
        <el-input v-model="formData.name" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label='简介' prop='intro'>
        <el-input v-model="formData.intro" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label='邮箱' prop='email'>
        <el-input v-model="formData.email" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label='手机号'>
        <el-input disabled v-model="formData.mobile" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item>
        <div @click='modify(formData)'>
          <el-button type='primary'>保存信息</el-button>
        </div>
      </el-form-item>
      <div class="user-photo">
        <img :src="formData.photo?formData.photo:defaultImg" alt="" class="user-img">
        <div class="change-photo" @click="dialogVisible=true">更换头像</div>
      </div>
      <el-dialog :visible.sync="dialogVisible">
        <el-upload
          class="avatar-uploader"
          action=''
          :show-file-list="false"
          :http-request='uploadPhoto'>
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-dialog>
    </el-form>
  </el-card>
</template>

<script>
import eventBus from '../../utils/event-bus'
import { getUser, modify, changePhoto } from '../../api/articles'

export default {
  data () {
    return {
      dialogVisible: false,
      formData: {
        name: '',
        intro: '',
        email: ''
      },
      defaultImg: require('../../assets/images/avatar.jpg'),
      checkRule: { name: [{ required: true, message: '名字不能为空' },
        { min: 1, max: 7, message: '名字在1到7个字符' }],
      email: [{ required: true, message: '邮箱不能为空' },
        { pattern: /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/, message: '您输入的邮箱有误' }],
      intro: [{ requires: true, message: '简介不能为空' }] }
    }
  },
  methods: {
    // 获取用户信息
    async getUser () {
      let result = await getUser()
      this.formData = result.data
    },
    // 修改用户信息
    async modify (formData) {
      await this.$refs.form.validate(async (isOk) => {
        if (isOk) {
          await modify(formData)
          // 在保存的时候抛出一个事件
          eventBus.$emit('updateUserInfo')
          this.$message({ message: '修改成功', type: 'success' })
        }
      })
    },
    // 上传头像
    async uploadPhoto (params) {
      let data = new FormData()
      data.append('photo', params.file)
      await changePhoto(data)
      eventBus.$emit('updateUserInfo')
      this.$message({ message: '修改成功', type: 'success' })
      this.getUser()
      this.dialogVisible = false
    }
  },
  created () {
    this.getUser()
  }
}
</script>

<style lang='less' scoped>
.user-photo{
  margin: 0 auto;
  width: 150px;
  height: 150px;
  position: relative;
  top:-250px;
  .user-img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .change-photo{
    text-align: center;
    margin-top: 20px;
    cursor: pointer;
  }
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
