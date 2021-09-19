<template>
  <b-container>
    <b-table
      :items="itemsTable"
      :fields="fields"
      class="mt-5 w-100 d-block d-md-table"
      thead-class="bg-dark text-white"
    >
      <template v-if="allowView" #cell(actions)="row">
        <b-button
          class="mx-1"
          variant="primary"
          @click="showItem(row.item)"
        >
          <b-icon class="text-white" icon="eye"></b-icon
        ></b-button>
          <b-icon class="text-white" icon="download"></b-icon
        ></b-button>
      </template>
      <template #cell(birth)="row">
        {{ getFormatedDate(row.item.dob) }}
      </template>
      <template #cell(registered)="row">
        {{ getFormatedDate(row.item.registered) }}
      </template>
    </b-table>
    <div v-if="loading" class="loading-container d-flex justify-content-center">
      <div class="spinner-border text-primary" role="status">
    </div>
    
    </div>
  </b-container>
</template>

<script>
import { UtilsMixin } from "@/mixins/utils.js";
export default {
  emits: ["showItem"],
  name: "Home",
  mixins: [UtilsMixin],
  props: {
    allowExport: {
      type: Boolean,
      default: false
    },
    allowView: {
      type: Boolean,
      default: false
    },
    fields: {
      type: Array,
      required: true
    },
    itemsTable: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    showItem(item) {
      this.$emit("showItem", item);
    }
  }
};
</script>
