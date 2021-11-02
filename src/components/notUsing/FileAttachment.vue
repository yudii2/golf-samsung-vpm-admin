<template>
  <div class="sa-object">
    <!-- 파일첨부 활성(Class) : co-active -->
    <div class="component-file" :class="{ 'co-active': computedFiles.length }">
      <div class="co-header">
        <div class="co-h-body">
          <div class="co-h-b-body">
            <input
              type="file"
              accept=".jpg, .jpeg, .gif, .png, .bmp, .doc, .docx, .hwp, .xls, .xlsx, .zip, .pdf, .ppt, .pptx"
              :ref="refs"
              @change="validateFile"
            />
            <button>
              <div class="co-item">파일첨부</div>
            </button>
          </div>
        </div>
        <div class="co-h-footer">
          <ul class="co-h-f-body">
            <li>
              <div class="co-item">
                @px × @px로 한개의 파일만 업로드 하세요.
              </div>
            </li>
            <li>
              <div class="co-item">
                jpg, jpeg, gif, png, bmp, doc, docx, hwp, xls, xlsx, zip, pdf,
                ppt, pptx 형식만 지원, 5MB 까지 업로드 가능합니다.
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="co-body">
        <div class="co-b-body">
          <ul class="co-b-b-body">
            <li v-for="(file, i) in computedFiles" :key="file.name">
              <div class="co-b-b-b-header">
                <button @click="removeFile(i)">
                  <div class="co-item">삭제</div>
                </button>
              </div>
              <div class="co-b-b-b-body">
                <button
                  v-if="checkInstanceofFile(file)"
                  @click="downloadFile(file)"
                >
                  <div class="co-item">
                    {{ file.name }}
                  </div>
                </button>
                <button v-else>
                  <a :href="file.path" download>
                    <div class="co-item">
                      {{ file.name }}
                    </div>
                  </a>
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FileSaver from "file-saver";
import modalMixin from "../mixin/modalMixin";

export default {
  name: "FileAttachment",
  mixins: [modalMixin],
  props: {
    value: {
      type: Object,
      default: () => {},
    },
    refs: {
      type: String,
      default: "datePicker",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    max: {
      type: Number,
      default: 5,
    },
    maxFileSize: {
      type: Number,
      default: 5,
    },
  },
  data() {
    return {
      fileValue: [],
      defaultFileValue: this.value?.defaultFileValue || [],
      deletedFileValue: [],
    };
  },
  methods: {
    validateFile() {
      const file = this.getFile();
      if (file) {
        this.fileValue.push(file);
      }
      this.emitData();
    },
    getFile() {
      const [file] = [...this.$refs[this.refs].files];
      const acceptTypes = [
        "jpg",
        "jpeg",
        "gif",
        "png",
        "bmp",
        "doc",
        "docx",
        "hwp",
        "xls",
        "xlsx",
        "zip",
        "pdf",
        "ppt",
        "pptx",
      ];
      try {
        if (!file?.name) {
          this.openAlertModal("파일을 선택해 주세요.");
          return null;
        }
        let fileType = file.name.split(".");
        fileType = fileType[fileType.length - 1];
        if (!acceptTypes.find((type) => type === fileType)) {
          this.openAlertModal("파일확장자를 확인해 주세요.");
          return null;
        }
        if (File.size > this.maxFileSize * 1048576) {
          this.openAlertModal(
            `${this.maxFileSize}MB 미만의 파일만 등록 가능합니다.`
          );
          return null;
        }
        if (this.computedFiles.length >= this.max) {
          this.openAlertModal(
            `최대 등록 가능한 파일 개수는 ${this.max}개 입니다.`
          );
          return null;
        }
        return file;
      } finally {
        this.$refs[this.refs].value = "";
      }
    },
    checkInstanceofFile(file) {
      return file instanceof File;
    },
    emitData() {
      this.$emit("input", {
        fileValue: this.fileValue,
        defaultFileValue: this.defaultFileValue,
        deletedFileValue: this.deletedFileValue,
      });
    },
    downloadFile(file) {
      const fileBlob = new Blob([file], { type: file.type });
      FileSaver.saveAs(fileBlob, file.name);
    },
    async removeFile(i) {
      if (!(await this.openConfirmModal("파일을 삭제 하시겠습니까?"))) {
        return;
      }
      const [file] = this.computedFiles.splice(i, 1);
      if (this.checkInstanceofFile(file)) {
        this.fileValue.splice(this.fileValue.indexOf(file), 1);
      } else {
        this.defaultFileValue.splice(this.defaultFileValue.indexOf(file), 1);
        this.deletedFileValue.push(file.id);
      }
      this.emitData();
    },
  },
  computed: {
    computedFiles() {
      return this.defaultFileValue.concat(this.fileValue);
    },
  },
};
</script>
