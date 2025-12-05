/**
 * 과제 2: Debounce 구현 (Vue)
 *
 * 요구사항:
 * - 아래 `useDebounce` 컴포저블을 완성하세요.
 * - `value`가 변경될 때마다 지연 시간(`delay`) 후에 최종 값만 반영되도록 해야 합니다.
 * - 즉, 지연 시간 내에 값이 또 바뀌면 이전 타이머는 취소되어야 합니다.
 * - 반환값은 지연된 반응형 값(Ref) 이어야 합니다.
 *
 * 힌트:
 * - `ref`, `watch`, `onBeforeUnmount` 를 활용할 수 있습니다.
 */
import { ref, watch, onBeforeUnmount, type Ref } from 'vue';

export function useDebounce<T>(value: Ref<T> | T, delay = 300): Ref<T> {
  // TODO: 여기를 구현하세요.
  const out = ref((value as any).value ?? value) as Ref<T>;

  const stop = watch(
    () => (value as any).value ?? value,
    (v) => {
      (out as any).value = v;
    },
    { immediate: true }
  );

  onBeforeUnmount(() => {
    stop();
  });

  return out;
}
