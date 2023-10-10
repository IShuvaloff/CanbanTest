<template>
  <teleport to="#teleport-target">
    <div class="dialog" ref="dialog">
      <div class="dialog__wrapper">
        <div class="dialog__header">
          <span>{{ title }}</span>
          <span class="dialog__header-close" title="Закрыть" @click="cancel" />
          <SvgIcon
            class="icon icon--close dialog__icon dialog__icon--close"
            name="iconPlus"
            title="Закрыть диалог"
            @click="cancel"
          />
        </div>

        <form class="dialog__content" @submit="submit">
          <input
            type="text"
            id="input-title"
            name="card-title"
            class="dialog__input dialog__input--title input-title"
            placeholder="Название"
            v-model="newProduct.title"
            required
            @input="onTitleInput"
          />
          <label
            class="dialog__input-error hidden"
            id="input-error-title"
            for="input-title"
            >Введите название</label
          >
          <input
            type="text"
            name="card-category"
            class="dialog__input input-category"
            placeholder="Категория"
            v-model="newProduct.category"
            required
          />
          <textarea
            name="card-descr"
            class="dialog__input dialog__input--descr input-descr"
            placeholder="Описание"
            v-model="newProduct.description"
          />
          <input
            name="card-price"
            type="number"
            class="dialog__input input-price"
            placeholder="Цена"
            v-model="newProduct.price"
          />
          <input
            type="url"
            class="dialog__input input-image"
            placeholder="URL изображения"
            v-model="newProduct.image"
          />

          <div class="dialog__footer">
            <BaseButtonOut
              class="button button--second dialog__btn dialog__btn--close"
              caption="Закрыть"
              @click="cancel"
            />
            <BaseButtonOut
              class="button button--primery dialog__btn dialog__btn--submit"
              :caption="submitBtnTitle"
              type="submit"
              @click="submit"
            />
          </div>
        </form>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import SvgIcon from './SvgIcon.vue';
import { Product } from '@/scripts/interfaces';

export default defineComponent({
  name: 'ProductDialog',
  components: { SvgIcon },
  props: {
    product: Object as PropType<Product>,
  },
  data() {
    return {
      newProduct: {} as Product,
    };
  },
  computed: {
    title() {
      return !this.product ? 'Добавить новый продукт' : 'Изменить продукт';
    },
    submitBtnTitle() {
      return !this.product ? 'Добавить' : 'Обновить';
    },
  },
  emits: ['submit', 'cancel'],
  methods: {
    stopScrolling() {
      document.body.style.paddingRight =
        window.innerWidth - document.documentElement.clientWidth + 'px'; // чтобы не происходил визуальный скачок интерфейса
      document.body.style.overflow = 'hidden';
    },
    startScrolling() {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = 'null';
    },
    cancel() {
      this.startScrolling();
      this.$emit('cancel');
    },
    submit(event: Event) {
      event.preventDefault();
      if (!this.checkFormData()) return;

      this.startScrolling();
      this.$emit('submit', this.newProduct);
    },
    clearInputErrors() {
      document.getElementById('input-error-title')?.classList.add('hidden');
    },
    checkFormData() {
      if (!this.newProduct.title) {
        document
          .getElementById('input-error-title')
          ?.classList.remove('hidden');
        return false;
      } else {
        document.getElementById('input-error-title')?.classList.add('hidden');
        return true;
      }
    },
    onTitleInput() {
      document.getElementById('input-error-title')?.classList.add('hidden');
    },
  },
  created() {
    if (!this.product) return;
    this.newProduct = { ...this.product };
  },
  mounted() {
    this.stopScrolling();
    document.addEventListener('click', (item) => {
      // закрыть модальное окно при клике вне его
      if (item.target === this.$refs['dialog']) {
        this.cancel();
      }
    });
  },
});
</script>

<style lang="sass" scoped>
@import '@/assets/sass/variables'

.dialog
  position: fixed
  top: 0
  bottom: 0
  right: 0
  left: 0
  z-index: 99
  display: flex
  justify-content: center
  align-items: center
  background: rgba(51, 51, 51, 0.6)
  &__wrapper
    display: flex
    flex-direction: column
    justify-content: stretch
    align-items: stretch
    padding: 30px
    background-color: white
    box-shadow: 4px 4px 8px 0px rgba(black, 0.5)
    max-height: 600px
    max-width: 90%
    overflow: auto
  &__header
    flex-grow: 0
    flex-shrink: 0
    display: flex
    justify-content: space-between
    align-items: center
    margin-bottom: 20px
    font-size: 25px
    &-close
      &:hover
        cursor: pointer
  &__icon
    &--close
      width: 30px
      height: 30px
      stroke: black
      transform: rotate(45deg)
  &__content
    flex-grow: 1
    flex-shrink: 1
    display: flex
    flex-direction: column
    justify-content: center
    align-items: flex-start
    width: 100%
    & > *
      width: 100%
      margin-bottom: 10px
  &__input
    border: none
    border-radius: 0
    border-bottom: 1px solid $color-gs-5
    height: 25px
    &--title
      margin-bottom: 3px
    &--descr
      height: 100px
      resize: vertical
  &__input-error
    margin-bottom: 7px
    color: red
    font-size: 12px
    &.hidden
      visibility: hidden
      height: 0
  &__footer
    flex-grow: 0
    flex-shrink: 0
    display: flex
    justify-content: flex-end
    align-items: stretch
    margin-top: 10px
  &__btn
    display: flex
    align-items: center
    justify-content: center
    padding: 15px 15px 12px
    width: 160px
  // &__btn--submit
  //   width: 160px
  &__btn--close
    margin-right: 20px
</style>
