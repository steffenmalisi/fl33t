const INFLEET_FAILURE_EVENT = 'planetr-infleet-failure';

export default class InfleetFailureEvent extends CustomEvent {
  constructor(detail) {
    super(INFLEET_FAILURE_EVENT, {
      detail,
      bubbles: true,
    });
  }
}
