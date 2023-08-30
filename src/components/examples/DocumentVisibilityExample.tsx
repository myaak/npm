import { useDocumentVisibility } from "use-document-visibility-hook-ts";
import { useEffect } from "react";

const DocumentVisibilityExample = () => {
  const { count, visible, onVisibilityChange } = useDocumentVisibility();

  useEffect(() => {
    onVisibilityChange((isVisible) => {
      console.log("first handler", isVisible);
    });

    const unsubscribeSecondHandler = onVisibilityChange((isVisible) => {
      console.log("second handler", isVisible);
    });

    setTimeout(() => unsubscribeSecondHandler(), 5000); // отписываемся от 'second handler' через 5 секунд
  }, [onVisibilityChange]);

  return (
    <div>
      <span>
        Вы покинули страницу: {count} раз Вкладка активна? {visible ? "да" : "нет"}
      </span>
    </div>
  );
};

export default DocumentVisibilityExample;
