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
        <el-form ref="form" :model="form" >
          <el-form-item label="节点类型">
            <el-select v-model="form.type" placeholder="please enter">
              <el-option label="病人" value="PATIENT_ID" />
              <el-option label="医生" value="PHYSICIAN_ID" />
            </el-select>
          </el-form-item>
          <el-form-item label="节点ID">
            <el-input v-model="form.id" />
          </el-form-item>
          
          <el-form-item>
            <el-button type="primary" @click="fetchData">搜索</el-button>
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
    <br></br>
    <el-table :data="nodeData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
      <el-table-column align="center" label="节点id">
        <template slot-scope="scope">
          {{ scope.row.node_id }}
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
       <el-table-column align="center" label="c出生日期">
        <template slot-scope="scope">
          {{ scope.row.birth }}
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
    </el-table>
    <br></br>
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>
                <font color='#409EFF'>节点参诊/就诊记录</font>
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <br></br>
    <el-table :data="record" border class="table" ref="multipleTable" header-cell-class-name="table-header">
      <el-table-column align="center" label="就诊时间" >
        <template slot-scope="scope">
          {{ scope.row.time }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="医院编号" >
        <template slot-scope="scope">
          {{ scope.row.HOSPITAL_ID }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="医院名称" >
        <template slot-scope="scope">
          {{ scope.row.HOSPITAL_NAME }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="医生编码" >
        <template slot-scope="scope">
          {{ scope.row.PYSICIAN_ID }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="医生名称" >
        <template slot-scope="scope">
          {{ scope.row.PYSICIAN_NAME }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="科室编码" >
        <template slot-scope="scope">
          {{ scope.row.dept_id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="科室名称" >
        <template slot-scope="scope">
          {{ scope.row.DEPT_NAME }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="入院诊断id" >
        <template slot-scope="scope">
          {{ scope.row.ADMISSION_DISEASE_ID}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="出院诊断id" >
        <template slot-scope="scope">
          {{ scope.row.DISCHARGE_DISEASE_ID }}
        </template>
      </el-table-column>
    </el-table>


  <br></br>
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>
                <font color='#409EFF'>节点相似性挖掘结果</font>
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <br></br>
    <el-tabs v-model="activeName" @tab-click="handleClick" tab-position="top">
        <el-tab-pane label="列表视图" name="first" >
        <el-table :data="sim_node" border class="table" ref="multipleTable" header-cell-class-name="table-header">
          <el-table-column align="center" label="节点id">
        <template slot-scope="scope">
          {{ scope.row.node_id }}
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
       <el-table-column align="center" label="c出生日期">
        <template slot-scope="scope">
          {{ scope.row.birth }}
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
          <el-button type="text" @click="onSubmit" >查看</el-button>
        </template>
      </el-table-column>
          </el-table>
      </el-tab-pane>
      <el-tab-pane label="可视化视图" name="second">
        <template>
          <div>
            <div style="height:calc(100vh - 50px);">
                <RelationGraph ref="seeksRelationGraph" :options="graphOptions" :on-node-click="onNodeClick" :on-line-click="onLineClick" />
            </div>
          </div>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getList } from '@/api/group'
import RelationGraph from 'relation-graph'

export default {
  name: 'Demo',
  components: { RelationGraph },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      nodeData: null,
      record:null,
      sim_node:null,
      group:null,
      activeName: 'first',
      form: {
        type: '',
        id: '',
        
      },
      graphOptions: {
          "backgrounImage": "http://ai-mark.cn/images/ai-mark-desc.png",
          "backgrounImageNoRepeat": true,
          "layouts": [
            {
              "label": "中心",
              "layoutName": "force",
              "layoutClassName": "seeks-layout-center",
              "defaultExpandHolderPosition": "hide",
              "defaultJunctionPoint": "border"
            }
          ],
          "defaultLineMarker": {
            "markerWidth": 12,
            "markerHeight": 12,
            "refX": 6,
            "refY": 6,
            "data": "M2,2 L10,6 L2,10 L6,6 L2,2"
          },
          "allowShowMiniToolBar": true,
          "allowSwitchLineShape": true,
          "allowSwitchJunctionPoint": false,
          "allowShowMiniView": false,
          "isMoveByParentNode": true,
          "defaultNodeShape": 0,
          "disableZoom": false,
          "defaultExpandHolderPosition": "bottom"
      }
    }
  },
  created() {
     this.getParams()
  },
  watch:{
    '$route': 'getParams'
  },
  methods: {
    fetchData(form) {
      getList(form).then(response => {
        this.nodeData = response.data.node,
        this.record =response.data.records,
        this.sim_node = response.data.sim_nodes,
        this.group = response.data.group, 
        this.showSeeksGraph()
      })
      
    },
    clearData(){
        this.nodeData = null
        this.record =null
        this.sim_node = null
        this.graph = null
    },
    getParams(){
        // 取到路由带过来的参数
      const id = this.$route.query.id
      const type = this.$route.query.type
      // 将数据放在当前组件的数据内
      if(id){
        this.form.id = id
        this.form.type = type
        console.log('getParams',this.form)
        this.fetchData(this.form)
      }else{
        this.clearData()
        this.showSeeksGraph()
      }
      
    },
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    showSeeksGraph(query) {
       var __graph_json_data = this.group
       console.log('graphdata', __graph_json_data)
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
