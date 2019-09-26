<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">发布文章</template>
    </bread-crumb>
    <el-form label-width='80px' :model='formData' :rules='checkRules' ref='form'>
      <el-form-item label='标题' prop='title'>
        <el-input style="width:400px" placeholder="请输入文章标题" v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label='内容' style="height:550px" prop='content'>
        <quill-editor v-model="formData.content" style="height:500px"></quill-editor>
      </el-form-item>
      <el-form-item label='封面' class="cover" prop='type'>
        <!-- {{formData.cover.images}} -->
        <el-radio-group v-model="formData.cover.type" @change='changeType'>
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop='images'>
      </el-form-item>
      <!-- 封面组件 -->
      <cover-image :images='formData.cover.images' @selectImg="receiveImg"></cover-image>
      <el-form-item label='频道' prop='channel_id'>
        <el-select v-model="formData.channel_id" placeholder="请选择">
          <el-option v-for='(item,index) in channels' :key='index' :value='item.id' :label='item.name'>{{item.name}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
          <el-button type='primary' @click='publishArticle(false)'>发表</el-button>
          <el-button @click='publishArticle(true)'>存为草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [],
      formData: {
        title: '',
        content: '',
        channel_id: null,
        cover: {
          type: 0,
          images: []
          // ["http://toutiao.meiduo.site/FhxDnOOt84_nC9sO4zeLq4tkCwO8"]
        }
      },
      checkRules: {
        title: [{ required: true, message: '您输入的内容不能为空' },
          { min: 5, max: 30, message: '标题在5至30个字符' }],
        content: [{ required: true, message: '您输入的内容不能为空' }],
        channel_id: [{ required: true, message: '频道不能为空' }]
      }
    }
  },
  methods: {
    // 获取频道列表
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    },
    // 获取指定文章内容
    getArticle () {
      let { target } = this.$route.params
      // console.log(this.$route.params)
      this.$axios({
        url: `/articles/${target}`
      }).then(result => {
        this.formData = result.data
      })
    },
    // 手动校验并发布
    publishArticle (draft) {
      this.$refs.form.validate((isOk) => {
        if (isOk) {
          let { target } = this.$route.params
          // console.log(target)
          this.$axios({
            url: target ? `/articles/${target}` : '/articles',
            method: target ? 'put' : 'post',
            params: { draft },
            data: this.formData
          }).then(() => {
            this.$router.push('/home/articles')
          })
        }
      })
    },
    // 接收子组件传过来的值
    receiveImg (url, index) {
      // alert(url)
      // 循环遍历要赋值的数组，如果和传过来的下标一样的话，就返回传过来的url，如果不相等的话，就返回item，就是一个空
      // 然后再赋给当前的数组
      // this.formData.cover.images = this.formData.cover.images.map((item, i) => {
      //   if (index === i) {
      //     return url
      //   }
      //   return item
      // })
      // vm.$set(vm.items, index, newVal)
      // this.formData.cover.images = this.formData.cover.images.map((item, i) => index === i ? url : item)
      this.$set(this.formData.cover.images, index, url)
    },
    // 改变封面的状态
    changeType () {
      if (this.formData.cover.type === 1) {
        this.formData.cover.images = ['']
      } else if (this.formData.cover.type === 3) {
        this.formData.cover.images = ['', '', '']
      } else {
        this.formData.cover.images = []
      }
    }
  },
  created () {
    this.getChannels()
    let { target } = this.$route.params
    target && this.getArticle() // 判断是否有id，新发布的是没有id的，修改才有
  }
}
</script>

<style lang='less' scoped>
</style>
