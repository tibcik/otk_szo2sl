import { AppDataSource } from "../data-source";
import { Medicine } from "../entity/Medicine";
import { Controller } from "./base-controller";

export class MedicineController extends Controller{
    repository = AppDataSource.getRepository(Medicine);
}