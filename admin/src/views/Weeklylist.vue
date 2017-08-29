<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		  <el-table :data="weeklylists" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column prop="period" label="周刊周期" min-width="60" sortable>
			</el-table-column>
			<el-table-column   label="周刊封面"min-width="180" >
				<template scope="scope">
					<img :src="scope.row.cover_url" width="100" height="100"/>
				</template>
			</el-table-column>
			<el-table-column prop="title" label="周刊描述">
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column> 
		</el-table>  
		<!--编辑界面-->
		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="周刊封面" prop="cover_url">
					<el-upload
					class="upload-demo"
					:action="uploadUrl"
					:on-preview="handlePreview"
					:on-remove="handleRemove"
					:on-success="handleEditeSuccess"
					:file-list="fileList"
					list-type="picture"
					>
					<el-button size="small" type="primary">点击上传</el-button>
					</el-upload>
				</el-form-item>
				<el-form-item label="周期" prop="period">
					<el-input v-model="editForm.period" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="周刊描述" prop="title">
					<el-input v-model="editForm.title" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="列表">
					<el-button type="primary" class="el-icon-plus" @click="add_edit">添加分类</el-button>
				</el-form-item>
				 <div  v-for="(item,index) in editForm.info">
					<el-form-item label="分类" prop="title">
						 <el-col :span="12">
						     <el-select v-model="item.type_name" placeholder="请选择">
								<el-option
								v-for="item in weeklyClass"
								:key="item.name"
								:label="item.name"
								:value="item.name">
								</el-option>
							</el-select> 
						 </el-col>
						<el-col :span="12">
							<el-button type="primary" class="el-icon-minus" @click="delEditKind(index)">删除分类</el-button>
						    <el-button type="primary" class="el-icon-plus" @click='addArticle_edit(index)'>添加文章</el-button>
						</el-col>
					</el-form-item>
					<div v-for="(data,index1) in item.list">
						<div  @mouseenter="enter(index1)" @mouseleave="leave(index1)"  :class="{ 'colorChage':ind === index1}">
							<el-card class="box-card" style="margin-bottom:5px;">
								<el-form-item label="文章标题" prop="title">
									<el-input v-model="data.title" auto-complete="off"></el-input>
								</el-form-item>
								<el-form-item label="文章链接" prop="url">
									<el-input v-model="data.url" auto-complete="off"></el-input>
								</el-form-item>
								<el-form-item label="文章描述" prop="describe">
									<el-input v-model="data.describe" auto-complete="off"></el-input>
								</el-form-item>
								<el-button type="primary"   @click='delEditArticle(index,index1)'  :class="{'ChageHide':false}" >删除文章</el-button>
							</el-card>
					    </div>
					</div>
				</div> 
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                <el-form-item label="周刊封面" prop="cover_url">
					<el-upload
					class="upload-demo"
					:action="uploadUrl"
					:on-preview="handlePreview"
					:on-remove="handleRemove"
					:on-success="handleSuccess"
					:file-list="fileList"
					list-type="picture">
					<el-button size="small" type="primary">点击上传</el-button>
					</el-upload>
				</el-form-item>
				<el-form-item label="周期" prop="period">
					<el-input v-model="addForm.period" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="周刊描述" prop="title">
					<el-input v-model="addForm.title" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="列表">
					<el-button type="primary" class="el-icon-plus" @click="add">添加分类</el-button>
				</el-form-item>
			    <div  v-for="(item,index) in addForm.info">
					<el-form-item label="分类" prop="title">
						 <el-col :span="12">
						     <el-select v-model="item.type_name" placeholder="请选择">
								<el-option
								v-for="item in weeklyClass"
								:key="item.name"
								:label="item.name"
								:value="item.name">
								</el-option>
							</el-select>
						 </el-col>

						<el-col :span="12">
							<el-button type="primary" class="el-icon-minus" @click="delKind(index)">删除分类</el-button>
						    <el-button type="primary" class="el-icon-plus" @click='addArticle(index)'>添加文章</el-button>
						</el-col>
					</el-form-item>
						<div v-for="(data,index1) in item.list">
							<div  @mouseenter="enter(index1)" @mouseleave="leave(index1)"  :class="{ 'colorChage':ind === index1}">
							<el-card class="box-card" style="margin-bottom:5px;">
								<el-form-item label="文章标题" prop="title">
									<el-input v-model="data.title" auto-complete="off"></el-input>
								</el-form-item>
								<el-form-item label="文章链接" prop="url">
									<el-input v-model="data.url" auto-complete="off"></el-input>
								</el-form-item>
								<el-form-item label="文章描述" prop="describe">
									<el-input v-model="data.describe" auto-complete="off"></el-input>
								</el-form-item>
								<el-button type="primary"   @click='delArticle(index,index1)'  :class="{'ChageHide':false}" >删除文章</el-button>
							</el-card>
							</div>
						</div>
				</div>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	import {frontUrl} from '../../config/frontUrl'
	import http from '../utils/http'
	import axios from 'axios'
	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				styleObject:{
                  display:"show"
				},
				ind:'',
				ChageHide:true,
				uploadUrl:`${frontUrl}/api/weeklylist/upload`,		
				users: [],
				total: 0,
				fileList: [],
				page: 1,
				listLoading: false,
				sels: [],//列表选中列
				weeklylists:[],
				weeklyClass:[],
				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//编辑界面数据
				editForm: {
					cover_url: '', // 周刊封面
                    period: '', // 周期
                    title: '',
                    info:[]
				},

				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//新增界面数据
				addForm: {
                  cover_url: '', // 周刊封面
                  period: '', // 周期
                  title: '',
                  info:[]
				}
			}
		},
		methods: {
			//图片上传相关
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			handleSuccess(response, file, fileList){
				console.log(response.result.url)
				this.addForm.cover_url=response.result.url
			},
			handleEditeSuccess(response, file, fileList){
				console.log(response.result.url)
				this.editForm.cover_url=response.result.url
			},
			enter(index1){
			   this.ind = index1
			   this.ChageHide=false
			},
			leave(index1){
			   this.ind=false;
			   this.ChageHide=true
			},
			//列表
			handleList:async function(){
				let that = this;
				const res = await http.get(frontUrl+'/api/weeklylist/list',)
				if(res.data.status=="1"){ 
					this.weeklylists = res.data.result;
                    this.listLoading = false;
				}else {
					this.$message({
						message: res.data.message,
						type: 'error'
					});
				}
			},
			//显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {
					cover_url: '', // 周刊封面
					period:'', // 周期
					title: '',
					info: [
						
					]
				};
			},
			//删除
			handleDel: function (index, row) {
				let that = this;
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					let para = { _id: row._id};
					this.del(para)
				}).catch(() => {

				});
			},
			del:async function(para){
				const res =  await http.get(frontUrl+'/api/weeklylist/del',para)
				if(res.data.status=="1"){ 
					this.listLoading = false;
					this.$message({
						message: '删除成功',
						type: 'success'
					});
					this.handleList();
				}else {
					this.$message({
						message: res.data.message,
						type: 'error'
					});
				}     
			},
			//显示编辑界面
			handleEdit: function (index, row) {
				this.editFormVisible = true;
				this.fileList=[{ url:row.cover_url}]
				this.editForm = Object.assign({}, row);
				this.editForm.info=JSON.parse(row.info);
			},
			//编辑
			editSubmit: function () {
				let that = this;
				this.$refs.editForm.validate((valid) => {
					if (valid) {
							this.editLoading = true;
							let para = Object.assign({}, this.editForm);
							this.edit(para);
							this.handleList();
			                this.weeklyClassificate();
					}
				});
			},
			edit: async function(para){
				const res =  await http.post(frontUrl+'/api/weeklylist/update',para)
				if(res.data.status=="1"){ 
					this.editLoading = false;
					this.$message({
						message: '更新成功',
						type: 'success'
					});
					this.$refs['editForm'].resetFields();
					this.editFormVisible = false;
					this.handleList();
				}else {
					this.$message({
						message: res.data.message,
						type: 'error'
					});
				}    
			},
			//新增
			addSubmit: function () {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
							this.addLoading = true;
							let that = this;
							let para = Object.assign({}, this.addForm);
							this.addinfo(para)
					}
				});
			},
			addinfo: async function(para){
				const res = await http.post(frontUrl+'/api/weeklylist/add',para)
				if(res.data.status=="1"){ 
					this.addLoading = false;
					this.listLoading = false;
					this.$message({
						message: '提交成功',
						type: 'success'
					});
					this.$refs['addForm'].resetFields();
					this.addFormVisible = false;
					this.handleList();
				}else {
					this.$message({
						message: res.data.message,
						type: 'error'
					});
				}
			},
			//添加大类
			add(){
				this.addForm.info.push({
                    type_name: '',
					type_id:"", 
					list: []
                })
			},

			//添加大类(编辑中)
			add_edit(){
                this.editForm.info.push({
                    type_name: '',
					type_id:"", 
					list: []
                })
			},
			delKind(index){
               this.addForm.info.splice(index,1)
			},
			delEditKind(index){
               this.editForm.info.splice(index,1)
			},
			delArticle(index,index1){
               this.addForm.info[index].list.splice(index1,1)
			},
			delEditArticle(index,index1){
               this.editForm.info[index].list.splice(index1,1)
			},
			//添加文章
			addArticle(index){
                this.addForm.info[index].list.push({
                    describe: '',
					create_time: '',
					thumburl: '', 
					title: '',
					url: ''
                })
			},
			//添加文章(编辑中)
			addArticle_edit(index){
                this.editForm.info[index].list.push({
                    describe: '',
					create_time: '',
					thumburl: '', 
					title: '',
					url: ''
                })
			},
			//查看分类
			weeklyClassificate() {
				let that = this;
				let base = '';
				axios.get(frontUrl+`/api/weeklyClassificate/list`,{withCredentials: true})
					.then(function (res) {
						that.weeklyClass = res.data.result;
						that.listLoading = false;
					})
					.catch(function (error) {
						console.log(JSON.stringify(error));
					});
			},
			selsChange: function (sels) {
				this.sels = sels;
			}
		},
		mounted() {
			this.handleList();
			this.weeklyClassificate();
		}
	}

</script>

<style scoped>
    .colorChage .el-card{
		background-color:#eef1f6;
	}
    .ChageHide{
		display: none;
	}
</style>