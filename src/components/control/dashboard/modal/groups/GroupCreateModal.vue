<template>
  <transition name="fade" appear>
    <div class="backdrop" @click.self="closeModal">
      <div class="group-create-modal__container">
        <!-- 닫기 버튼 -->
        <CloseButton @onClose="closeModal" />

        <!-- 헤더 -->
        <header>
          <h2>단체 생성</h2>
        </header>

        <!-- 바디 -->
        <section class="mt">
          <form @submit.prevent="handleCreateSubmit">
            <InputWithLabel
              inputType="text"
              labelText="단체 이름"
              :isFocus="true"
              v-model="groupName"
            />
            <span class="error">{{ error }}</span>

            <SimpleButton class="mt" buttonText="생성하기" />
          </form>
        </section>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapActions } from "vuex";
import InputWithLabel from "@/components/shared/InputWithLabel.vue";
import CloseButton from "@/components/shared/CloseButton.vue";
import SimpleButton from "@/components/shared/SimpleButton.vue";
import useGroup from "@/api/v1/monitor/useGroup";

// hooks.
const { createGroup, getGroups } = useGroup();

export default {
  name: "GroupCreateModal",

  components: {
    InputWithLabel,
    CloseButton,
    SimpleButton,
  },

  data() {
    return {
      groupName: "",
      loading: false,
      error: "",
    };
  },

  methods: {
    closeModal() {
      this.setIsShowingGroupCreateModal(false);
    },

    async handleCreateSubmit() {
      this.error = "";
      const cleanedGroupName = this.groupName.trim();

      if (cleanedGroupName.length === 0) {
        this.groupName = "";
        this.error = "공백없이 단체명을 입력해주세요.";
      } else {
        this.loading = true;

        const { status } = await createGroup(cleanedGroupName);
        if (status && status === "OK") {
          // 단체 생성 성공 메시지 띄움.
          this.toast({
            title: "단체 생성",
            message: "성공적으로 단체를 생성했습니다.",
          });

          // 화면 단체 새로고침.
          getGroups();

          // 모달 끔.
          this.closeModal();
        }

        this.groupName = "";
        this.loading = false;
      }
    },

    ...mapActions({
      setIsShowingGroupCreateModal: "updateIsShowingGroupCreateModal",
      toast: "toast",
    }),
  },

  watch: {
    groupName(groupName) {
      if (groupName.length > 0) {
        this.error = "";
      }
    },
  },
};
</script>

<style scoped>
.group-create-modal__container {
  position: absolute;
  width: 550px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--deep-green);
  border-radius: 20px;
  padding: 20px;
}

header {
  padding: 10px 0;
}

header h2 {
  text-align: center;
}
</style>
