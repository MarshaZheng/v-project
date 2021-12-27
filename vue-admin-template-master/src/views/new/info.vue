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
      <el-form :inline="true"  class="demo-form-inline">
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
          <el-form-item>
            <el-button  @click="clearData">清空条件</el-button>
          </el-form-item>
        </el-form>
        </el-form>
     </div>
    <div class="crumbs" v-if="this.nodeData!==null">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>
                <font color='#409EFF'>节点属性信息</font>
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div><br/>
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
          <el-button type="text" @click="toInfo(scope.row)" >确认</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-table :data="nodeData" v-if="this.form.type=='PHYSICIAN_ID'" border class="table" ref="multipleTable" header-cell-class-name="table-header">
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
    <br/>
    <div class="crumbs" v-if="this.record!==null">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>
                <font color='#409EFF'>节点就诊信息</font>
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div><br/>
    <div class="handle-box" v-if="this.record!==null">
      <el-form :inline="true"  class="demo-form-inline">
        <el-form ref="form" :model="filterForm">
          <el-form-item label="就诊时间" >
              <el-date-picker size="mini"
                v-model="filterForm.TIME"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
          </el-form-item>
          <el-form-item label="就诊医院" >
            <el-input size="mini" v-model="filterForm.HOSPITAL_ID" />
          </el-form-item>
          <el-form-item label="就诊医生">
            <el-input  size="mini" v-model="filterForm.PHYSICIAN_ID" />
          </el-form-item>
          <el-form-item label="就诊科室" >
            <el-input size="mini" v-model="filterForm.DEPT_ID" />
          </el-form-item>
          <el-form-item label="就诊患者">
            <el-input size="mini" v-model="filterForm.PATIENT_ID" />
          </el-form-item>
        </el-form>
        </el-form>
     </div>

    <el-table :data="recordResult" v-if="this.record!==null"  @selection-change="handleSelectionChange" border class="table" ref="multipleTable" header-cell-class-name="table-header">
      <el-table-column type="selection" width="50">
         </el-table-column>
      <el-table-column align="center" label="就诊时间">
        <template slot-scope="scope">
          {{ scope.row.TIME }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="病人ID">
        <template slot-scope="scope">
          {{ scope.row.PATIENT_ID }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="病人姓名">
        <template slot-scope="scope">
          {{ scope.row.PATIENT_NAME }}
          </template>
      </el-table-column>
      <el-table-column align="center" label="医院ID">
        <template slot-scope="scope">
          {{ scope.row.HOSPITAL_ID }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="医院名称">
        <template slot-scope="scope">
          {{ scope.row.HOSPITAL_NAME }}
        </template>
      </el-table-column>
       <el-table-column align="center" label="医生ID">
        <template slot-scope="scope">
          {{ scope.row.PHYSICIAN_ID }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="医生姓名">
        <template slot-scope="scope">
          {{ scope.row.PHYSICIAN_NAME }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="科室ID">
        <template slot-scope="scope">
          {{ scope.row.DEPT_ID }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="科室名称">
        <template slot-scope="scope">
          {{ scope.row.DEPT_NAME }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="入院">
        <template slot-scope="scope">
          {{ scope.row.ADMISSION_DISEASE_ID }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="出院">
        <template slot-scope="scope">
          {{ scope.row.DISCHARGE_DISEASE_ID }}
        </template>
      </el-table-column>
    </el-table><br/>
  <div class="crumbs" v-if="this.record!==null">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>
                <font color='#409EFF'>可视化视图</font>
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div><br/>
    <div style="height:calc(100vh - 50px);">
        <RelationGraph ref="seeksRelationGraph" :options="graphOptions" :on-node-click="onNodeClick" :on-line-click="onLineClick" />
     </div>
  </div>
</template>

<script>
import {getPatientList} from '@/api/backend'
import {getPhysicianList} from '@/api/backend'
import RelationGraph from 'relation-graph'
export default {
  name: 'Demo',
  components: { RelationGraph },
  data() {
    return {
      form: {
        type: '',
        id: '',
        name:'',
      },
      nodeData:null,
      record:null,
      recordResult:[],
      filterForm:{
        TIME:'',
        HOSPITAL_ID:'',
        PHYSICIAN_ID:'',
        PATIENT_ID:'',
        DEPT_ID:''
      },
      graphOptions: {
         allowSwitchLineShape: true,
         allowSwitchJunctionPoint: true,
         defaultJunctionPoint: 'border'
         // 这里可以参考"Graph 图谱"中的参数进行设置
       }
    }
  },
  created() {
    this.getParams()
  },
  watch:{
    '$route': 'getParams',
    filterForm:{
      handler(val, oldVal){
        if(val){
        // 如果筛选条件全为空，查全部；否则按条件筛选
          var objIsEmpty = this.filterForm.PHYSICIAN_ID == '' && this.filterForm.HOSPITAL_ID == '' && this.filterForm.PATIENT_ID == '' && this.filterForm.DEPT_ID == ''
          if(objIsEmpty){
            this.recordResult = this.record
          } else {
          // /拿到有值的参数
            let tempFilter = {};
            for(var key in this.filterForm) {
                if(typeof(this.filterForm[key]) != "undefined" && typeof(this.filterForm[key]) != "null" && this.filterForm[key] != null && this.filterForm[key] != "") {
                tempFilter[key] = this.filterForm[key];
            }
          }
          // console.log(tempFilter,'输出tempFilter')
          this.recordResult = this.record.filter((item) => {
            let flag = false;
            for(key in tempFilter) {
              console.log(key,'输出key')
              if(item[key].toString().indexOf(tempFilter[key].toString()) >= 0) {
                flag = true;
              } else {
                flag = false;
                break;
              }
            }
            if(flag) {
              return item;
            }
          }
        );
        console.log(this.result,'输出筛选结果')
      }
    }
  },
  deep:true
}
  },
  mounted() {
     this.showSeeksGraph()
   },
  methods: { 
    onSubmit() {
        if(this.form.type=='PATIENT_ID'){
           getPatientList(this.form).then((response)=>{
                console.info('response.data',response.data)
                this.nodeData = response.data.data.nodeData
                this.record = response.data.data.recordData
                this.recordResult=this.record
                console.log('nodedata',this.nodeData)
            },(response)=>{
                this.nodeData =null
                console.error(response)
            });
        }else{
           getPhysicianList(this.form).then((response)=>{
                console.info('response.data',response.data)
                this.nodeData = response.data.data.nodeData
                this.record = response.data.data.recordData
                this.recordResult=this.record
                console.log('nodedata',this.nodeData)
            },(response)=>{
                this.nodeData =null
                console.error(response)
            });
        }
        
      
    },

    clearData(){
        this.nodeData = null
        this.record = null
        this.recordResult = []
        this.form.id = null
        this.form.type = null
        this.form.name = null
    },
    getParams(){
        // 取到路由带过来的参数
      const id = this.$route.query.id
      const type = this.$route.query.type
      const name = this.$route.query.name
      // 将数据放在当前组件的数据内
      if(id){
        this.form.id = id
        this.form.type = type
        this.form.name = name
        console.log('getParams',this.form)
        this.onSubmit(this.form)
      }else{
        this.clearData()
      }
      
    },
    toInfo(nodeData){
      console.log('toInfo', nodeData)
        this.$router.push({
          path: '/info',
          query: {
            id: nodeData.id,
            type: this.form.type,
            name: nodeData.name
          }
        })
    },
    showSeeksGraph(query) {
       var __graph_json_data = {
         rootId: 'a',
         nodes: [
           { id: 'a', text: 'A', borderColor: 'yellow' },
           { id: 'b', text: 'B', color: '#43a2f1', fontColor: 'yellow' },
           { id: 'c', text: 'C', nodeShape: 1, width: 80, height: 60 },
           { id: 'e', text: 'E', nodeShape: 0, width: 150, height: 150 }
         ],
         links: [
           { from: 'a', to: 'b', text: '关系1', color: '#43a2f1' },
           { from: 'a', to: 'c', text: '关系2' },
           { from: 'a', to: 'e', text: '关系3' },
           { from: 'b', to: 'e', color: '#67C23A' }
         ]
       }
       // 以上数据中的node和link可以参考"Node节点"和"Link关系"中的参数进行配置 
       this.$refs.seeksRelationGraph.setJsonData(__graph_json_data, (seeksRGGraph) => {
         // Called when the relation-graph is completed 
       })
     },
     onNodeClick(nodeObject, $event) {
       console.log('onNodeClick:', nodeObject)
     },
     onLineClick(lineObject, $event) {
       console.log('onLineClick:', lineObject)
     }
  }
}
</script>

<style scoped>

</style>