import { Field } from "./field.model";

export class Document {
  _id!:string;
  name!: string;
  date!: string;
  fields!: Field;


}
