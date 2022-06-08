<template>
  <!-- 公共-el-table && el-pagination 封装组件 -->
  <div>
    <!-- 表格部分 -->
    <el-table :data="tableData" stripe border :default-sort="{prop: 'date', order: 'descending'}">
      <!-- 表格业务内容列 -->
      <template v-for="(item, index) in tableOption">
        <el-table-column
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :align="item.align || 'center'"
          :show-overflow-tooltip="item.overHidden || false"
          :min-width="item.width || '100px'"
          :fixed="item.fixed || true"
          :sortable="item.sortable || false"
          :type="item.type || 'normal'">
            <template slot-scope="scope">
              <!-- 如果slotHidden为false的时候 正常显示 -->
              <template v-if="!item.slotHidden">
                <span>{{scope.row[item.prop]}}</span>
              </template>
              <!-- 如果hidden为true的时候 显示插槽 -->
              <template v-else>
                  <!-- 使用slot的情况下 -->
                  <slot v-if="item.slot" :name="item.slot" :scope="scope"></slot>
              </template>
            </template>
          </el-table-column>
        <!-- <el-table-column
          :key="index" //  -- for循环的唯一标识
          :prop="item.prop"   //  -- 对象中的键名
          :label="item.label" //  -- 表格的列名
          :align="item.align || 'center'" //  -- 对齐方式，默认居中
          :show-overflow-tooltip="item.overHidden || false" //  -- 过长时是否显示提示，默认不显示
          :min-width="item.width || '100px'"  //  -- 最小宽度
          :fixed="item.fixed || true" //  -- 是否固定列
          :sortable="item.sortable || false"  //  -- 是否支持排序
          :type="item.type || 'normal'" //  -- 列的类型，是索引列 | 多选列 | 扩展列
        ></el-table-column> -->
      </template>
      <!-- 表格操作列 -->
      <el-table-column label="操作" v-if="tableConfig.isOperate" min-width="150px" align='center'>
        <template slot-scope="scope">
          <slot name="operate" :row="scope.row"></slot>
        </template>
      </el-table-column>
    </el-table>

    
    <!-- 分页部分 -->
    <div class="pagination" v-if="tableConfig.displayPaging">
      <el-pagination
          :layout="tableConfig.paginations.layout"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="tableConfig.paginations.pageIndex"
          :page-sizes="tableConfig.paginations.pageSizes"
          :page-size="tableConfig.paginations.pageSize"
          :total="tableConfig.paginations.total"
          background
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name:'publicPaginationTable',
  data() {
    return {};
  },
  // 父组件向子组件传值
  props: {
    // 列表配置
    // tableConfig:{
    //     displayPaging: true, // 控制是否展示分页
    //     isOperate:false,// 控制操作列是否显示
    //     // 分页信息
    //     paginations: {
    //         total: 0,        // 总数
    //         pageIndex: 1,  // 当前位于哪页
    //         pageSize: 20,   // 1页显示多少条
    //         pageSizes: [5, 10, 15, 20],  //每页显示多少条
    //         layout: "total, sizes, prev, pager, next, jumper"   // 翻页属性
    //     },
    // }
    tableConfig:{
      type:Object,
      default:{},
      required:false
    },
    // 表格显示的数据
    tableData: {
      type: Array,
      default: []
    },
    // 表格的操作
    tableOption: {
      type: Array,
      default: []
      
    },
  },
  methods: {
    // 页码
    handleCurrentChange(currentPage) {
        this.$emit('handleChange', this.tableConfig.paginations.pageSize, currentPage)
    },
    // 页数
    handleSizeChange(pageSize) {
        this.$emit('handleChange', pageSize, this.tableConfig.paginations.pageIndex)
    },
  }
};
</script>

<style scoped>
.pagination{
    text-align: center;
    margin-top:20px;
    margin-bottom: 60px;
    display: flex;
    justify-content: flex-end;
}
</style>
