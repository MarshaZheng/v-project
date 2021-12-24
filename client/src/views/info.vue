<template>
  <div class="app-container">
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>
                <font color='#409EFF'>条件查询</font>
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
              <el-option label="医生" value="PHYCISIAN_ID" />
            </el-select>
          </el-form-item>
          <el-form-item label="节点ID">
            <el-input v-model="form.id" />
          </el-form-item>
          <el-form-item label="节点名称">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">搜索</el-button>
          </el-form-item>
        </el-form>
        </el-form>
     </div>
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>
                <font color='#409EFF'>节点信息</font>
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <el-table :data="nodeData" v-if="this.form.type=='PATIENT_ID'" border class="table" ref="multipleTable" header-cell-class-name="table-header">
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
          {{ scope.row.sex }}
        </template>
      </el-table-column>
       <el-table-column align="center" label="出生日期">
        <template slot-scope="scope">
          {{ scope.row.dob }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="参保类型">
        <template slot-scope="scope">
          {{ scope.row.benefit_type }}
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
          <el-button type="text" @click="confirm(scope.row.id)" >确认</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-table :data="nodeData" v-if="this.form.type=='PHYCISIAN_ID'" border class="table" ref="multipleTable" header-cell-class-name="table-header">
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
          <el-button type="text" @click="confirm(scope.row.id)" >确认</el-button>
        </template>
      </el-table-column>
    </el-table>
    
  </div>
</template>

<script>


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

  methods: { 
    onSubmit() {
        var url=null
        if(this.form.type=='PATIENT_ID'){
          url='/api/patient/login'
        }else{
          url='/api/physician/fetchData'
        }
        console.log('onsubmit')
        this.$http.post(url,this.form).then((response)=>{
            console.info('response.body',response.body)
            this.nodeData = response.body.data.nodeData
            console.log('nodedata',this.nodeData)
        },(response)=>{
            this.nodeData =null
            console.error(response)
        });
      
    },
    confirm(){
      console.log('confirm')
    }
  }
}
</script>

