const INFLEET_SUCCESS_EVENT = 'planetr-infleet-success';

export default class InfleetSuccessEvent extends CustomEvent {
  constructor(detail) {
    super(INFLEET_SUCCESS_EVENT, {
      detail,
      bubbles: true,
    });
  }
}
