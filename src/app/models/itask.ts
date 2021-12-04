import { GenericModel } from "./generic.model";

export interface Task extends GenericModel{
  title: string;
  description: string;
  done: boolean;
}
