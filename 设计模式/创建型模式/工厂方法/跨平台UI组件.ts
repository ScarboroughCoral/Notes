//组件类
interface Button {
  render(): string;
  onClick(): void;
}

class HTMLButton implements Button {
  render(): string {
    return "<button></button>";
  }
  onClick(): void {
    console.log("Web Button clicked");
  }
}

class MFCButton implements Button {
  render(): string {
    return "<mfc-button></mfc-button>";
  }
  onClick(): void {
    console.log("MFC Button clicked");
  }
}

//工厂方法类

abstract class Dialog {
  abstract createButton(): Button;
  render() {
    let button = this.createButton();
    return button.render();
  }
}

export class MFCDialog extends Dialog {
  createButton(): Button {
    return new MFCButton();
  }
}

export class HTMLDialog extends Dialog {
  createButton(): Button {
    return new HTMLButton();
  }
}
