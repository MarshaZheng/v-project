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
              <el-option label="医生" value="PHYSICIAN_ID" />
              <el-option label="科室" value="DEPT_ID" />
              <el-option label="医院" value="HOSPITAL_ID" />
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
    <div class="crumbs" v-if="this.nodeData!==null||this.type!=='DEPT_ID'">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>
                <font color='#409EFF'>节点属性信息</font>
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div><br/>
    <el-table :data="nodeData" v-if="this.form.type=='PATIENT_ID'&&this.nodeData!==null" border class="table" ref="multipleTable" header-cell-class-name="table-header">
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
    <el-table :data="nodeData" v-if="this.form.type=='HOSPITAL_ID'&&this.nodeData!==null" border class="table" ref="multipleTable" header-cell-class-name="table-header">
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
      <el-table-column align="center" label="级别">
        <template slot-scope="scope">
          {{ scope.row.p_level }}
        </template>
      </el-table-column>
       <el-table-column align="center" label="所属地区">
        <template slot-scope="scope">
          {{ scope.row.area_id}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="标志">
        <template slot-scope="scope">
          {{ scope.row.flag }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="装载时间">
        <template slot-scope="scope">
          {{ scope.row.load_date }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="定点基层类型">
        <template slot-scope="scope">
          {{ scope.row.h_type }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="收费类别">
        <template slot-scope="scope">
          {{ scope.row.charge_type }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="经度">
        <template slot-scope="scope">
          {{ scope.row.longitude }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="纬度">
        <template slot-scope="scope">
          {{ scope.row.latitude }}
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
    </el-table>
    <div class="handle-box" v-if="this.record!=null">
      <el-form :inline="true"  class="demo-form-inline">
      <el-form-item>&ensp;</el-form-item>
        <el-form ref="form" :model="algorithmForm">
          <el-form-item label="关联探索对象类型">
            <el-select v-model="algorithmForm.type" placeholder="please select">
              <el-option label="病人" value="PATIENT_ID" />
              <el-option label="医生" value="PHYSICIAN_ID" />
            </el-select>
          </el-form-item>
          <el-form-item label="运行算法">
            <el-select v-model="algorithmForm.algorithm" placeholder="please select">
              <el-option label="节点相似性算法" value="1" />
              <el-option label="社区发现算法" value="2" />
              <el-option label="关联路径算法" value="3" />
            </el-select>
          </el-form-item>
          <el-form-item label="主节点id">
            <el-input v-model="algorithmForm.node_id" :disabled="algorithmForm.algorithm!=='1'" />
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="runAlgorithm" >运行算法</el-button>
          </el-form-item>
          
        </el-form>
        </el-form>
     </div><br/>
  <div class="crumbs" v-if="this.graph_data!==null">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>
                <font color='#409EFF'>可视化视图</font>
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div><br/>
    <template v-if="this.graph_data!==null">
          <div>
          
            <el-row type="flex" class="row-bg" justify="end">
              <el-col :span=18> 
              <template>
                <div>
                
                  <div ref="myPage" style="height:calc(100vh - 50px);" @click="isShowNodeMenuPanel = false">
                  
                      <SeeksRelationGraph ref="seeksRelationGraph" :options="graphOptions" :on-node-click="onNodeClick" :on-line-click="onLineClick" >    
                      <div slot="node" slot-scope="{node}">
                        <div style="margin:auto;font-size: 20px;padding-top: 30%;" @click="onNodeClick(node, $event)" @contextmenu.prevent.stop="showNodeMenus(node, $event)">
                        {{node.text}}
                        </div>
                      </div>
                      
                      </SeeksRelationGraph>
                <div class="ooc" v-if="this.isCircleVisible===true" :style="{left: CirclePosition.x + 'px', top: CirclePosition.y + 'px' }">
                          <p1 @click="toExpandNode('PATIENT_ID')"><font size='2px'>患者</font></p1>
                          <p2 @click="toExpandNode('PHYSICIAN_ID')"><font size='2px'>医生</font></p2>
                          <p3 @click="toExpandNode('HOSPITAL_ID')"><font size='2px'>医院</font></p3>
                          <p4 @click="toExpandNode('DEPT_ID')"><font size='2px'>科室</font></p4>
                        </div>
                  </div> 
                  <div v-show="isShowNodeMenuPanel" :style="{left: nodeMenuPanelPosition.x + 'px', top: nodeMenuPanelPosition.y + 'px' }" style="z-index: 999;padding:10px;background-color: #ffffff;border:#eeeeee solid 1px;box-shadow: 0px 0px 8px #cccccc;position: absolute;">
                    <div style="line-height: 25px;padding-left: 10px;color: #888888;font-size: 12px;">对这个节点进行操作：</div>
                    <div class="c-node-menu-item" @click.stop="doAction('1')">查看信息</div>
                    <div class="c-node-menu-item" @click.stop="doAction('2')">节点相似性探索</div>
                    <div class="c-node-menu-item" @click.stop="doAction('3')">社区发现探索</div>
                    <div class="c-node-menu-item"  @click="dialogVisible1 = true">关联路径探索</div>
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
                    <el-button type="danger"  circle>入参节点</el-button>
                  </el-row>
              </template>
              </el-col>
              <el-col :span="6" :model="infoNodeData" >
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
  </div>
</template>

<script>
import {fetchData,expandNode} from '@/api/backend'

import SeeksRelationGraph from 'relation-graph'


export default {
  name: 'Demo',
  components: { SeeksRelationGraph },
  data() {
    return {
      isCircleVisible:false,
      pathnode2:'',
      dialogVisible1: false,
      dialogVisible2: false,
      isShowCodePanel: false,
      isShowNodeMenuPanel: false,
      nodeMenuPanelPosition: { x: 0, y: 0 },
      CirclePosition:{x:0,y:0},
      activeName: 'first',
      currentNode: null,
      form: {
        type: '',
        id: '',
        name:'',
      },
      nodeData:null,
      record:null,
      recordResult:[],
      expandForm:{
        id:'',
        type:'',
        expand_type:''
      },
      filterForm:{
        TIME:'',
        HOSPITAL_ID:'',
        PHYSICIAN_ID:'',
        PATIENT_ID:'',
        DEPT_ID:''
      },
      algorithmForm:{
        multipleSelection: [],
        type:'',
        algorithm:'',
        node_id:''
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
    this.getParams()
  },
  watch:{
    '$route': 'getParams',
    filterForm:{
      handler(val, oldVal){
        if(val){
        // 如果筛选条件全为空，查全部；否则按条件筛选
          var objIsEmpty =  this.filterForm.PHYSICIAN_ID == '' && this.filterForm.HOSPITAL_ID == '' && this.filterForm.PATIENT_ID == '' && this.filterForm.DEPT_ID == ''
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
              console.log(key,'输出key',this.filterForm[key])
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
     
   },
  methods: { 
    toExpandNode(expand_type){
      this.isCircleVisible = false
       console.log('toExpandNode')
      this.expandForm.expand_type = expand_type
      this.expandNode()
    },
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
    handleSelectionChange(val) {
        this.algorithmForm.multipleSelection = val
        console.log('algorithm form:',this.algorithmForm)
      },
    onSubmit() {
        // if(this.form.type=='PATIENT_ID'){
        //    getPatientList(this.form).then((response)=>{
        //         console.info('response.data',response.data)
        //         this.nodeData = response.data.data.nodeData
        //         this.record = response.data.data.recordData
        //         this.recordResult = this.record
        //         this.graph_data = response.data.data.graphData
        //         console.log('nodedata',this.nodeData)
        //         console.log('graphdata',this.graph_data)
        //         this.showSeeksGraph()
        //     },(response)=>{
        //         this.nodeData =null
        //         this.record=null
        //         this.recordResult=null
        //         console.error(response)
        //     });
        // }else if(this.form.type=='PHYSICIAN_ID'){
        //    getPhysicianList(this.form).then((response)=>{
        //         console.info('response.data',response.data)
        //         this.nodeData = response.data.data.nodeData
        //         this.record = response.data.data.recordData
        //         this.recordResult=this.record
        //         console.log('nodedata',this.nodeData)
        //     },(response)=>{
        //         this.nodeData =null
        //         this.record =null
        //         this.recordResult=null
        //         console.error(response)
        //     });
        // }else if(this.form.type=='HOSPITAL_ID'){
        //    getHospitalList(this.form).then((response)=>{
        //         console.info('response.data',response.data)
        //         this.nodeData = response.data.data.nodeData
        //         this.record = response.data.data.recordData
        //         this.recordResult=this.record
        //         console.log('nodedata',this.nodeData)
        //     },(response)=>{
        //         this.nodeData =null
        //         this.record =null
        //         this.recordResult=null
        //         console.error(response)
        //     });
        // }else{
        //     getDeptList(this.form).then((response)=>{
        //         console.info('response.data',response.data)
        //         this.record = response.data.data.recordData
        //         this.recordResult=this.record
        //     },(response)=>{
        //         this.nodeData =null
        //         this.record =null
        //         console.error(response)
        //     });
        // }
        
        fetchData(this.form).then((response)=>{
              console.info('response.data',response.data)
              this.nodeData = response.data.data.nodeData
              this.record = response.data.data.recordData
              this.recordResult = this.record
              this.graph_data = response.data.data.graphData
              console.log('nodedata',this.nodeData)
              console.log('graphdata',this.graph_data)
              this.showSeeksGraph()
          },(response)=>{
              this.nodeData =null
              this.record=null
              this.recordResult=null
              console.error(response)
          })
    },

    clearData(){
        this.nodeData = null
        this.record = null
        this.recordResult = []
        this.form.id = ''
        this.form.type = ''
        this.form.name = ''
        this.infoNodeData = Object.assign({},this.nullNodeData)
        this.graph_data=null
        
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
            var data = {root_node:this.algorithmForm.node_id,
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
            name: ''
          }
        })
    },
    showSeeksGraph(query) {
       var __graph_json_data = this.graph_data
       // 以上数据中的node和link可以参考"Node节点"和"Link关系"中的参数进行配置 
       this.$refs.seeksRelationGraph.setJsonData(__graph_json_data, (seeksRGGraph) => {
         // Called when the relation-graph is completed 
         console.log('showseeksgraph这里')
       })
     },
     onNodeClick(nodeObject, $event) {
       if ($event.button == 0){
       console.log('onNodeClick:', nodeObject)
       this.currentNode = nodeObject
       
       var _base_position = this.$refs.myPage.getBoundingClientRect()
       console.log('base_posision',_base_position)
       console.log('node position',nodeObject.x,nodeObject.y)
       console.log('event.client.XY',$event.clientX,$event.clientY)
       this.CirclePosition.x = nodeObject.x-27
       this.CirclePosition.y = nodeObject.y-16
       console.log('circlePosition',this.CirclePosition.x,this.CirclePosition.y)
       this.isCircleVisible = !this.isCircleVisible
      // this.isCircleVisible = true
       fetchData({id:nodeObject.data.id,type:nodeObject.data.type}).then((response)=>{
                // console.info('response.data',response.data)
                this.infoNodeData = response.data.data.nodeData[0]
                this.infoNodeData.type = nodeObject.data.type
                // console.log('info_nodedata',this.infoNodeData)
       },(response)=>{
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
        console.log('nodeMenus,x,y',this.nodeMenuPanelPosition.x,this.nodeMenuPanelPosition.y)
      
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
      this.isShowNodeMenuPanel = false
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

<style>
.ooc{
    height:140px;
    width:140px;
    position:absolute;
    border-radius: 50%;
    background: none;
    border:30px solid;
    border-color: rgb(236, 236, 236) rgb(221, 221, 221);
    margin:5px;
}
.ooc p1{
    left:-30px;
    top:25px;
    z-index:999;
    position:absolute;
    height:34px;
    width:34px;
    border-radius: 50%;
    background: transparent;;
    margin:3px;
}
.ooc p2{
    left:80px;
    top:25px;
    z-index:999;
    position:absolute;
    height:35px;
    width:35px;
    border-radius: 50%;
    background: transparent;
    margin:3px;
}
.ooc p3{
    top:80px;
    left:20px;
    z-index:999;
    position:absolute;
    height:34px;
    width:34px;
    border-radius: 50%;
    background: transparent;
    margin:3px;
}
.ooc p4{
    top:-25px;
    left:20px;
    z-index:999;
    position:absolute;
    height:34px;
    width:34px;
    border-radius: 50%;
    background: transparent;
    margin:3px;
}
</style>