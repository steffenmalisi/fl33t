import { LitElement, html, css } from 'lit-element';
import { openWcLogo } from './open-wc-logo.js';
import './planetr-infleet.js';

export class PlanetrApp extends LitElement {
  static get properties() {
    return {};
  }

  static get styles() {
    return css`
      :host {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        font-size: calc(10px + 2vmin);
        color: #1a2b42;
        max-width: 960px;
        margin: 0 auto;
        text-align: center;
      }

      main {
        flex-grow: 1;
      }

      .logo > svg {
        margin-top: 36px;
        animation: app-logo-spin infinite 20s linear;
      }

      @keyframes app-logo-spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    `;
  }

  render() {
    return html`
      <main>
        <div class="logo">${openWcLogo}</div>
        <h1>Planetr</h1>

        <div>
          <planetr-infleet></planetr-infleet>
        </div>
      </main>
    `;
  }
}
