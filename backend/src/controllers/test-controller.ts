import { AppDataSource } from "../data-source";
import { Test } from "../entity/Test";
import { Controller } from "./base-controller";

export class TestController extends Controller{
    repository = AppDataSource.getRepository(Test);
}