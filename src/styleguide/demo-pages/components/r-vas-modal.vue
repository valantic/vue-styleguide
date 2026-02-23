<template>
  <l-vas-layout>
    <div :class="b()">
      <section :class="b('section')">
        <h2>Default Modal</h2>
        <e-vas-button
          primary
          @click="isDefaultModalOpen = true"
        >
          Open Default Modal
        </e-vas-button>
        <c-vas-modal
          v-model:is-open="isDefaultModalOpen"
          title="Default Modal"
        >
          <p>This is a default modal with a title and a close button.</p>
        </c-vas-modal>
      </section>

      <section :class="b('section')">
        <h2>Modal with outside click closing</h2>
        <e-vas-button
          primary
          @click="isOutsideClickModalOpen = true"
        >
          Open Modal (Outside Click)
        </e-vas-button>
        <c-vas-modal
          v-model:is-open="isOutsideClickModalOpen"
          title="Outside Click Modal"
          close-on-outside-click
        >
          <p>You can close this modal by clicking outside of it.</p>
        </c-vas-modal>
      </section>

      <section :class="b('section')">
        <h2>Modal with no header</h2>
        <e-vas-button
          primary
          @click="isNoHeaderModalOpen = true"
        >
          Open Modal (no header)
        </e-vas-button>
        <c-vas-modal
          v-model:is-open="isNoHeaderModalOpen"
          close-on-outside-click
          hide-header
        >
          <p>You can close this modal by clicking outside of it.</p>
        </c-vas-modal>
      </section>

      <section :class="b('section')">
        <h2>Modal without close button</h2>
        <e-vas-button
          primary
          @click="isNonClosableModalOpen = true"
        >
          Open Non-Closable Modal
        </e-vas-button>
        <c-vas-modal
          v-model:is-open="isNonClosableModalOpen"
          title="Non-Closable Modal"
          :is-closable="false"
        >
          <p>
            This modal does not have a close button. You need to provide your own close mechanism inside the modal or
            use outside click if enabled.
          </p>
          <e-vas-button @click="isNonClosableModalOpen = false"> Close from inside </e-vas-button>
        </c-vas-modal>
      </section>

      <section :class="b('section')">
        <h2>Modal with too much content</h2>
        <e-vas-button
          primary
          @click="isStickyFooterModalOpen = true"
        >
          Open Sticky Footer Modal
        </e-vas-button>
        <c-vas-modal
          v-model:is-open="isStickyFooterModalOpen"
          title="Sticky Footer Modal"
        >
          <p
            v-for="i in 120"
            :key="i"
          >
            Scrolling content... Line {{ i }}
          </p>
          <template #footer>
            <e-vas-button @click="isStickyFooterModalOpen = false"> Close </e-vas-button>
          </template>
        </c-vas-modal>
      </section>
    </div>
  </l-vas-layout>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import cVasModal from '@/components/c-vas-modal.vue';
  import eVasButton from '@/elements/e-vas-button.vue';
  import lVasLayout from '@/layouts/l-vas-layout.vue';

  type Data = {
    isDefaultModalOpen: boolean;
    isOutsideClickModalOpen: boolean;
    isNonClosableModalOpen: boolean;
    isStickyFooterModalOpen: boolean;
    isNoHeaderModalOpen: boolean;
  };

  /**
   * Styleguide page for c-vas-modal.
   */
  export default defineComponent({
    name: 'r-vas-modal',

    components: {
      cVasModal,
      eVasButton,
      lVasLayout,
    },

    data(): Data {
      return {
        isDefaultModalOpen: false,
        isOutsideClickModalOpen: false,
        isNonClosableModalOpen: false,
        isStickyFooterModalOpen: false,
        isNoHeaderModalOpen: false,
      };
    },
  });
</script>

<style lang="scss">
  .r-vas-modal {
    &__section {
      margin-top: 2rem;
    }
  }
</style>
