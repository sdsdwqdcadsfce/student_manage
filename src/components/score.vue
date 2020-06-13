<template>
    <div>
        <!--        面包屑导航-->
        <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>学生课程成绩管理</el-breadcrumb-item>
            <el-breadcrumb-item>学生课程成绩列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!--        卡片视图区-->
        <el-card>
            <!--            栅格布局-->
            <el-row :gutter="10" type="flex" justify="space-between">
                <!--                搜索区布局-->
                <el-col :span="8">
                    <el-input clearable @clear="getUserList" placeholder="请输入课程名称查询支持模糊查询" class="input-with-select"
                              v-model="queryInfo.subjectName">

                    </el-input>
                </el-col>
                <el-col :span="16">
                    <div class="grid-content bg-purple">
                        <el-button type="primary" @click="getUserList">查询</el-button>
                    </div>
                </el-col>
                <el-col :span="3">
                    <div class="grid-content bg-purple">
                        <el-button type="primary" @click="insertVisible =true">新增信息</el-button>
                    </div>
                </el-col>
            </el-row>
            <!--            表格-->
            <el-table :data="userList" style="width: 100%" border fixed>
                <el-table-column label="#" type="index">
                </el-table-column>
                <el-table-column prop="xuenian" label="学年学期">
                </el-table-column>
                <el-table-column prop="subjectCode" label="课程代码" width="80">
                </el-table-column>
                <el-table-column prop="subjectId" label="课程序号">
                </el-table-column>
                <el-table-column prop="subjectName" label="课程名称">
                </el-table-column>
                <el-table-column prop="subjectType" label="课程类别" width="80">
            </el-table-column>
                <el-table-column prop="xuefen" label="学分" width="80">
                </el-table-column>
                <el-table-column prop="bukaochengji" label="补考成绩" width="80">
                </el-table-column>
                <el-table-column prop="zongpingchengji" label="总评成绩" width="80">
            </el-table-column>
                <el-table-column prop="chongxiu" label="重修1" width="80">
                </el-table-column>
                <el-table-column prop="zuizhong" label="最终" width="80">
                </el-table-column>
                <el-table-column prop="jidian" label="绩点" width="80">
                </el-table-column>
                <el-table-column label="操作" width="120">
                    <template slot-scope="scope">
                        <el-tooltip content="编辑" placement="top" :enterable="true">
                            <el-button type="primary" icon="el-icon-edit" size="mini"
                                       @click="updateUser(scope.row.id+'')"></el-button>
                        </el-tooltip>
                        <el-tooltip content="删除" placement="top" :enterable="false">
                            <el-button type="danger" icon="el-icon-delete" size="mini"
                                       @click="removeUserById(scope.row.id)"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <!--            分页组件-->
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="queryInfo.page"
                    :page-sizes="[10,15,20,25 ]"
                    :page-size="queryInfo.limit"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </el-card>

        <!--        新增弹出框-->
        <el-dialog
                title="新增信息"
                :visible.sync="insertVisible"
                :close-on-click-modal="false"
                width="50%">
            <el-form :model="RegistForm"  ref="registFormRef" label-width="100px">
                <el-form-item label="学年学期" prop="xuenian">
                    <el-input v-model="RegistForm.xuenian"></el-input>
                </el-form-item>
                <el-form-item label="课程代码" prop="subjectCode">
                    <el-input v-model="RegistForm.subjectCode" ></el-input>
                </el-form-item>
                <el-form-item label="课程序号" prop="subjectId">
                    <el-input v-model="RegistForm.subjectId"></el-input>
                </el-form-item>
                <el-form-item label="课程名称" prop="subjectName">
                    <el-input v-model="RegistForm.subjectName"></el-input>
                </el-form-item>
                <el-form-item label="课程类别" prop="subjectType">
                    <el-input v-model="RegistForm.subjectType"></el-input>
                </el-form-item>
                <el-form-item label="学分" prop="xuefen">
                    <el-input v-model="RegistForm.xuefen"></el-input>
                </el-form-item>
                <el-form-item label="补考成绩" prop="bukaochengji">
                    <el-input v-model="RegistForm.bukaochengji"></el-input>
                </el-form-item>
                <el-form-item label="总评成绩" prop="zongpingchengji">
                    <el-input v-model="RegistForm.zongpingchengji"></el-input>
                </el-form-item>
                <el-form-item label="重修1" prop="chongxiu">
                    <el-input v-model="RegistForm.chongxiu"></el-input>
                </el-form-item>
                <el-form-item label="最终" prop="zuizhong">
                    <el-input v-model="RegistForm.zuizhong"></el-input>
                </el-form-item>
                <el-form-item label="绩点" prop="jidian">
                    <el-input v-model="RegistForm.jidian"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="insertUser">确 定</el-button>
                <el-button @click="insertVisible = false">取 消</el-button>
           </span>
        </el-dialog>

        <!--        修改弹出框-->
        <el-dialog
                title="修改科目成绩"
                :visible.sync="updateVisible"
                :close-on-click-modal="false"
                width="50%" @close="updateClose">
            <el-form :model="updateForm"  ref="updateFormRef" label-width="100px">
                <el-form-item label="学年学期" prop="xuenian">
                    <el-input v-model="updateForm.xuenian"></el-input>
                </el-form-item>
                <el-form-item label="课程代码" prop="subjectCode">
                    <el-input v-model="updateForm.subjectCode" ></el-input>
                </el-form-item>
                <el-form-item label="课程序号" prop="subjectId">
                    <el-input v-model="updateForm.subjectId"></el-input>
                </el-form-item>
                <el-form-item label="课程名称" prop="subjectName">
                    <el-input v-model="updateForm.subjectName"></el-input>
                </el-form-item>
                <el-form-item label="课程类别" prop="subjectType">
                    <el-input v-model="updateForm.subjectType"></el-input>
                </el-form-item>
                <el-form-item label="学分" prop="xuefen">
                    <el-input v-model="updateForm.xuefen"></el-input>
                </el-form-item>
                <el-form-item label="补考成绩" prop="bukaochengji">
                    <el-input v-model="updateForm.bukaochengji"></el-input>
                </el-form-item>
                <el-form-item label="总评成绩" prop="zongpingchengji">
                    <el-input v-model="updateForm.zongpingchengji"></el-input>
                </el-form-item>
                <el-form-item label="重修1" prop="chongxiu">
                    <el-input v-model="updateForm.chongxiu"></el-input>
                </el-form-item>
                <el-form-item label="最终" prop="zuizhong">
                    <el-input v-model="updateForm.zuizhong"></el-input>
                </el-form-item>
                <el-form-item label="绩点" prop="jidian">
                    <el-input v-model="updateForm.jidian"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="commitUpdateUser">确 定</el-button>
                <el-button @click="updateVisible = false">取 消</el-button>
             </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        created() {
            this.getUserList();
        },
        data() {
            return {
                // 修改的状态
                updateVisible: false,
                open: true,
                //新增的状态
                insertVisible: false,
                close: false,
                //查询的参数
                queryInfo: {
                    page: 1,
                    limit: 10,
                    studentName: ''
                },
                userList: [],
                total: 0,
                // 新增数据
                RegistForm: {
                    studentId: '',
                    xuenian: '',
                    subjectCode: '',
                    subjectId: '',
                    subjectName: '',
                    subjectType: '',
                    xuefen: '',
                    bukaochengji: '',
                    zongpingchengji: '',
                    chongxiu: '',
                    zuizhong: '',
                    jidian: ''
                },
                //修改的数据
                updateForm: {
                    studentId: '',
                    xuenian: '',
                    subjectCode: '',
                    subjectId: '',
                    subjectName: '',
                    subjectType: '',
                    xuefen: '',
                    bukaochengji: '',
                    zongpingchengji: '',
                    chongxiu: '',
                    zuizhong: '',
                    jidian: '',
                    id: ''
                },
            }
        },
        methods: {
            // 根据Id删除对应的数据
            async removeUserById(id) {
                // 弹框询问用户是否删除数据
                const confirmResult = await this.$confirm(
                    '此操作将永久删除该记录, 是否继续?',
                    '提示',
                    {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }
                ).catch(err => err)

                // 如果用户确认删除，则返回值为字符串 confirm
                // 如果用户取消了删除，则返回值为字符串 cancel
                // console.log(confirmResult)
                if (confirmResult !== 'confirm') {
                    return this.$message.info('已取消删除')
                }
                //删除数据的的请求
                var data = await this.$http.get('/studentSorce/delete?id=' + id)
                //获取服务端响应
                if (data.data.code !== 200) {
                    return this.$message.error(data.data.msg)
                }
                //提示
                this.$message.success('删除成功！')
                //刷新学生列表
                this.getUserList()
            },
            //通过id查询数据并打开修改页面赋值进去
            async updateUser(id) {
                //请求数据
                var data = await this.$http.get('/studentSorce/queryyId?id=' + id)
                if (data.data.code != 200) return this.$message.error(data.data.msg);
                console.log(data.data.data)
                this.updateForm.studentId = data.data.data.studentId
                this.updateForm.xuenian = data.data.data.xuenian
                this.updateForm.subjectCode = data.data.data.subjectCode
                this.updateForm.subjectId = data.data.data.subjectId
                this.updateForm.subjectName = data.data.data.subjectName
                this.updateForm.subjectType = data.data.data.subjectType
                this.updateForm.xuefen = data.data.data.xuefen
                this.updateForm.bukaochengji = data.data.data.bukaochengji
                this.updateForm.zongpingchengji = data.data.data.zongpingchengji
                this.updateForm.chongxiu = data.data.data.chongxiu
                this.updateForm.zuizhong = data.data.data.zuizhong
                this.updateForm.jidian = data.data.data.jidian
                this.updateForm.id = data.data.data.id
                //弹出修改框
                this.updateVisible = true
            },
            //提交修改
            commitUpdateUser() {
                //预校验
                this.$refs.updateFormRef.validate(async valid => {
                    if (!valid) return;
                    var data = await this.$http.post('/studentSorce/update', this.updateForm);
                    if (data.data.code != 200) return this.$message.error(data.data.msg);
                    this.$message.success('修改成功')
                    this.$refs.updateFormRef.resetFields()
                    this.updateVisible = false
                    this.getUserList()
                })
            },
            //修改页面关闭后清空数据
            updateClose() {
                this.$refs.updateFormRef.resetFields()
            },
            // 新增学生信息
            insertUser() {
                //预校验
                this.$refs.registFormRef.validate(async valid => {
                    if (!valid) return;
                    var data = await this.$http.post('/studentSorce/insert', this.RegistForm);
                    if (data.data.code != 200) return this.$message.error(data.data.msg);
                    this.$message.success('新增成功')
                    this.$refs.registFormRef.resetFields()
                    this.insertVisible = false
                    this.getUserList()
                })
            },
            // 分页组件中的条数的变更
            handleSizeChange(size) {
                this.queryInfo.limit = size
                this.getUserList()
            },
            // 分页组件中当前页码的变化
            handleCurrentChange(page) {
                this.queryInfo.page = page
                this.getUserList()
            },
            async getUserList() {
                var data = await this.$http.get('/studentSorce/getList', {params: this.queryInfo})
                this.userList = data.data.data.rows
                this.total = data.data.data.total
            }
        }

    }
</script>
<!--scoped 代表当前页面生效-->
<style lang="less" scoped>
    .el-table {
        margin-top: 15px;
    }

    .nopadding {
        margin-right: 50px;
    }

</style>
