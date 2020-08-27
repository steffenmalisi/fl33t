import { LitElement, html, css } from 'lit-element';
import InfleetService from './infleet.service.js';

const INFLEET_SUCCESS_EVENT = 'planetr-infleet-success';
const INFLEET_FAILURE_EVENT = 'planetr-infleet-failure';

class PlanetrInfleet extends LitElement {
  static get properties() {
    return {};
  }

  static get styles() {
    return css`
      form {
        display: table;
      }
      div.row {
        display: table-row;
      }
      span.cell {
        display: table-cell;
      }
      label,
      input {
        display: table-cell;
        margin-bottom: 10px;
      }
      label {
        padding-right: 10px;
        text-align: left;
      }
      input.button {
        display: block;
        height: 30px;
        padding-left: 10px;
        padding-right: 10px;
        border: none;
        float: right;
        background-color: red;
        color: white;
      }
    `;
  }

  render() {
    return html`
      <form @submit=${e => PlanetrInfleet.onSubmit(e)} action="" method="GET">
        <div class="row">
          <label for="id">Enter Id: </label>
          <input type="text" name="id" id="id" required />
        </div>
        <div class="row">
          <label for="color">Enter Color: </label>
          <input type="text" name="color" id="color" required />
        </div>
        <div class="row">
          <label for="seats">Enter Seats: </label>
          <input type="text" name="seats" id="seats" required />
        </div>
        <div class="row">
          <span class="cell"></span>
          <input class="button" type="submit" value="Infleet!" />
        </div>
      </form>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener(INFLEET_SUCCESS_EVENT, e =>
      PlanetrInfleet.onInfleetSuccess(e)
    );
    window.addEventListener(INFLEET_FAILURE_EVENT, e =>
      PlanetrInfleet.onInfleetFailure(e)
    );
  }

  static onSubmit(e) {
    e.preventDefault();
    const id = e.target[0].value;
    const color = e.target[1].value;
    const seats = e.target[2].value;
    InfleetService.infleet({ id, color, seats });
  }

  static onInfleetSuccess(e) {
    console.log('Infleet successful.', e.detail);
  }

  static onInfleetFailure(e) {
    alert(`Infleet failed: ${e.detail}`);
  }
}

customElements.define('planetr-infleet', PlanetrInfleet);
