<template>

  <div class="app-container">
  <div class="crumbs" v-if="this.graph_data!==null">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>
                <font color='#409EFF'>社区发现挖掘结果</font>
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div><br/>
    <el-tabs v-model="activeName" @tab-click="handleClick" tab-position="top">
        <el-tab-pane label="列表视图" name="first" >
        <el-table :data="nodeData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
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
      <el-table-column align="center" label="就诊次数">
        <template slot-scope="scope">
          {{ scope.row.record_count }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="所属社区id">
        <template slot-scope="scope">
          {{ scope.row.community_id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="toInfo(scope.row)" >查看</el-button>
        </template>
      </el-table-column>
          </el-table>
      </el-tab-pane>
      <el-tab-pane label="可视化视图" name="second">
        <template v-if="this.graph_data!==null">
          <div>
            <el-row type="flex" class="row-bg" justify="end">
              <el-col :span=18> 
              <template>
                <div>
                  <div ref="myPage" style="height:calc(100vh - 50px);" @click="isShowNodeMenuPanel = false">
                      <SeeksRelationGraph ref="seeksRelationGraph" :options="graphOptions" :on-node-click="onNodeClick" :on-line-click="onLineClick" >
                      <div slot="node" slot-scope="{node}">
                        <div style="margin:auto;font-size: 20px;padding-top: 20%;" @click="onNodeClick(node, $event)" @contextmenu.prevent.stop="showNodeMenus(node, $event)">
                        {{node.text}}
                        </div>
                      </div>
                      </SeeksRelationGraph>
                  </div>
                  <div v-show="isShowNodeMenuPanel" :style="{left: nodeMenuPanelPosition.x + 'px', top: nodeMenuPanelPosition.y + 'px' }" style="z-index: 999;padding:10px;background-color: #ffffff;border:#eeeeee solid 1px;box-shadow: 0px 0px 8px #cccccc;position: absolute;">
                    <div style="line-height: 25px;padding-left: 10px;color: #888888;font-size: 12px;">对这个节点进行操作：</div>
                    <div class="c-node-menu-item" @click.stop="doAction('1')">跳转节点详情</div>
                    <div class="c-node-menu-item" @click.stop="doAction('2')">节点相似性探索</div>
                    <div class="c-node-menu-item" @click.stop="doAction('3')">社区发现探索</div>
                    <div class="c-node-menu-item" @click="dialogVisible1 = true">关联路径探索</div>
                    <div class="c-node-menu-item" @click="dialogVisible2 = true">展开关联节点</div>
                    <div class="c-node-menu-item" @click.stop="doAction('5')">删除节点</div>
                  </div>
                </div>
                <el-dialog
                    title="关联路径探索"
                    :visible.sync="dialogVisible1"
                    width="30%"
                    :before-close="handleClose" v-if="currentNode!==null">
                    <div class="handle-box">
                      <el-form class="demo-form-inline">
                        <el-form ref="form" :model="algorithmForm">
                        <el-form-item label="节点类型">
                            <el-input v-model="currentNode.data.type" :disabled="true" />
                          </el-form-item>
                         <el-form-item label="节点1id">
                            <el-input v-model="currentNode.data.id" :disabled="true" />
                          </el-form-item>
                          <el-form-item label="节点2id">
                            <el-input  v-model="pathnode2"  />
                          </el-form-item>
                        </el-form>
                        </el-form>
                    </div>
                    <span slot="footer" class="dialog-footer">
                      <el-button @click="dialogVisible1 = false">取 消</el-button>
                      <el-button type="primary" @click="giveDataToPathInfo()">确 定</el-button>
                    </span>
                  </el-dialog>
                  <el-dialog
                    title="展开关联节点"
                    :visible.sync="dialogVisible2"
                    width="30%"
                    :before-close="handleClose" v-if="currentNode!==null">
                    <div class="handle-box">
                      <el-form class="demo-form-inline">
                        <el-form ref="form" :model="expandForm">
                        <el-form-item label="关联节点类型">
                            <el-select v-model="expandForm.expand_type" placeholder="please enter">
                              <el-option label="病人" value="PATIENT_ID" />
                              <el-option label="医生" value="PHYSICIAN_ID" />
                              <el-option label="科室" value="DEPT_ID" />
                              <el-option label="医院" value="HOSPITAL_ID" />
                            </el-select>
                          </el-form-item>
                        </el-form>
                        </el-form>
                    </div>
                    <span slot="footer" class="dialog-footer">
                      <el-button @click="dialogVisible2 = false">取 消</el-button>
                      <el-button type="primary" @click="expandNode">确 定</el-button>
                    </span>
                  </el-dialog>
                  <el-row>
                    <el-button type="primary"  circle>医院</el-button>
                    <el-button type="success"  circle>患者</el-button>
                    <el-button type="info" circle>科室</el-button>
                    <el-button type="warning"  circle>医生</el-button>
                  </el-row>
              </template>
              </el-col>
              <el-col :span="6" :model="infoNodeData">
                <el-descriptions :model='infoNodeData' class="margin-top" title="节点信息" :column="1" :size="small" border v-if="infoNodeData.id!==''&&infoNodeData.type==='PATIENT_ID'">
                  <el-descriptions-item>
                    <template slot="label">
                      节点类型
                    </template>
                    {{infoNodeData.type}}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template slot="label">
                      节点id
                    </template>
                    {{infoNodeData.id}}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template slot="label">
                      节点id
                    </template>
                    {{infoNodeData.name}}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template slot="label">
                      性别
                    </template>
                    {{infoNodeData.gender}}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template slot="label">
                      出生日期
                    </template>
                    {{infoNodeData.dob}}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template slot="label">
                      参保类型
                    </template>
                    {{infoNodeData.benefit_group_id}}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template slot="label">
                      人员类别
                    </template>
                    {{infoNodeData.benefit_type}}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template slot="label">
                      缴费地区
                    </template>
                    {{infoNodeData.area_id}}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template slot="label">
                      工作单位
                    </template>
                    {{infoNodeData.company}}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template slot="label">
                      社保卡号
                    </template>
                    {{infoNodeData.id_number}}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template slot="label">
                      社保卡识别码
                    </template>
                    {{infoNodeData.id_type}}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template slot="label">
                      地址
                    </template>
                    {{infoNodeData.address}}
                  </el-descriptions-item>
                </el-descriptions>
                <el-descriptions :model='infoNodeData' class="margin-top" title="节点信息" :column="1" :size="small" border v-if="infoNodeData.id!==''&&infoNodeData.type==='PHYSICIAN_ID'">
                  <el-descriptions-item>
                    <template slot="label">
                      节点类型
                    </template>
                    {{infoNodeData.type}}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template slot="label">
                      节点id
                    </template>
                    {{infoNodeData.id}}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template slot="label">
                     节点名称
                    </template>
                    {{infoNodeData.doctor_name}}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template slot="label">
                      医院id
                    </template>
                    {{infoNodeData.hospital_id}}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template slot="label">
                      级别
                    </template>
                    {{infoNodeData.doctor_level}}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template slot="label">
                      职称
                    </template>
                    {{infoNodeData.doctor_title}}
                  </el-descriptions-item>
                </el-descriptions>
                <el-descriptions :model='infoNodeData' class="margin-top" title="节点信息" :column="1" :size="small" border v-if="infoNodeData.id!==''&&infoNodeData.type==='HOSPITAL_ID'">
                  <el-descriptions-item>
                    <template slot="label">
                      节点类型
                    </template>
                    {{infoNodeData.type}}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template slot="label">
                      节点id
                    </template>
                    {{infoNodeData.id}}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template slot="label">
                     节点名称
                    </template>
                    {{infoNodeData.name}}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template slot="label">
                      级别
                    </template>
                    {{infoNodeData.p_level}}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template slot="label">
                      所属地区
                    </template>
                    {{infoNodeData.area_id}}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template slot="label">
                      定点基层类型
                    </template>
                    {{infoNodeData.h_type}}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template slot="label">
                      收费类别
                    </template>
                    {{infoNodeData.charge_type}}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template slot="label">
                      经度
                    </template>
                    {{infoNodeData.longitude}}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template slot="label">
                      纬度
                    </template>
                    {{infoNodeData.latitude}}
                  </el-descriptions-item>
                </el-descriptions>
              </el-col>
            </el-row>
          </div>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {fetchData,getPatientList,getPhysicianList,communityAlgorithm,expandNode} from '@/api/backend'
import SeeksRelationGraph from 'relation-graph'


export default {
  name: 'Demo',
  components: { SeeksRelationGraph },
  data() {
    return {
      pathnode2:'',
      dialogVisible1: false,
      dialogVisible2: false,
      isShowCodePanel: false,
      isShowNodeMenuPanel: false,
      nodeMenuPanelPosition: { x: 0, y: 0 },
      activeName: 'first',
      currentNode: null,
      form: {
        type: '',
        id: '',
        name:'',
      },
      nodeData:null,
      record:null,
      algorithmForm:{
        multipleSelection: [],
        type:'',
        algorithm:'',
        node_id:''
      },
      expandForm:{
        id:'',
        type:'',
        expand_type:''
      },
      infoNodeData:{
        node_type:'',
        id:'',
        name:'',
        gender:'',
        dob:'',
        benefit_type:'',
        benefit_group_id:'',
        area_id:'',
        company:'',
        address:'',
        id_number:'',
        id_type:''
      },
      nullNodeData: {
        node_type:'',
        id:'',
        name:'',
        gender:'',
        dob:'',
        benefit_type:'',
        benefit_group_id:'',
        area_id:'',
        company:'',
        address:'',
        id_number:'',
        id_type:''
      },
      graphOptions: {
        "backgrounImage": "",
        "backgrounImageNoRepeat": true,
        "layouts": [
          {
            "label": "中心",
            "layoutName": "center",
            "layoutClassName": "seeks-layout-center",
            "useLayoutStyleOptions": true,
            "distance_coefficient": 1
          },
          {
            "label": "树状",
            "layoutName": "tree",
            "layoutClassName": "seeks-layout-center",
            "useLayoutStyleOptions": true,
            "defaultNodeBorderColor": "#E4E4E4",
            "defaultNodeWidth": "80",
            "defaultJunctionPoint": "border",
            "defaultLineShape": 1,
            "min_per_width": "100"
          }
        ],
        "defaultLineMarker": {
          "markerWidth": 12,
          "markerHeight": 12,
          "refX": 6,
          "refY": 6,
          "data": "M2,2 L10,6 L2,10 L6,6 L2,2"
        },
        "defaultNodeBorderColor": null,
        "defaultNodeColor": "rgba(118, 198, 79, 1)",
        "defaultNodeFontColor": "rgba(0, 0, 0, 1)",
        "hideNodeContentByZoom": true,
        "isMoveByParentNode": true,
        "allowSwitchJunctionPoint": true,
        "allowSwitchLineShape": true,
        "allowShowMiniNameFilter": true,
        "allowShowMiniView": false,
        "defaultLineColor": "rgba(169, 169, 169, 1)"
      },
       graph_data:{
         rootId:'',
         nodes:[],
         links:[]
       }
    }
  },
  created() {
    console.log('1')
    this.getParams()
  },
  watch:{
    '$route': 'getParams',
  },
  mounted() {
    this.getParams()
   },
  methods: { 
     expandNode(){
      this.isShowNodeMenuPanel = false
      console.log('expandNode')
      this.dialogVisible2=false
      this.expandForm.id = this.currentNode.data.id
      this.expandForm.type = this.currentNode.data.type
      expandNode(this.expandForm).then((response)=>{
                console.info('response.data',response.data)
                var __graph_json_data = response.data.data.graphData
                this.$refs.seeksRelationGraph.appendJsonData(__graph_json_data, (seeksRGGraph) => {
                  // 这些写上当图谱初始化完成后需要执行的代码
                })
            },(response)=>{
                console.error(response)
            });
    },
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
    getParams(){
      console.log('before get',this.$route.query)
        // 取到路由带过来的参数
      
      const nodes = this.$route.query.nodes
      this.form.type = this.$route.query.type
      var alform = {nodes:nodes, type:this.form.type}
      // 将数据放在当前组件的数据内
      if(this.form.type===''){
         this.$notify({
            title: '提示',
            message: '未传入主节点信息',
            type: 'error'
          })
      }else{
        if(this.form.type==='PATIENT_ID'){
                communityAlgorithm(alform).then((res)=>{
                  console.info('res.data',res.data)
                  this.nodeData = res.data.data.nodeData
                  this.graph_data = res.data.data.graphData
                  this.showSeeksGraph()
                },(res)=>{
                  console.error(res)
                })
        }else{
           getPhysicianList(this.form).then((response)=>{
                console.info('response.data',response.data)
                this.nodeData = response.data.data.nodeData
                this.record = response.data.data.recordData
                console.log('nodedata',this.nodeData)
            },(response)=>{
                this.nodeData =null
                this.record =null
                console.error(response)
            });
        }
      }
      
    },
    runAlgorithm(){
      console.log('run algorithm')
      var nodes = []
      for(var record of this.algorithmForm.multipleSelection ){
        if(nodes.indexOf(record[this.algorithmForm.type]) == -1){
          nodes.push(record[this.algorithmForm.type])
        }
      }
       console.log('nodes_id',nodes)
       if(this.algorithmForm.algorithm==='1'){ //节点相似性
            var data = {node:this.algorithmForm.node_id,
                        nodes: nodes,
                        type:this.algorithmForm.type}
            this.toNodeInfo(data)

       }else if(this.algorithmForm.algorithm==='2'){ //社区发现
            var data = {nodes: nodes,
                        type:this.algorithmForm.type}
            this.toGroupInfo(data)
       }else{
            var data = {nodes: nodes,
                        type:this.algorithmForm.type}
            this.toPathInfo(data)
       }
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
    showSeeksGraph(query) {
       var __graph_json_data = this.graph_data
       // 以上数据中的node和link可以参考"Node节点"和"Link关系"中的参数进行配置 
       this.$refs.seeksRelationGraph.setJsonData(__graph_json_data, (seeksRGGraph) => {
         // Called when the relation-graph is completed 
       })
     },
     onNodeClick(nodeObject, $event) {
       if ($event.button == 0){
       console.log('onNodeClick:', nodeObject)
       
       fetchData({id:nodeObject.data.id,type:nodeObject.data.type}).then((response)=>{
                console.info('response.data',response.data)
                this.infoNodeData = response.data.data.nodeData[0]
                this.infoNodeData.type = nodeObject.data.type
                console.log('info_nodedata',this.infoNodeData)
       },(response)=>{
                this.infoNodeData
                console.error(response)
        });
       }else{
         this.$notify({
            title: '节点信息',
            message: 'eee'
          });
       }
     },
     onLineClick(lineObject, $event) {
       console.log('onLineClick:', lineObject)
     },
    showNodeMenus(nodeObject, $event) {
        this.currentNode = nodeObject
        var _base_position = this.$refs.myPage.getBoundingClientRect()
        console.log('showNodeMenus:', $event, _base_position)
        this.isShowNodeMenuPanel = true
        this.nodeMenuPanelPosition.x = $event.clientX - _base_position.x
        this.nodeMenuPanelPosition.y = $event.clientY - _base_position.y
      
    },
    toNodeInfo(Data){
      console.log('nodeAlgorithm', Data)
        let routeUrl = this.$router.resolve({
          path: '/nodeAlgorithm/index',
          query: {
            root_node: Data.root_node,
            nodes: Data.nodes,
            type: Data.type
          }
        })
        window.open(routeUrl.href, '_blank')
    },
    toGroupInfo(Data){
      console.log('communityAlgorithm', Data)
        let routeUrl = this.$router.resolve({
          path: '/communityAlgorithm/index',
          query: {
            nodes: Data.nodes,
            type: Data.type
          }
        })
        window.open(routeUrl.href, '_blank')
    },
    toPathInfo(Data){
      this.dialogVisible1 = false
      console.log('pathAlgorithm', Data)
        let routeUrl = this.$router.resolve({
          path: '/pathAlgorithm/index',
          query: {
            nodes: Data.nodes,
            type: Data.type
          }
        })
        window.open(routeUrl.href, '_blank')
    },
    giveDataToPathInfo(){
       var data = {nodes:[this.currentNode.data.id,this.pathnode2],type:this.currentNode.data.type}
       this.toPathInfo(data)
     },
    doAction(actionName) {
      if(actionName=='1'){
        this.form.type = this.currentNode.data.type
        this.toInfo(this.currentNode.data)
      }else if(actionName=='2'){
        var data = {
          root_node:this.currentNode.data.id,
          nodes:[],
          type:this.currentNode.data.type
        }
        this.toNodeInfo(data)
      }else if(actionName=='2'){
        var data = {
          root_node:this.currentNode.data.id,
          nodes:[],
          type:this.currentNode.data.type
        }
        this.toNodeInfo(data)
      }else if(actionName=='3'){
        var data = {
          nodes:[this.currentNode.data.id],
          type:this.currentNode.data.type
        }
        this.toGroupInfo(data)
      }else if(actionName=='5'){
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

<style scoped>

  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
<style lang="scss" scoped>
.c-node-menu-item{
  line-height: 30px;padding-left: 10px;cursor: pointer;color: #444444;font-size: 14px;border-top:#efefef solid 1px;
}
.c-node-menu-item:hover{
  background-color: rgba(66,187,66,0.2);
}
</style>