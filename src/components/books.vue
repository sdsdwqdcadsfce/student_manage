<template>
    <div>
        <!--        面包屑导航-->
        <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <!--            <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>-->
            <el-breadcrumb-item>教材订购管理</el-breadcrumb-item>
            <el-breadcrumb-item>教材订购列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!--        卡片视图区-->
        <el-card>
            <!--            栅格布局-->
            <el-row :gutter="10" type="flex" justify="space-between">
                <!--                搜索区布局-->
                <el-col :span="8">
                    <el-input clearable @clear="getUserList" placeholder="请输入教材名称查询支持模糊查询" class="input-with-select"
                              v-model="queryInfo.bookName">

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
                <el-table-column prop="bookId" label="书籍编码" >
                </el-table-column>
                <el-table-column prop="subjectName" label="课程名称" >
                </el-table-column>
                <el-table-column prop="bookName" label="教材名称" >
            </el-table-column>
                <el-table-column prop="bookAuthor" label="作者" width="80">
                </el-table-column>
                <el-table-column prop="chubanshe" label="出版社" >
                </el-table-column>
                <el-table-column prop="jiage" label="参考价格" width="80">
            </el-table-column>
                <el-table-column prop="shuliang" label="已定数量" width="80">
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
                title="新增科目成绩"
                :visible.sync="insertVisible"
                :close-on-click-modal="false"
                width="50%">
            <el-form :model="RegistForm"  ref="registFormRef" label-width="100px">
                <el-form-item label="书籍编码" prop="bookId">
                    <el-input v-model="RegistForm.bookId"></el-input>
                </el-form-item>
                <el-form-item label="课程名称" prop="subjectName">
                    <el-input v-model="RegistForm.subjectName" ></el-input>
                </el-form-item>
                <el-form-item label="教材名称" prop="bookName">
                    <el-input v-model="RegistForm.bookName"></el-input>
                </el-form-item>
                <el-form-item label="作者" prop="bookAuthor">
                    <el-input v-model="RegistForm.bookAuthor"></el-input>
                </el-form-item>
                <el-form-item label="出版社" prop="chubanshe">
                    <el-input v-model="RegistForm.chubanshe"></el-input>
                </el-form-item>
                <el-form-item label="参考价格" prop="jiage">
                    <el-input v-model="RegistForm.jiage"></el-input>
                </el-form-item>
                <el-form-item label="已定数量" prop="shuliang">
                    <el-input v-model="RegistForm.shuliang"></el-input>
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
                <el-form-item label="书籍编码" prop="bookId">
                    <el-input v-model="updateForm.bookId"></el-input>
                </el-form-item>
                <el-form-item label="课程名称" prop="subjectName">
                    <el-input v-model="updateForm.subjectName" ></el-input>
                </el-form-item>
                <el-form-item label="教材名称" prop="bookName">
                    <el-input v-model="updateForm.bookName"></el-input>
                </el-form-item>
                <el-form-item label="作者" prop="bookAuthor">
                    <el-input v-model="updateForm.bookAuthor"></el-input>
                </el-form-item>
                <el-form-item label="出版社" prop="chubanshe">
                    <el-input v-model="updateForm.chubanshe"></el-input>
                </el-form-item>
                <el-form-item label="参考价格" prop="jiage">
                    <el-input v-model="updateForm.jiage"></el-input>
                </el-form-item>
                <el-form-item label="已定数量" prop="shuliang">
                    <el-input v-model="updateForm.shuliang"></el-input>
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
                    bookName: ''
                },
                userList: [],
                total: 0,
                // 新增数据
                RegistForm: {
                    bookId: '',
                    subjectName: '',
                    studentCode: '',
                    studentName: '',
                    bookName: '',
                    bookAuthor: '',
                    chubanshe: '',
                    jiage: '',
                    shuliang: ''
                },
                //修改的数据
                updateForm: {
                    bookId: '',
                    subjectName: '',
                    studentCode: '',
                    studentName: '',
                    bookName: '',
                    bookAuthor: '',
                    chubanshe: '',
                    jiage: '',
                    shuliang: '',
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
                var data = await this.$http.get('/books/delete?id=' + id)
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
                var data = await this.$http.get('/books/queryyId?id=' + id)
                if (data.data.code != 200) return this.$message.error(data.data.msg);
                console.log(data.data.data)
                this.updateForm.bookId = data.data.data.bookId
                this.updateForm.subjectCode = data.data.data.subjectCode
                this.updateForm.subjectName = data.data.data.subjectName
                this.updateForm.bookName = data.data.data.bookName
                this.updateForm.bookAuthor = data.data.data.bookAuthor
                this.updateForm.chubanshe = data.data.data.chubanshe
                this.updateForm.jiage = data.data.data.jiage
                this.updateForm.shuliang = data.data.data.shuliang
                this.updateForm.id = data.data.data.id
                //弹出修改框
                this.updateVisible = true
            },
            //提交修改
            commitUpdateUser() {
                //预校验
                this.$refs.updateFormRef.validate(async valid => {
                    if (!valid) return;
                    var data = await this.$http.post('/books/update', this.updateForm);
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
                    var data = await this.$http.post('/books/insert', this.RegistForm);
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
                var data = await this.$http.get('/books/getList', {params: this.queryInfo})
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
