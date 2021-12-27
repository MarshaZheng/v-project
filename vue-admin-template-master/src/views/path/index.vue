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
          <el-form-item label="节点1 ID">
            <el-input v-model="form.id1" />
          </el-form-item>
          <el-form-item label="节点2 ID">
            <el-input v-model="form.id2" />
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
    <el-table :data="nodes" border class="table" ref="multipleTable" header-cell-class-name="table-header">
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
                <font color='#409EFF'>关联路径信息</font>
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <br></br>
    <el-tabs v-model="activeName" @tab-click="handleClick" tab-position="top">
        <el-tab-pane label="列表视图" name="first" >
        <el-table :data="path" border class="table" height="600" ref="multipleTable" header-cell-class-name="table-header">
          <el-table-column align="center" label="n阶关系">
            <template slot-scope="scope">
              {{ scope.row.step }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="中间节点类型">
            <template slot-scope="scope">
              {{ scope.row.internal_node_type }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="中间节点1">
            <template slot-scope="scope">
              {{ scope.row.internal_node1 }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="关联节点1">
            <template slot-scope="scope">
              {{ scope.row.internal_patient1 }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="中间节点2">
            <template slot-scope="scope">
              {{ scope.row.internal_node2 }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="关联节点2">
            <template slot-scope="scope">
              {{ scope.row.internal_patient2 }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="中间节点3">
            <template slot-scope="scope">
              {{ scope.row.internal_node3 }}
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
</template>

<script>
import { getList } from '@/api/path'
import SeeksRelationGraph from 'relation-graph'

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
      nodes: null,
      path: null,
      path_graph:null,
      activeName: 'first',
      path_type:{
        step:'2',
        internal_node_type:'PHYSICIAN_ID',
      },
      form: {
        type: '',
        id1: '',
        id2:'',
        
      },
      graphOptions: {
        "backgrounImage": "http://ai-mark.cn/images/ai-mark-desc.png",
        "backgrounImageNoRepeat": true,
        "layouts": [
          {
            "label": "中心",
            "layoutName": "tree",
            "layoutClassName": "seeks-layout-center",
            "defaultJunctionPoint": "border",
            "defaultNodeShape": 0,
            "defaultLineShape": 1,
            "min_per_width": "100",
            "min_per_height": "120"
          }
        ],
        "defaultLineMarker": {
          "markerWidth": 12,
          "markerHeight": 12,
          "refX": 6,
          "refY": 6,
          "data": "M2,2 L10,6 L2,10 L6,6 L2,2"
        },
        "defaultNodeShape": 1,
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
      getList().then(response => {
        this.nodes = response.data.nodes
        this.path =response.data.path
        this.path_graph = response.data.path_graph
        // console.log('type',response.data.type,'id',response.data.id)
        this.showSeeksGraph()
      })
    },
    clearData(){
        this.nodes = null
        this.path =null
        this.path_graph = null
    },
    getParams(){
        // 取到路由带过来的参数
      const id = this.$route.query.id
      const type = this.$route.query.type
      // 将数据放在当前组件的数据内
      if(id){
        this.form.id1 = id
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
       var __graph_json_data = this.path_graph
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