import { useIntersectionObserver } from "@vueuse/core";
import { ref } from "vue";

export const useLazyLoad = (apiFn: any) => {
  //组件最外层的div元素
  const target = ref(null);
  //懒加载接口返回的数据
  const result = ref([]);
  //监听组件是否进入可视区域
  const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
    //如果target对应的Dom进入可视区域，该回调函数触发
    if (isIntersecting) {
      stop();
      apiFn().then((res: any) => {
        result.value = res.data;
      });
    }
  });
  //result表示接口懒加载获取的业务数据
  //target表示被监听的DOM元素，需要在组件中被ref绑定
  return { result, target };
};
