import { MigrationInterface, QueryRunner } from "typeorm";

export class this1669816533849 implements MigrationInterface {
  name = "this1669816533849";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "demo_entity" ("id" SERIAL NOT NULL, "value" character varying NOT NULL, CONSTRAINT "PK_f01095cb69726410007c1f27703" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "demo_entity"`);
  }
}
