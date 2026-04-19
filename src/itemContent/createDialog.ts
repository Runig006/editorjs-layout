import type { OutputData } from "@editorjs/editorjs";
import { v4 as uuidv4 } from "uuid";
import type { LayoutBlockToolConfig } from "../LayoutBlockTool";

const createDialog = ({
  EditorJS,
  data,
  editorJSConfig,
  onClose,
}: {
  EditorJS: LayoutBlockToolConfig["EditorJS"];
  data: OutputData;
  editorJSConfig: LayoutBlockToolConfig["editorJSConfig"];
  onClose?: (event: { editorJSData: OutputData }) => void;
}) => {
  const dialog = document.createElement("dialog");
  dialog.className = "editorjs-layout-dialog";
  dialog.style.maxWidth = "960px";
  dialog.style.width = "calc(100% - 64px)";
  dialog.style.padding = "0";

  const editorJSHolder = document.createElement("div");
  const editorJSHolderID = uuidv4();
  editorJSHolder.id = editorJSHolderID;
  editorJSHolder.className = "editorjs-layout-dialog__body";

  dialog.append(editorJSHolder);
  document.body.append(dialog);

  const editorJS = new EditorJS({
    ...editorJSConfig,
    holder: editorJSHolderID,
    data,
  });

  dialog.showModal();

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  dialog.addEventListener("close", async () => {
    const editorJSData = await editorJS.save();
    editorJS.destroy();
    onClose?.({ editorJSData });
    dialog.remove();
  });
};

export { createDialog };
