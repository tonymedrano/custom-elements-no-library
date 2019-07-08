/*
 * File: /Users/tonymedrano/Desktop/custom-elems/custom-app-component.js
 * Project: /Users/tonymedrano/Desktop/custom-elems
 * Created Date: Monday July 8th 2019
 * Author: tonymedrano
 * -----
 * Last Modified:
 * Modified By:
 * -----
 * Copyright (c) 2019 Custom Elems App
 */

import "./custom-form-component.js";

class CustomApp extends HTMLElement {
    static get observedAttributes() {
        return ["text", "color"];
    }

    constructor() {
        super();
        this.attachShadow({
            mode: "open"
        });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
        <style>
        :host{
          display: block;
        }

        </style>
        <div class="custom-app-content">
          <custom-form color="#4CAF50" background="white"></custom-form>
        </div>
      `;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
    }
}

customElements.define("custom-app", CustomApp);