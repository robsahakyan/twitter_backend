import { MigrationInterface, QueryRunner } from "typeorm";

export class createTweetHashtagImageTables1666444615186 implements MigrationInterface {
    name = 'createTweetHashtagImageTables1666444615186'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tweets" RENAME COLUMN "media" TO "user_id"`);
        await queryRunner.query(`CREATE TABLE "images" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "path" character varying NOT NULL, "tweet_id" uuid, CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tweets" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "tweets" ADD "user_id" uuid`);
        await queryRunner.query(`ALTER TABLE "images" ADD CONSTRAINT "FK_65b62d78d863ff3d29c1ddffd74" FOREIGN KEY ("tweet_id") REFERENCES "tweets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tweets" ADD CONSTRAINT "FK_0a23c50228c2db732e3214682b0" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tweets" DROP CONSTRAINT "FK_0a23c50228c2db732e3214682b0"`);
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "FK_65b62d78d863ff3d29c1ddffd74"`);
        await queryRunner.query(`ALTER TABLE "tweets" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "tweets" ADD "user_id" character varying`);
        await queryRunner.query(`DROP TABLE "images"`);
        await queryRunner.query(`ALTER TABLE "tweets" RENAME COLUMN "user_id" TO "media"`);
    }

}
