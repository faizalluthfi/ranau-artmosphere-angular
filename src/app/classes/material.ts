export class Material {
  id: number;
  name: string;
  deleted: boolean;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
