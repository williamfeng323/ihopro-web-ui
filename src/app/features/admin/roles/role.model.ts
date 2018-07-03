export class Role {
  id: string;
  name: string;
  description: string;

  constructor( obj?: any ) {
    this.id = obj && obj.id;
    this.name = obj && obj.name;
    this.description = obj && obj.description;
  }
}
