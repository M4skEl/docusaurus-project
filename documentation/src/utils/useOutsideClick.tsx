import { useEffect, RefObject } from 'react';

/**
 * Хук для отслеживания кликов вне указанного элемента
 * @param ref - ссылка на элемент, клики вне которого нужно отслеживать
 * @param handler - функция-обработчик, которая будет вызвана при клике вне элемента
 */
export function useOutsideClick<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void
): void {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Проверяем, что элемент существует и клик не был внутри него
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      
      handler(event);
    };

    // Добавляем слушатели событий
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    // Очищаем слушатели при размонтировании компонента
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
} 