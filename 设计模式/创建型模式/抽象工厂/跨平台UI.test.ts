import {
  GUIFactory,
  MacGUIFactory,
  MacButton,
  MacCheckbox,
  WinGUIFactory,
  WinButton,
  WinCheckbox,
} from "./跨平台UI";

test("测试跨平台UI抽象工厂", () => {
  let win: GUIFactory = new WinGUIFactory();
  let mac: GUIFactory = new MacGUIFactory();
  expect(win.createButton()).toBeInstanceOf(WinButton);
  expect(win.createCheckbox()).toBeInstanceOf(WinCheckbox);
  expect(mac.createButton()).toBeInstanceOf(MacButton);
  expect(mac.createCheckbox()).toBeInstanceOf(MacCheckbox);
});
