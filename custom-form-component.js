/*
 * File: /Users/tonymedrano/Desktop/custom-elems/custom-form-component.js
 * Project: /Users/tonymedrano/Desktop/custom-elems
 * Created Date: Monday July 8th 2019
 * Author: tonymedrano
 * -----
 * Last Modified:
 * Modified By:
 * -----
 * Copyright (c) 2019 Custom Elems App
 */

class CustomForm extends HTMLElement {

  html() {
    this.shadowRoot.innerHTML = `
        <style>
        :host{
          display: block;
        }

        .custom-form {
          background-color: ${this.background};
        }

        input[type=text], select {
            width: 100%;
            padding: 12px 20px;
            margin: 8px 0;
            display: inline-block;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
          }
          
          input[type=submit] {
            width: 100%;
            background-color: ${this.color};
            color: white;
            padding: 14px 20px;
            margin: 8px 0;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }
          
          input[type=submit]:hover {
            background-color: ${this.color};
          }
          
          div {
            border-radius: 5px;
            background-color: #f2f2f2;
            padding: 20px;
          }
        </style>
        <div class="custom-form">
           <form id="custom-form">
              <label for="fname">First Name</label>
              <input type="text" id="fname" name="firstname" placeholder="Your name..">
              <label for="lname">Last Name</label>
              <input type="text" id="lname" name="lastname" placeholder="Your last name..">
              <label for="country">Country</label>
              <select id="country" name="country">
                <option value="australia">Australia</option>
                <option value="canada">Canada</option>
                <option value="usa">USA</option>
              </select>
              <input type="submit" id="submit">
            </form>
        </div>
      `;
  }

  constructor() {
    super();
    this.attachShadow({
      mode: "open"
    });

    this.onSubmitClick = this.onSubmitClick.bind(this);
  }

  static get observedAttributes() {
    return ['color', 'background', 'user'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.getAttribute('user') ? (this.user = this.getAttribute('user')) : null;
    this.getAttribute('color') ? (this.color = this.getAttribute('color')) : null;
    this.getAttribute('background') ? (this.background = this.getAttribute('background')) : null;
    this.html();
  }

  connectedCallback() {
    this.html();
    this.shadowRoot.querySelector('input#submit').addEventListener('click', this.onSubmitClick);
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector('input#submit').removeEventListener('click', this.onSubmitClick);
  }

  onSubmitClick(event) {
    event.preventDefault();
    const user = {};
    const form = this.shadowRoot.querySelector('#custom-form').elements;
    for (let field of form) {
      if (field.name !== '') user[field.name] = field.value;
    }
    window.dispatchEvent(new CustomEvent("custom-form-submitted", {
      detail: {
        user
      }
    }));
  }

}

customElements.define("custom-form", CustomForm);

window.addEventListener("custom-form-submitted", (event) => {
  console.log('data serialized:');
  console.log(JSON.stringify(event.detail));
});