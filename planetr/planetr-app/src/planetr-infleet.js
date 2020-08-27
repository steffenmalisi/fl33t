import { LitElement, html, css } from 'lit-element';
import InfleetService from './infleet.service.js';
import '@material/mwc-textfield';
import '@material/mwc-button';

const INFLEET_SUCCESS_EVENT = 'planetr-infleet-success';
const INFLEET_FAILURE_EVENT = 'planetr-infleet-failure';

class PlanetrInfleet extends LitElement {
  static get properties() {
    return {};
  }

  static get styles() {
    return css`
      mwc-textfield {
        --mdc-theme-primary: green;
      }

      mwc-button {
        --mdc-theme-primary: green;
      }
    `;
  }

  render() {
    return html`
      <div>
        <mwc-textfield
          id="vin"
          label="VIN"
          icon="vpn_key"
          required
        ></mwc-textfield>
      </div>
      <div>
        <mwc-textfield
          id="lp"
          label="License plate"
          icon="local_police"
          required
        ></mwc-textfield>
      </div>
      <div>
        <mwc-button
          raised
          label="Infleet"
          @click=${e => this.onSubmit(e)}
        ></mwc-button>
      </div>
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

  onSubmit() {
    const vin = this.shadowRoot.querySelector('#vin').value;
    const licensePlate = this.shadowRoot.querySelector('#lp').value;
    InfleetService.infleet({ vin, licensePlate });
  }

  static onInfleetSuccess(e) {
    console.log('Infleet successful.', e.detail);
  }

  static onInfleetFailure(e) {
    alert(`Infleet failed: ${e.detail}`);
  }
}

customElements.define('planetr-infleet', PlanetrInfleet);
