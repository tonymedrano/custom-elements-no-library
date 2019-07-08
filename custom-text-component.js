class CustomText extends HTMLElement {
    // set which attributes changes will trigger the attributeChangedCallback
    static get observedAttributes() {
        return ["text", "color"];
    }

    // part of custom element lifecylce hooks: set property defaults, make root element a shadow root and set up event listeners in constructor
    // call render here to render elements that do not have any custom observed attributes
    constructor() {
        super();
        this.text = "hello";
        this.color = "red";
        this.attachShadow({
            mode: "open"
        });
        this.onclick = this.onClick;
    }

    // part of custom element lifecylce hooks: userful for running setup code such as fetching resources or rendering
    connectedCallback() {
        this.divId = this.getAttribute("divid");
        this.render();
    }

    // new render method to set styles and html elments to be displayed inside the shodow DOM
    render() {
        this.shadowRoot.innerHTML = `
        <style>
        :host{
          display: block;
          color: ${this.color};
          font-size: 30px;
          font-family: Lato;
          text-align: center;
        }
        :host([hidden]) { display: none }.
        :host(:hover) {
          cursor: pointer;
        }
        </style>
        <div id="${this.divId}">${this.text}</div>
      `;
    }

    // new onClick method to change the attributes of the custom elements
    onClick() {
        this.setAttribute("color", "purple");
    }

    // part of custom element lifecylce hooks: this method will run whenever an attributes listed in observedAttributes changes
    attributeChangedCallback(name, oldValue, newValue) {
        this.getAttribute("text") ?
            (this.text = this.getAttribute("text")) :
            null;
        this.getAttribute("color") ?
            (this.color = this.getAttribute("color")) :
            null;
        this.render();
    }
}

customElements.define("custom-text", CustomText);