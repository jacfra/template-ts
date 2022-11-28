import { MigrationInterface, QueryRunner, Table, TableColumn } from "typeorm";

export class DemoMigration implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    if (!(await queryRunner.hasTable("demo_entity"))) {
      await queryRunner.createTable(new Table({ name: "demo_entity" }));
    }

    if (!(await queryRunner.hasColumn("demo_entity", "id"))) {
      await queryRunner.addColumn(
        "demo_entity",
        new TableColumn({
          name: "id",
          type: "int",
          isPrimary: true,
          isGenerated: true,
        })
      );
    }

    if (!(await queryRunner.hasColumn("demo_entity", "value"))) {
      await queryRunner.addColumn(
        "demo_entity",
        new TableColumn({
          name: "value",
          type: "varchar",
        })
      );
    }
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    if (!(await queryRunner.hasTable("demo_entity"))) {
      return;
    }
    await queryRunner.dropTable("demo_entity");
  }
}
