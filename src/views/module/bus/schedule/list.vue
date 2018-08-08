<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix ">
        <el-button type="primary"  round @click="add" plain><i class="el-icon-circle-plus"></i>添加新线路</el-button>
      </div>

      
      <el-table :data="dataList" border style="width: 100%"  id='out-table'>
        <el-table-column prop="name" label="班次编号" align="center">
        </el-table-column>
        <el-table-column prop="up_site" label="上车点" align="center">
        </el-table-column>
        <el-table-column prop="down_site" label="下车点" align="center">
        </el-table-column>
        <el-table-column prop="start_site" label="出发点" align="center">
        </el-table-column>
        <el-table-column prop="end_site" label="目的地" align="center">
        </el-table-column>
        <el-table-column prop="price" label="价格" align="center">
        </el-table-column>
        <el-table-column prop="ticket" label="票数" align="center">
        </el-table-column>
        <el-table-column  label="出发时间" align="center">
          <template slot-scope='scope'>
              {{scope.row.start_time|formatT}}
          </template>
        </el-table-column>
        <el-table-column  label="创建时间" align="center">
          <template slot-scope='scope'>
              {{scope.row.meta.createAt|formatT}}
          </template>
        </el-table-column>
        <el-table-column  label="是否双程" align="center">
           <template slot-scope='scope'>
              {{scope.row.is_both?'双程':'单程'}}
          </template>
        </el-table-column>
        <el-table-column prop="back_shcedule_name" label="返程编号" align="center">
        </el-table-column>
      <el-table-column fixed="right" label="操作" align='center' width="200">
        <template slot-scope="scope">
          <el-button @click="editById(scope.row)" type="primary" size="small">
            <i class="el-icon-edit"></i> 编辑</el-button>
          <el-button @click="del(scope.row)" type="danger" size="small"><i class="el-icon-delete"></i> 删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10,20,50]"
          :page-size="10"
          :small='true'
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import FileSaver from "file-saver";
import XLSX from "xlsx";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      dialogVisible: false,
      dimension: ["智力", "协作", "表达", "记忆", "计算"],
      query: {
        limit: 10,
        skip: 0,
        problem: null,
        score: null,
        dimension: null
      }
    };
  },
  created() {
    this.$store.dispatch("fetchSchedule", this.query);
  },
  methods: {
    exportExcel() {
      var wb = XLSX.utils.table_to_book(document.querySelector("#out-table"));
      /* get binary string as output */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], {
            type: "application/octet-stream"
          }),
          "sheetjs.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    handleSizeChange(item) {
      console.log(item);
      this.query.limit = item;
      this.$store.dispatch("fetchSchedule", this.query);
    },
    handleCurrentChange(item) {
      console.log("handleCurrentChange");
      console.log(item);
      this.query.skip = (item - 1) * this.query.limit;
      this.$store.dispatch("fetchSchedule", this.query);
    },
    search() {
      console.log(this.query);
      this.$store.dispatch("fetchSchedule", this.query);
    },
    reset() {
      this.query = {
        limit: 10,
        skip: 0,
        problem: null,
        score: null,
        dimension: null
      };
      this.$store.dispatch("fetchSchedule", this.query);
    },
    statusf(row, col) {
      let types = ["", "线上", "待定"];
      return types[row.status];
    },
    editById(item) {
      let cid = item.id;
      this.$router.push({
        name: 'busScheduleUpdate',
        params:{id:cid}
      });
    },
    del(row) {
      console.log(row);
      this.$confirm("确认删除吗？")
        .then(_ => {
          this.$store
            .dispatch("delSchedule", {
              id: row.id
            })
            .then(data => {
              this.$message.success("删除成功");
              console.log(data);
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(_ => {});
    },
    add() {
      this.$router.push({
        name: "busScheduleAdd"
      });
    }
  },
  computed: {
    ...mapGetters({
      dataList: "schedules",
      total: "schedulesTotal"
    })
  }
};
</script>
<style scoped lang='scss'>
.pr {
  float: right;
  margin-bottom: 20px;
}
.row-bg {
  margin-top: 20px;
  text-align: center;
}
.el-pagination {
  margin-top: 40px;
  text-align: center;
}
</style>

