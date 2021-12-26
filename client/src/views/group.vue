<template>

  <div class="app-container">
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>
                <font color='#409EFF'>社区发现探索结果</font>
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <el-table :data="groupData" v-if="this.groupData!==null" border class="table" ref="multipleTable" header-cell-class-name="table-header">
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
          {{ scope.row.sci_card_no }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="社保识别码">
        <template slot-scope="scope">
          {{ scope.row.sci_card_identified }}
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
      <el-table-column align="center" label="社区归属">
        <template slot-scope="scope">
          {{ scope.row.group_id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="toInfo(scope.row)" >查看</el-button>
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
      groupData:null
    }
  },
  created(){
    this.fetchData()
  },
  methods: { 
    fetchData() {
        var url='/api/patient/fetchData'
        console.log('fetchData')
        this.$http.post(url,{id:'',type:'',name:''}).then((response)=>{
            console.info('response.body',response.body)
            this.groupData = response.body.data.nodeData
            console.log('groupData',this.nodeData)
        },(response)=>{
            this.nodeData =null
            console.error(response)
        });
      
    },

    toInfo(nodeData){
      console.log('toInfo', nodeData)
        this.$router.push({
          path: '/info',
          query: {
            id: nodeData.id,
            type: 'PATIENT_ID',
            name: nodeData.name
          }
        })
    },
  }
}
</script>

