export {} /// 这句不能删
declare module 'vue/types/vue' {
  class $bus {}
  interface Vue {
    $bus: any
  }
}
