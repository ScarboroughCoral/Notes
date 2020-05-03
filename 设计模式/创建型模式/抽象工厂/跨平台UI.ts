//实体类
export interface Checkbox {}
export interface Button {}
export class WinCheckbox implements Checkbox {}
export class MacCheckbox implements Checkbox {}
export class WinButton implements Button {}
export class MacButton implements Button {}

export interface GUIFactory {
  createCheckbox(): Checkbox;
  createButton(): Button;
}

export class WinGUIFactory implements GUIFactory {
  createCheckbox(): Checkbox {
    return new WinCheckbox();
  }
  createButton(): Button {
    return new WinButton();
  }
}

export class MacGUIFactory implements GUIFactory {
  createCheckbox(): Checkbox {
    return new MacCheckbox();
  }
  createButton(): Button {
    return new MacButton();
  }
}
