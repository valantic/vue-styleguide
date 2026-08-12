import { ref } from 'vue';

export function useCopyFeedback(timeoutMs = 1500) {
  const copied = ref(false);

  async function copy(text: string): Promise<void> {
    await navigator.clipboard.writeText(text);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, timeoutMs);
  }

  return { copied, copy };
}
