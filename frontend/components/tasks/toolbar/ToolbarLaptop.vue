<template>
  <v-toolbar class="toolbar-control" dense flat>
    <v-row no-gutters>
      <v-btn-toggle>
        <button-review
          v-if="showApproveButton"
          :is-reviewd="isReviewd"
          @click:review="$emit('click:review')"
        />

        <button-filter :value="filterOption" @click:filter="changeFilter" />

        <button-guideline @click:guideline="dialogGuideline = true" />
        <v-dialog v-model="dialogGuideline">
          <form-guideline
            :guideline-text="guidelineText"
            @click:close="dialogGuideline = false"
          />
        </v-dialog>

        <button-comment @click:comment="dialogComment = true" />
        <v-dialog v-model="dialogComment">
          <form-comment :doc-id="docId" @click:cancel="dialogComment = false" />
        </v-dialog>

        <button-auto-labeling @click:auto="dialogAutoLabeling = true" />
        <v-dialog v-model="dialogAutoLabeling">
          <form-auto-labeling
            :is-enabled="enableAutoLabeling"
            :error-message="errorMessage"
            @click:cancel="dialogAutoLabeling = false"
            @input="updateAutoLabeling"
          />
        </v-dialog>

        <button-clear @click:clear="dialogClear = true" />
        <v-dialog v-model="dialogClear">
          <form-clear-label
            @click:ok="
              $emit('click:clear-label');
              dialogClear = false;
            "
            @click:cancel="dialogClear = false"
          />
        </v-dialog>
      </v-btn-toggle>
      <slot />
      <v-spacer />
      <button-pagination
        :value="page"
        :total="total"
        @click:prev="updatePage(page - 1)"
        @click:next="updatePage(page + 1)"
        @click:first="updatePage(1)"
        @click:last="updatePage(total)"
        @click:jump="updatePage($event)"
      />
    </v-row>
  </v-toolbar>
</template>

<script lang="ts">
import Vue from "vue";
import ButtonAutoLabeling from "./buttons/ButtonAutoLabeling.vue";
import ButtonClear from "./buttons/ButtonClear.vue";
import ButtonComment from "./buttons/ButtonComment.vue";
import ButtonFilter from "./buttons/ButtonFilter.vue";
import ButtonGuideline from "./buttons/ButtonGuideline.vue";
import ButtonPagination from "./buttons/ButtonPagination.vue";
import ButtonReview from "./buttons/ButtonReview.vue";
import FormAutoLabeling from "./forms/FormAutoLabeling.vue";
import FormClearLabel from "./forms/FormClearLabel.vue";
import FormComment from "./forms/FormComment.vue";
import FormGuideline from "./forms/FormGuideline.vue";

export default Vue.extend({
  components: {
    ButtonAutoLabeling,
    ButtonClear,
    ButtonComment,
    ButtonFilter,
    ButtonGuideline,
    ButtonPagination,
    ButtonReview,
    FormAutoLabeling,
    FormClearLabel,
    FormComment,
    FormGuideline,
  },

  props: {
    docId: {
      type: Number,
      required: true,
    },
    enableAutoLabeling: {
      type: Boolean,
      default: false,
      required: true,
    },
    guidelineText: {
      type: String,
      default: "",
      required: true,
    },
    isReviewd: {
      type: Boolean,
      default: false,
    },
    showApproveButton: {
      type: Boolean,
      default: false,
      required: true,
    },
    total: {
      type: Number,
      default: 1,
    },
  },

  data() {
    return {
      dialogAutoLabeling: false,
      dialogClear: false,
      dialogComment: false,
      dialogGuideline: false,
      errorMessage: "",
    };
  },

  computed: {
    page(): number {
      // @ts-ignore
      return parseInt(this.$route.query.page, 10);
    },
    filterOption(): string {
      // @ts-ignore
      return this.$route.query.filter;
    },
  },

  methods: {
    updatePage(page: number) {
      this.$router.push({
        query: {
          page: page.toString(),
          filter: this.filterOption,
          q: this.$route.query.q,
        },
      });
    },

    changeFilter(filter: string) {
      this.$router.push({
        query: {
          page: "1",
          filter,
          q: this.$route.query.q,
        },
      });
    },

    updateAutoLabeling(isEnable: boolean) {
      if (isEnable) {
        this.$emit("update:enable-auto-labeling", true);
      } else {
        this.$emit("update:enable-auto-labeling", false);
      }
    },
  },
});
</script>

<style scoped>
.toolbar-control >>> .v-toolbar__content {
  padding: 0px !important;
}

::v-deep .v-dialog {
  width: 800px;
}
</style>