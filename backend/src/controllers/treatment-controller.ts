import { AppDataSource } from "../data-source";
import { Treatment } from "../entity/Treatment";
import { Controller } from "./base-controller";

export class TreatmentController extends Controller{
    repository = AppDataSource.getRepository(Treatment);
}