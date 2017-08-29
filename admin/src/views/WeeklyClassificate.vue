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
		<el-table :data="weeklyClass" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column prop="category_id" label="周刊分类编号" width="160" sortable>
			</el-table-column>
			<el-table-column prop="name" label="周刊分类名称">
			</el-table-column>
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="180px" :rules="editFormRules" ref="editForm">
				<el-form-item label="周刊分类编号" prop="category_id">
					<el-input v-model="editForm.category_id" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="周刊分类名称" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>
		<!--新增界面-->
		<el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="180px" :rules="addFormRules" ref="addForm">
				<el-form-item label="周刊分类编号" prop="category_id">
					<el-input v-model="addForm.category_id" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="周刊分类名称" prop="name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
  import http from '../utils/http'
  import {frontUrl} from '../../config/frontUrl'
export default {
	data() {
		return {
			filters: {
					name: ''
			},
			users: [],
			weeklyClass: [],
			total: 0,
			page: 1,
			listLoading: false,
			sels: [],//列表选中列
			editFormVisible: false,//编辑界面是否显示
			editLoading: false,
			editFormRules: {
				name: [
					{ required: true, message: '请输入周刊分类名称', trigger: 'blur' }
				]
			},
			//编辑界面数据
			editForm: {
				name: '',
				category_id: 0
			},
			addFormVisible: false,//新增界面是否显示
			addLoading: false,
			addFormRules: {
				category_id: [
					{ required: true, message: '请输入周刊分类编号', trigger: 'blur' }
				],
				name: [
					{ required: true, message: '请输入周刊分类名称', trigger: 'blur' }
				]
			},
			//新增界面数据
			addForm: {
				name: '',
				category_id: ''
			}

		}
	},
	methods: {
		//显示新增界面
		handleAdd: function () {
			this.addFormVisible = true;
			this.addForm = {
				category_id: '',
				name: ''
			};
		},
		//新增分类
		addSubmit: function () {
			this.$refs.addForm.validate((valid) => {
				if (valid) {
						this.addLoading = true;
						let para = Object.assign({}, this.addForm);
						this.add(para)
				}
			});
		},
		add: async function(para){
            const res = await http.post(frontUrl+'/api/weeklyClassificate/add',para)
            if(res.data.status=="1"){ 
				this.addLoading = false;
				this.listLoading = false;
				this.$message({
					message: '提交成功',
					type: 'success'
				});
				this.$refs['addForm'].resetFields();
				this.addFormVisible = false;
				this.weeklyClassificate();
            }else {
                  this.$message({
                      message: res.data.message,
                      type: 'error'
                  });
             }
        },
		//查看分类
		weeklyClassificate: async function() {
			const res = await http.get(frontUrl+'/api/weeklyClassificate/list',)
			if(res.data.status=="1"){ 
				this.weeklyClass = res.data.result;
				this.listLoading = false;
            }else {
                  this.$message({
                      message: res.data.message,
                      type: 'error'
                  });
             }
		},
		//删除分类
		handleDel: function (index, row) {
			let that = this;
			this.$confirm('确认删除该记录吗?', '提示', {
				type: 'warning'
			}).then(() => {
				that.listLoading = true;
				let para = { _id: row._id };
                this.del(para)	
			}).catch(() => {

			});
		},
		del:async function(para){
			const res =  await http.get(frontUrl+'/api/weeklyClassificate/del',para)
			if(res.data.status=="1"){ 
				this.listLoading = false;
				this.$message({
					message: '删除成功',
					type: 'success'
				});
				this.weeklyClassificate();
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
			this.editForm = Object.assign({}, row);
		},
		//编辑
		editSubmit: function () {
			let that = this;
			this.$refs.editForm.validate((valid) => {
				if (valid) {
						this.editLoading = true;
						let para = Object.assign({}, this.editForm);
						this.edit(para);
				}
			});
		},
		edit: async function(para){
			const res =  await http.post(frontUrl+'/api/weeklyClassificate/update',para)
			if(res.data.status=="1"){ 
				this.editLoading = false;
				this.$message({
					message: '更新成功',
					type: 'success'
				});
				this.$refs['editForm'].resetFields();
				this.editFormVisible = false;
				this.weeklyClassificate();
			}else {
				this.$message({
					message: res.data.message,
					type: 'error'
				});
			}    
		},
		selsChange: function (sels) {
			this.sels = sels;
		}
	},
	mounted() {
		this.weeklyClassificate();

	}
}

</script>
<style scoped>

</style>