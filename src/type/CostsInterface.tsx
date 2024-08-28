import { ICost } from "./CostInterface";

export interface ICosts {
  service: string;
  description: string;
  cost: ICost[];
}
