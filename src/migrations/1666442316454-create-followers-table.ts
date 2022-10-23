import { MigrationInterface, QueryRunner } from "typeorm";

export class createFollowersTable1666442316454 implements MigrationInterface {
    name = 'createFollowersTable1666442316454'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "folows" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "folower_id" uuid NOT NULL, "folowing_id" uuid NOT NULL, CONSTRAINT "PK_5a925327222f55aebc5fe460894" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "folows" ADD CONSTRAINT "FK_8df1f7871e1587d1adc1d781bff" FOREIGN KEY ("folower_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "folows" ADD CONSTRAINT "FK_3d8811db2cdcc38411e41bed39b" FOREIGN KEY ("folowing_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "folows" DROP CONSTRAINT "FK_3d8811db2cdcc38411e41bed39b"`);
        await queryRunner.query(`ALTER TABLE "folows" DROP CONSTRAINT "FK_8df1f7871e1587d1adc1d781bff"`);
        await queryRunner.query(`DROP TABLE "folows"`);
    }

}
