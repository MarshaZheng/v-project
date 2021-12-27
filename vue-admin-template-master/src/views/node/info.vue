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
            <div v-if="nodeData!==null">
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
       <el-table-column align="center" label="出生日期">
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
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="Title" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.importance" placeholder="Imp" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.type" placeholder="Type" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />
      </el-select>
      <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button>
    </div>
        
    <el-table :data="record" border class="table" ref="multipleTable" header-cell-class-name="table-header" highlight-current-row
      @selection-change="handleSelectionChange" element-loading-text="拼命加载中">
    <el-table-column type="selection" align="center" />
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
       <el-table-column align="center" label="出生日期">
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
            <div ref="myPage" style="height:calc(100vh - 50px);" @click="isShowNodeMenuPanel = false">
                <SeeksRelationGraph ref="seeksRelationGraph" :options="graphOptions" :on-node-click="showNodeMenus" :on-line-click="onLineClick" >
                </SeeksRelationGraph>
            </div>
            <div v-show="isShowNodeMenuPanel" :style="{left: nodeMenuPanelPosition.x + 'px', top: nodeMenuPanelPosition.y + 'px' }" style="z-index: 999;padding:10px;background-color: #ffffff;border:#eeeeee solid 1px;box-shadow: 0px 0px 8px #cccccc;position: absolute;">
              <div style="line-height: 25px;padding-left: 10px;color: #888888;font-size: 12px;">对这个节点进行操作：</div>
              <div class="c-node-menu-item" @click.stop="doAction('1')">查看信息</div>
              <div class="c-node-menu-item" @click.stop="doAction('2')">节点相似性探索</div>
              <div class="c-node-menu-item" @click.stop="doAction('3')">社区发现探索</div>
              <div class="c-node-menu-item" @click.stop="doAction('4')">关联路径探索</div>
              <div class="c-node-menu-item" @click.stop="doAction('5')">删除节点</div>
            </div>
          </div>
        </template>
      </el-tab-pane>
    </el-tabs>
    </div>
  </div>
</template>

<script>
import { getList } from '@/api/node'
import SeeksRelationGraph from 'relation-graph'
const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]
export default {
  name: 'Demo',
  components: { SeeksRelationGraph },
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
      isShowCodePanel: false,
      isShowNodeMenuPanel: false,
      nodeMenuPanelPosition: { x: 0, y: 0 },
      nodeData: null,
      record:null,
      sim_node:null,
      graph:null,
      activeName: 'first',
      currentNode: null,
      form: {
        type: '',
        id: '',
        
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
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
          "allowSwitchJunctionPoint": true,
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
    
    handleClick (tab, event) {
      console.log(tab, event)
    },
    fetchData() {
      getList(this.form).then(response => {
        this.nodeData = response.data.node,
        this.record =response.data.records,
        this.sim_node = response.data.sim_nodes,
        this.graph = response.data.graph, 
        // console.log('type',response.data.type,'id',response.data.id)
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
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
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
       var __graph_json_data = this.graph
       // 以上数据中的node和link可以参考"Node节点"和"Link关系"中的参数进行配置 
       this.$refs.seeksRelationGraph.setJsonData(__graph_json_data, (seeksRGGraph) => {
         // Called when the relation-graph is completed 
       })
     },
     onNodeClick(nodeObject, $event) {
       
     },
     onLineClick(lineObject, $event) {
       console.log('onLineClick:', lineObject)
     },
     showInfo(nodeObject){
       var text='<br>节点类型:'+nodeObject.data.node_type+'</br>'
                  +'<br>节点id:'+nodeObject.data.node_id+'</br>'
                  +'<br>节点名称:'+nodeObject.data.name+'</br>'
                  +'<br>性别:'+nodeObject.data.sex+'</br>'
                  +'<br>出生日期:'+nodeObject.data.birth+'</br>'
                  +'<br>参保类型:'+nodeObject.data.benefit_type+'</br>'
                  +'<br>人员类别:'+nodeObject.data.benefit_group_id+'</br>'
                  +'<br>缴费地区:'+nodeObject.data.area_id+'</br>'
                  +'<br>社保卡识别:'+nodeObject.data.id_type+'</br>'
                  +'<br>社保卡号:'+nodeObject.data.id_number+'</br>'
                  +'<br>工作单位:'+nodeObject.data.company+'</br>'
                  +'<br>地址:'+nodeObject.data.address+'</br>';
        this.$notify({
            title: '节点信息',
            dangerouslyUseHTMLString: true,
            message: text,
            duration: 0
          });
        console.log('onNodeClick:', nodeObject)
     },
    showNodeMenus(nodeObject, $event) {
        this.currentNode = nodeObject
        var _base_position = this.$refs.myPage.getBoundingClientRect()
        console.log('showNodeMenus:', $event, _base_position)
        this.isShowNodeMenuPanel = true
        this.nodeMenuPanelPosition.x = $event.clientX - _base_position.x
        this.nodeMenuPanelPosition.y = $event.clientY - _base_position.y
      
    },
    toNodeInfo(nodeData){
      console.log('toNodeInfo', nodeData)
        this.$router.push({
          path: '/node/index',
          query: {
            id: nodeData.node_id,
            type: nodeData.node_type
          }
        })
    },
    toGroupInfo(nodeData){
      console.log('toGroupInfo', nodeData)
        this.$router.push({
          path: '/group/index',
          query: {
            id: nodeData.node_id,
            type: nodeData.node_type
          }
        })
    },
    toPathInfo(nodeData){
      console.log('toPathInfo', nodeData)
        this.$router.push({
          path: '/path/index',
          query: {
            id: nodeData.node_id,
            type: nodeData.node_type
          }
        })
    },
    doAction(actionName) {
      if(actionName=='1'){
        this.showInfo(this.currentNode)
      }else if(actionName=='2'){
        var nodeData = this.currentNode.data
        console.log('current.data:', nodeData)
        this.toNodeInfo(nodeData)
      }else if(actionName=='3'){
        var nodeData = this.currentNode.data
        console.log('current.data:', nodeData)
        this.toGroupInfo(nodeData)
      }else if(actionName=='4'){
        var nodeData = this.currentNode.data
        this.toPathInfo(nodeData)
      }
      else if(actionName=='5'){
        console.log('node',this.currentNode)
        var graph = this.$refs.seeksRelationGraph
        graph.getNodeById(this.currentNode.id).opacity = 0.1
      }
      else{
          this.$notify({
            title: '提示',
            message: '对节点【' + this.currentNode.text + '】进行了：' + actionName,
            type: 'success'
          })
          this.isShowNodeMenuPanel = false
      }
      
    }
  
  }
}
</script>

<style lang="scss">
</style>

<style lang="scss" scoped>
.c-node-menu-item{
  line-height: 30px;padding-left: 10px;cursor: pointer;color: #444444;font-size: 14px;border-top:#efefef solid 1px;
}
.c-node-menu-item:hover{
  background-color: rgba(66,187,66,0.2);
}
</style>