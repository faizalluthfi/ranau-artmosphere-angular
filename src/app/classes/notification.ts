export class Notification {
  message:string;
  type:string = 'info';

  constructor(values: Object = {}) {
      Object.assign(this, values);
  }
}
