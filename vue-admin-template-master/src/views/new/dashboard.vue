<template>

  <div class="app-container">
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>
                <font color='#409EFF'>查询条件</font>
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="handle-box">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item>&ensp;</el-form-item>
        <el-form ref="form" :model="form">
          <el-form-item label="节点类型">
            <el-select v-model="form.type" placeholder="please enter">
              <el-option label="病人" value="PATIENT_ID" />
              <el-option label="医生" value="PHYSICIAN_ID" />
            </el-select>
          </el-form-item>
          <el-form-item label="节点ID">
            <el-input placeholder="please enter" v-model="form.id" />
          </el-form-item>
          <el-form-item label="节点名称">
            <el-input placeholder="please enter" v-model="form.name" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">搜索</el-button>
          </el-form-item>
          <el-form-item>
            <el-button  @click="clearData">清空条件</el-button>
          </el-form-item>
        </el-form>
        </el-form>
     </div>
    <div class="crumbs" v-if="this.nodeData!==null">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>
                <font color='#409EFF'>匹配结果</font>
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <br/>
    <el-table :data="nodeData" v-if="this.form.type==='PATIENT_ID' && this.nodeData!==null" border class="table" ref="multipleTable" header-cell-class-name="table-header">
      <el-table-column align="center" label="节点id">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="节点名称">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="性别">
        <template slot-scope="scope">
          {{ scope.row.gender }}
        </template>
      </el-table-column>
       <el-table-column align="center" label="出生日期">
        <template slot-scope="scope">
          {{ scope.row.dob }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="参保类型">
        <template slot-scope="scope">
          {{ scope.row.benefit_group_id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="人员类别">
        <template slot-scope="scope">
          {{ scope.row.benefit_group_id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="缴费地区">
        <template slot-scope="scope">
          {{ scope.row.area_id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="工作单位">
        <template slot-scope="scope">
          {{ scope.row.company }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="社保卡号">
        <template slot-scope="scope">
          {{ scope.row.id_number }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="社保识别码">
        <template slot-scope="scope">
          {{ scope.row.id_type }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="地址">
        <template slot-scope="scope">
          {{ scope.row.address }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="toInfo(scope.row)" >确认</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-table :data="nodeData" v-if="this.form.type=='PHYSICIAN_ID'&&this.nodeData!==null" border class="table" ref="multipleTable" header-cell-class-name="table-header">
      <el-table-column align="center" label="节点id">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="节点名称">
        <template slot-scope="scope">
          {{ scope.row.doctor_name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="医院id">
        <template slot-scope="scope">
          {{ scope.row.hospital_id }}
        </template>
      </el-table-column>
       <el-table-column align="center" label="级别">
        <template slot-scope="scope">
          {{ scope.row.doctor_level }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="职称">
        <template slot-scope="scope">
          {{ scope.row.doctor_title }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="toInfo(scope.row)" >确认</el-button>
        </template>
      </el-table-column>
    </el-table>
    
  </div>
</template>

<script>

import {getPatientList} from '@/api/backend'
import {getPhysicianList} from '@/api/backend'
export default {
  name: 'Demo',
  
  data() {
    return {
      form: {
        type: '',
        id: '',
        name:'',
      },
      nodeData:null
    }
  },
watch:{
    '$route': 'getParams',
    
},
  methods: { 
    onSubmit() {
        
        if(this.form.type==='PATIENT_ID'){
           getPatientList(this.form).then((response)=>{
                console.info('response.data',response.data)
                this.nodeData = response.data.data.nodeData
                console.log('nodedata',this.nodeData)
            },(response)=>{
                this.nodeData =null
                console.error(response)
            });
        }else if(this.form.type==='PHYSICIAN_ID'){
           getPhysicianList(this.form).then((response)=>{
                console.info('response.data',response.data)
                this.nodeData = response.data.data.nodeData
                console.log('nodedata',this.nodeData)
            },(response)=>{
                this.nodeData =null
                console.error(response)
            });
        }else{
          this.$message('请输入节点类型')
        }
        console.log('onsubmit')
        
      
    },
    clearData(){
        this.nodeData = null
        this.form.id = ''
        this.form.type = ''
        this.form.name = ''
    },
    toInfo(nodeData){
      console.log('toInfo', nodeData)
        this.$router.push({
          path: '/info/index',
          query: {
            id: nodeData.id,
            type: this.form.type,
            name: nodeData.name
          }
        })
    },
  }
}
</script>

