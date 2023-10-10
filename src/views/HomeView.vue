<template>
  <BaseContainer class="home">
    <h1 class="home__header">Canban-сетка</h1>

    <ProductDialog
      v-if="isDialogOpened"
      @cancel="dialogClose"
      @submit="dialogSubmit"
    />

    <div class="group">
      <div class="group__header">
        <h2 class="group__header-text">В ПЛАНАХ</h2>
        <SvgIcon
          class="icon icon--add group__header-icon"
          name="iconPlus"
          title="Добавить запись"
          @click="dialogOpen"
        />
      </div>
      <div
        class="group__products"
        @drop="onDrop($event, 1)"
        @dragover.prevent
        @dragend.prevent
      >
        <ProductCard
          v-for="product in plansProducts"
          :key="product.id"
          :card="product"
          @dragstart="onDragStart($event, product)"
          draggable="true"
        />
      </div>
    </div>

    <div class="group">
      <div class="group__header">
        <h2 class="group__header-text">В РАБОТЕ</h2>
      </div>
      <div
        class="group__products"
        @drop="onDrop($event, 2)"
        @dragover.prevent
        @dragend.prevent
      >
        <ProductCard
          v-for="product in workingProducts"
          :key="product.id"
          :card="product"
          @dragstart="onDragStart($event, product)"
          draggable="true"
        />
      </div>
    </div>

    <div class="group">
      <div class="group__header">
        <h2 class="group__header-text">ГОТОВО</h2>
      </div>
      <div
        class="group__products"
        @drop="onDrop($event, 3)"
        @dragover.prevent
        @dragend.prevent
      >
        <ProductCard
          v-for="product in completeProducts"
          :key="product.id"
          :card="product"
          @dragstart="onDragStart($event, product)"
          draggable="true"
        />
      </div>
    </div>
  </BaseContainer>
</template>

<script lang="ts">
import { loadProducts } from '@/scripts/api';
import { Product } from '@/scripts/interfaces';
import { defineComponent, defineAsyncComponent } from 'vue';
import ProductCard from '@/components/ProductCard.vue';
import SvgIcon from '@/components/SvgIcon.vue';
import { mapGetters, mapMutations } from 'vuex';

export default defineComponent({
  name: 'HomeView',
  components: {
    ProductCard,
    SvgIcon,
    ProductDialog: defineAsyncComponent({
      loader: () => import('@/components/ProductDialog.vue'),
      delay: 0,
      loadingComponent: () => '<h2>Загрузка...</h2>',
    }),
  },
  data() {
    return {
      isDialogOpened: false,
    };
  },
  computed: {
    ...mapGetters(['getMaxProductId', 'getProducts']),
    products(): [Product] {
      return [...this.getProducts].sort(
        (a, b) => b.rating?.rate - a.rating?.rate,
      ) as [Product];
    },
    plansProducts(): [Product] {
      return this.products.filter((item: Product) => item.group === 1) as [
        Product,
      ];
    },
    workingProducts(): [Product] {
      return this.products.filter((item: Product) => item.group === 2) as [
        Product,
      ];
    },
    completeProducts(): [Product] {
      return this.products.filter((item: Product) => item.group === 3) as [
        Product,
      ];
    },
  },
  methods: {
    ...mapMutations(['addProduct', 'updateProduct']),
    dialogOpen() {
      this.isDialogOpened = true;
    },
    dialogClose() {
      this.isDialogOpened = false;
    },
    dialogSubmit(product: Product) {
      this.dialogClose();
      this.addProduct({
        ...product,
        id: this.getMaxProductId + 1,
        group: 1,
        rating: { rate: 0, count: 0 },
        price: product.price ?? 0,
      });
    },
    onDragStart(event: DragEvent, item: Product) {
      if (!event.dataTransfer) return;
      event.dataTransfer.dropEffect = 'move';
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('item', JSON.stringify(item));
    },
    onDrop(event: DragEvent, group: number) {
      const product = JSON.parse(event.dataTransfer?.getData('item') as string);
      this.updateProduct({ ...product, group });
    },
  },
  created() {
    if (this.$store.state.products.length > 0) return;

    loadProducts()
      .then((list) => {
        list.forEach((item: Product) => this.addProduct({ ...item, group: 1 }));
      })
      .catch((err) => {
        console.log(`Ошибка загрузки списка продуктов с сайта: ${err.message}`);
      });
  },
});
</script>

<style lang="sass" scoped>
.home
  display: grid
  grid-template-columns: repeat(3, 1fr)
  gap: 20px
  &__header
    display: none
.group
  display: flex
  flex-direction: column
  align-items: center
  justify-content: stretch
  min-width: 200px
  width: 100%
  // outline: 1px solid red
  &__header
    display: flex
    justify-content: center
    align-items: center
    margin-bottom: 20px
    &-text
      // margin-right: 20px
      font-weight: 600
      font-size: 40px
    &-icon
      stroke: green
      stroke-width: 3px
      width: 50px
      height: 50px
  &__products
    display: flex
    flex-direction: column
    align-items: center
    width: 100%
    height: 100%

.card
  &:not(:last-child)
    margin-bottom: 20px

@media (max-width: 991.98px)
  .group
    &__header
      margin-bottom: 15px
      &-text
        font-size: 32px
      &-icon
        width: 40px
        height: 40px

@media (max-width: 767.98px)
  .home
    grid-template-columns: repeat(2, 1fr)

@media (max-width: 575.98px)
  .home
    grid-template-columns: 1fr

@media (max-width: 575.98px)
  .group
    &__header
      margin-bottom: 10px
      &-text
        font-weight: 600
        font-size: 26px
      &-icon
        stroke-width: 2px
        width: 30px
        height: 30px
  .card
    &:not(:last-child)
      margin-bottom: 15px
</style>
