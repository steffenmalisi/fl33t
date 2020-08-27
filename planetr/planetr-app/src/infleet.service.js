import InfleetSuccessEvent from './infleet-success.event.js';
import InfleetFailureEvent from './infleet-failure.event.js';

const INFLEET_URL = 'http://localhost:3000/dev/vehicles';

export default class InfleetService {
  static async infleet(asset) {
    try {
      const response = await fetch(INFLEET_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(asset),
      });
      if (response.ok) {
        const body = await response.json();
        window.dispatchEvent(new InfleetSuccessEvent(body));
      } else {
        console.log(
          'An error occurred while trying to save the asset.',
          response
        );
        window.dispatchEvent(new InfleetFailureEvent(response));
      }
    } catch (error) {
      console.log('An error occurred while trying to save the asset.', error);
      window.dispatchEvent(new InfleetFailureEvent(error));
    }
  }
}
