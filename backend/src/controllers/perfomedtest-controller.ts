import { Brackets, SelectQueryBuilder } from "typeorm";
import { AppDataSource } from "../data-source";
import { Patient } from "../entity/Patient";
import { PerformedTest } from "../entity/PerformedTest";
import { Test } from "../entity/Test";
import { Controller } from "./base-controller";

export class PerformedTestController extends Controller{
    repository = AppDataSource.getRepository(PerformedTest);

    private getTestsCustomQuery = (patientID) => {
        /* SELECT 
                *
            FROM
                test
            WHERE 
                (SELECT YEAR(b_date) FROM patient WHERE patient.id = :patientId) < YEAR(NOW()) - test.start_age
            AND 
                    ((SELECT gender FROM patient WHERE patient.id = :patientId) = test.gender 
                OR 
                    test.gender = 'all') 
            AND 
                test.id NOT IN (SELECT testId FROM performed_test WHERE patientId = :patientId
            AND 
                YEAR(performed_test.last) > (YEAR(NOW()) - test.interval)) */

        const tqb = AppDataSource.getRepository(Test).createQueryBuilder();

        const query = tqb
            .where(tqb => {
                const subQuery = tqb.subQuery()
                    .select("YEAR(patient.b_date)")
                    .from(Patient, 'patient')
                    .where("patient.id = :patientID");
                return "YEAR(NOW()) - test.start_age > " + subQuery.getQuery();
            })
            .andWhere(new Brackets(tqb => {
                tqb.where(tqb => {
                    const subQuery = tqb.subQuery()
                        .select("gender")
                        .from(Patient, 'patient')
                        .where("patient.id = :patientID");
                    return "test.gender = " + subQuery.getQuery();
                })
                .orWhere("test.gender = 'all'")
            }))
            .andWhere(tqb => {
                const subQuery = tqb.subQuery()
                    .select("testId")
                    .from(PerformedTest, 'performed_test')
                    .where("patientId = :patientID")
                    .andWhere("YEAR(performed_test.last) >(YEAR(NOW()) - test.interval)")
                return "test.id NOT IN " + subQuery.getQuery();
            })
            .setParameter('patientID', patientID);

        return query;
    }

    private getPatientsCustomQuery = (testId) => {
        /* SELECT 
                * 
            FROM 
                patient 
            LEFT JOIN 
                (SELECT * FROM performed_test WHERE testId = 16) `performed_test`
            ON 
                patient.id = performed_test.patientId 
            WHERE 
                YEAR(patient.b_date) < (YEAR(NOW()) - (SELECT test.start_age FROM test WHERE test.id = :testId)) 
            AND 
                    ((patient.gender = (SELECT test.gender FROM test WHERE test.id = :testId)) 
                OR 
                    (SELECT test.gender FROM test WHERE test.id = :testId) = 'all') 
            AND 
                        ((YEAR(performed_test.last) > (YEAR(NOW()) - (SELECT test.interval FROM test WHERE id = :testId)) 
                    AND
                        performed_test.testId = :testId)
                OR 
                    performed_test.id IS NULL) */

        const tqb = AppDataSource.getRepository(Patient).createQueryBuilder('patient');

        const query = tqb
            .leftJoinAndSelect("patient.tests", "performed_test", "performed_test.test = :testId")
            .where(tqb => {
                const subQuery = tqb.subQuery()
                    .select("test.start_age")
                    .from(Test, 'test')
                    .where("test.id = :testId");
                return "YEAR(patient.b_date) < (YEAR(NOW()) - " + subQuery.getQuery() + ")";
            })
            .andWhere(new Brackets(tqb => {
                tqb.where(tqb => {
                    const subQuery = tqb.subQuery()
                        .select("test.gender")
                        .from(Test, 'test')
                        .where("test.id = :testId");
                    return "patient.gender = " + subQuery.getQuery();
                })
                .orWhere(tqb => {
                    const subQuery = tqb.subQuery()
                        .select("test.gender")
                        .from(Test, 'test')
                        .where("test.id = :testId");
                    return subQuery.getQuery() + " = 'all'";
                })
            }))
            .andWhere(new Brackets(tqb => {
                tqb.where(new Brackets(tqb => {
                    tqb.where(tqb => {
                        const subQuery = tqb.subQuery()
                            .select("test.interval")
                            .from(Test, 'test')
                            .where('test.id = :testId');
                        return "YEAR(performed_test.last) <= (YEAR(NOW()) - " + subQuery.getQuery() + ")";
                    })
                    .andWhere("performed_test.testId = :testId")
                }))
                .orWhere("performed_test.id IS NULL")
            }))
            .andWhere("taj IS NOT NULL")
            .setParameter('testId', testId);

        return query;
    }

    getNeededTests = async (req, res) => {
        const patientId = req.query.patientId || '';
        const testId = req.query.testId || '';
        
        if(patientId !== '') {
            this.getNeededTestsByPatient(req, res, patientId);
        } else if(testId !== '') {
            this.getNeededTestsByTest(req, res, testId);
        } else {
            res.status(400).json({ message: 'Hibás kérés!\nKérem vegye fel a kapcsolatot a fejlesztővel!\nPERFT_getNeededTests_patientId&testId' });
        }
    }

    private getNeededTestsByPatient = async (req, res, patientId) => {
        const patientRepository = AppDataSource.getRepository(Patient)

        try {
            const patient = await patientRepository.findOneBy({id: patientId});

            const tests = await this.getTestsCustomQuery(patient.id).getMany();

            res.status(200).json(tests);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    private getNeededTestsByTest = async (req, res, testId) => {
        const testRepository = AppDataSource.getRepository(Test)

        try {
            const test = await testRepository.findOneBy({id: testId});

            const patients = await this.getPatientsCustomQuery(test.id).getMany();

            res.status(200).json(patients);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}