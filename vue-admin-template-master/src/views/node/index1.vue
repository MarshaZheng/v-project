<template>
  <div>
    <!--width,height 画布的宽度，高度。 可以是百分比或像素，一般在dom元素上设置 -->
    <div id="network_id" class="network" style="height:80vh"></div>
    <!-- 节点周围的圆环选项配置 -->
    <div id="circle-option" class="circle-option">
      <span @click.stop="editNode">
        <i class="el-icon-edit"></i>
      </span>
      <span @click.stop="deleteNode">
        <i class="el-icon-delete"></i>
      </span>
      <span>
        <i class="el-icon-help"></i>
      </span>
      <span>
        <i class="el-icon-close"></i>
      </span>
    </div>
    <!-- 编辑节点对话框 -->
    <el-dialog title="编辑节点" :visible.sync="dialogVisible" width="400px">
      <el-form ref="nodeForm" :model="nodeForm" size="small" label-width="60px">
        <el-form-item prop="label" label="名称">
          <el-input v-model="nodeForm.label"></el-input>
        </el-form-item>
        <el-form-item prop="id" label="id">
          <el-input v-model="nodeForm.id" readonly></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/javascript" src="https://unpkg.com/vis-network/standalone/umd/vis-network.min.js"></script>
<script>
import Vis from "vis";
export default {
  data() {
    return {
      dialogVisible: false,
      nodes: [],
      edges: [],
      // network:null,
      container: null,
      //   节点数组
      nodesArray: [
        {
          id: 0,
          label: "大前端",
          color: { background: "#fd91b7" },
        },
        {
          id: 1,
          label: "HTML",
          color: { background: "#7ed6df" },
        },
        {
          id: 2,
          label: "JavaScript",
          color: { background: "#d294e2" },
        },
        {
          id: 3,
          label: "CSS",
          color: { background: "#ffb300" },
        },
      ],
      //   关系线数组
      edgesArray: [
        { id: "e1", from: 0, to: 1, label: "ddd" },
        { id: "e2", from: 1, to: 0, label: "aaa" },
        { id: "e3", from: 0, to: 2, label: "step1" },
        { id: "e4", from: 0, to: 3, label: "step1" },
      ],
      options: {},
      data: {},
      selectedId: null,
      nodeForm: {},
    };
  },
  mounted() {
    // 初始化
    this.init();
  },
  methods: {
    //编辑节点
    editNode() {
      this.dialogVisible = true;
      // 此处向后台请求回显数据
      this.nodeForm = this.nodesArray.filter((item) => {
        return item.id == this.selectedId;
      })[0];
    },
    // 提交编辑节点
    submit() {
      this.dialogVisible = false;
      this.hideCircle();
      this.init();
    },
    // 删除节点
    deleteNode() {
      this.$confirm("此操作将永久删除该节点, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 删除节点，向后台发送删除请求，参数id:this.selectedId
          this.network.deleteSelected();
          this.hideCircle();
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch((e) => {
          console.log(e);
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
 
    //初始化图谱参数配置
    init() {
      //1.创建一个nodes数组
      this.nodes = new Vis.DataSet(this.nodesArray);
      //2.创建一个edges数组
      this.edges = new Vis.DataSet(this.edgesArray);
      this.container = document.getElementById("network_id");
      this.data = {
        nodes: this.nodes,
        edges: this.edges,
      };
      this.options = {
        autoResize: true, //网络将自动检测其容器的大小调整，并相应地重绘自身
        locale: "cn", //语言设置：工具栏显示中文
        //设置语言
        locales: {
          cn: {
            //工具栏中文翻译
            edit: "编辑",
            del: "删除当前节点或关系",
            back: "返回",
            addNode: "添加节点",
            addEdge: "添加连线",
            editNode: "编辑节点",
            editEdge: "编辑连线",
            addDescription: "点击空白处可添加节点",
            edgeDescription: "点击某个节点拖拽连线可连接另一个节点",
            editEdgeDescription: "可拖拽连线改变关系",
            createEdgeError: "无法将边连接到集群",
            deleteClusterError: "无法删除集群.",
            editClusterError: "无法编辑群集'",
          },
        },
        // 设置节点样式
        nodes: {
          shape: "dot", //节点的外观。为circle时label显示在节点内，为dot时label显示在节点下方
          size: 30, //节点的大小，
          shadow: false, //如果为true，则节点使用默认设置投射阴影。
          font: {
            //字体配置
            size: 20,
            color: "rgb(117, 218, 167)",
            align: "center",
          },
          color: {
            border: "transparent", //节点边框颜色
            background: "#ffc7c7", //节点背景颜色
            highlight: {
              //节点选中时状态颜色
              border: "rgb(117, 218, 167)",
              background: "rgb(117, 218, 167)",
            },
            hover: {
              //节点鼠标滑过时状态颜色
              border: "#dff9fb",
              background: "#88dab1",
            },
          },
          margin: 5, //当形状设置为box、circle、database、icon、text；label的边距
          widthConstraint: 100, //设置数字，将节点的最小和最大宽度设为该值,当值设为很小的时候，label会换行，节点会保持一个最小值，里边的内容会换行
          borderWidth: 1, //节点边框宽度，单位为px
          borderWidthSelected: 3, //节点被选中时边框的宽度，单位为px
          labelHighlightBold: false, //确定选择节点时标签是否变为粗体
        },
        // 边线配置
        edges: {
          width: 1,
          length: 200,
          color: {
            color: "#848499",
            highlight: "rgb(117, 218, 167)",
            hover: "#88dab1",
            inherit: "from",
            opacity: 1.0,
          },
          font: {
            color: "#343434",
            size: 18, // px
            face: "arial",
            background: "none",
            strokeWidth: 2, // px
            strokeColor: "#ffffff",
            align: "horizontal",
            multi: false,
            vadjust: 0,
            bold: {
              color: "#343434",
              size: 14, // px
              face: "arial",
              vadjust: 0,
              mod: "bold",
            },
            ital: {
              color: "#343434",
              size: 14, // px
              face: "arial",
              vadjust: 0,
              mod: "italic",
            },
            boldital: {
              color: "#343434",
              size: 14, // px
              face: "arial",
              vadjust: 0,
              mod: "bold italic",
            },
            mono: {
              color: "#343434",
              size: 15, // px
              face: "courier new",
              vadjust: 2,
              mod: "",
            },
          },
          shadow: false,
          smooth: {
            //设置两个节点之前的连线的状态
            enabled: true, //默认是true，设置为false之后，两个节点之前的连线始终为直线，不会出现贝塞尔曲线
          },
          arrows: { to: true }, //箭头指向to
        },
        // 布局
        layout: {
          randomSeed: 1, //配置每次生成的节点位置都一样，参数为数字1、2等
          // hierarchical: {
          // direction: "LR", //UD:上下 DU:下上 LR:左右 RL:右左
          // sortMethod: "directed",
          // }, //层级结构显示}
        },
        //计算节点之前斥力，进行自动排列的属性
        physics: {
          enabled: true, //默认是true，设置为false后，节点将不会自动改变，拖动谁谁动。不影响其他的节点
          barnesHut: {
            gravitationalConstant: -4000,
            centralGravity: 0.3,
            springLength: 120,
            springConstant: 0.04,
            damping: 0.09,
            avoidOverlap: 0,
          },
        },
        //用于所有用户与网络的交互。处理鼠标和触摸事件以及导航按钮和弹出窗口
        interaction: {
          hover: true,
          dragNodes: true, //是否能拖动节点
          dragView: true, //是否能拖动画布
          hover: true, //鼠标移过后加粗该节点和连接线
          multiselect: true, //按 ctrl 多选
          selectable: true, //是否可以点击选择
          selectConnectedEdges: true, //选择节点后是否显示连接线
          hoverConnectedEdges: true, //鼠标滑动节点后是否显示连接线
          zoomView: true, //是否能缩放画布
        },
        //操作模块:包括 添加、删除、获取选中点、设置选中点、拖拽系列、点击等等
        manipulation: {
          enabled: true, //该属性表示可以编辑，出现编辑操作按钮
          addNode: true,
          addEdge: true,
          // editNode: undefined,
          editEdge: true,
          deleteNode: true,
          deleteEdge: true,
        },
      };
      this.network = new Vis.Network(this.container, this.data, this.options);
      // 点击鼠标事件
      this.network.on("click", (e) => {
        this.selectedId = e.nodes[0];
        if (e.nodes.length) {
          let p = this.network.getPositions(e.nodes[0]);
          let nodeId = e.nodes[0];
          console.log(p[nodeId]);
          // 获取缩放尺寸
          let scale = this.network.getScale();
          // canvas->dom 坐标转化
          let domPosi = this.network.canvasToDOM({
            x: p[nodeId]["x"],
            y: p[nodeId]["y"],
          });
          console.log("domPosi ", domPosi["x"], domPosi["y"]);
          // 设置环形位置;
          this.setCirclePostion(
            domPosi["x"] - 42,
            domPosi["y"] + 10,
            scale + 0.4
          );
        } else {
          this.hideCircle();
        }
      });
      //  鼠标拖动开始事件
      this.network.on("dragStart", (e) => {
        this.hideCircle();
      });
      //  鼠标控制节点拖动中事件
      this.network.on("controlNodeDragging", (e) => {
        this.hideCircle();
      });
      //  鼠标缩放事件
      this.network.on("zoom", (e) => {
        this.hideCircle();
      });
    },
    //  设置环形位置
    setCirclePostion(x, y, scale) {
      let circle = document.getElementById("circle-option");
      circle.style = `left: ${x}px; top: ${y}px;transform:scale(${scale});display:block;`;
    },
    // 隐藏圆环选项
    hideCircle() {
      let circle = document.getElementById("circle-option");
      circle.style = `display:none;`;
    },
  },
};
</script>
<style lang="less">
.circle-option {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100px;
  height: 100px;
  border: 30px solid rgba(200, 200, 200, 0.7);
  border-radius: 50px;
  box-sizing: border-box;
  z-index: 10;
  display: none;
  span {
    position: absolute;
    left: 0;
    right: 0;
    width: 30px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: 10px;
    color: white;
    cursor: pointer;
    &:hover {
      color: #1b68ff;
    }
    &:nth-child(1) {
      left: 5px;
      top: -25px;
    }
 
    &:nth-child(2) {
      left: 37px;
      top: 10px;
    }
 
    &:nth-child(3) {
      left: 5px;
      top: 44px;
    }
 
    &:nth-child(4) {
      left: -27px;
      top: 10px;
    }
  }
}
</style>