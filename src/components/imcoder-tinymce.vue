<template>
	<div class="tinymce-box">
		<myEditor v-model="myValue" :init="init" > </myEditor>
	</div>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import myEditor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver'
import 'tinymce/plugins/image'// 上传图片
import 'tinymce/plugins/table'// 表格
import 'tinymce/plugins/lists'// 列表
import 'tinymce/plugins/wordcount'// 字数统计
import 'tinymce/icons/default/icons.min.js'//图标
export default {
	components:{
		myEditor
	},
	props: {
		value: {
			type: String,
			default: ''
		},
		plugins: {
			type: [String, Array],
			default: 'image table'
		},
		toolbar: {
			type: [String, Array],
			default: 'undo redo |  formatselect | bold italic forecolor backcolor | lineheight alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image  table | removeformat'
		},
		height:{
			type:Number,
			default:300,
		}
	},
	data(){
		return{
			init: {
				language_url: 'static/tinymce/langs/zh_CN.js',
				language: 'zh_CN',
				skin_url: '/tinymce/skins/ui/oxide',
				height: this.height,
				plugins: this.plugins,
				toolbar: this.toolbar,
				branding: false,
				menubar: false,
				fontsize_formats: '10px 12px 14px 16px 18px 24px 36px 48px',
				images_upload_handler: (blobInfo, success, failure) => {
					const img = 'data:image/jpeg;base64,' + blobInfo.base64()
					success(img)
				}
			},
			myValue: this.value
		}
	},
	mounted () {
	  tinymce.init({})
	},
	methods: {

	},
	watch: {
		value (newValue) {
			this.myValue = newValue
		},
		myValue (newValue) {
			this.$emit('input', newValue)
		}
	}
}
	
</script>
<style>
	.tox-tinymce-aux{
		z-index: 5000 !important;
	}
</style>
