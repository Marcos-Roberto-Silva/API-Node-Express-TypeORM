import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterUserAddPassword1634500836268 implements MigrationInterface {

    public async up(queryRunner : QueryRunner): Promise < void > {
        await queryRunner.addColumn("Users", new TableColumn({name: "password", type: "varchar", isNullable: true}))
    }

    public async down(queryRunner : QueryRunner): Promise < void > {
        queryRunner.dropColumn("Users", "password");
    }

}
