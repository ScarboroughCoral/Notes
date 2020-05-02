import { HTMLDialog, MFCDialog } from "./跨平台UI组件";

test("测试跨平台UI组件工厂方法", () => {
  let htmlDialog = new HTMLDialog();
  let mfcDialog = new MFCDialog();
  expect(htmlDialog.createButton().render()).toBe("<button></button>");
  expect(mfcDialog.createButton().render()).toBe("<mfc-button></mfc-button>");
});
