import { Repository } from "typeorm";

export abstract class Initializer {
    entities: any[] = [];
    repository: Repository<any>;
    initialized: boolean = false;

    async initialize () {
        const entityCount = await this.repository.createQueryBuilder().getCount();

        if(entityCount === 0) {
            try {
                await this.repository.save(this.entities);
                this.initialized = true;
                console.log(`${this.repository.metadata.tableName} initialized.`);
            } catch(err) {
                console.log(err.message);
            }
        }
        
        this.entities = await this.repository.find();
    }
}