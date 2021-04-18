import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export default class AlterProviderFieldToProviderId1618725768989 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('appointments', 'provider');
        await queryRunner.addColumn('appointments', new TableColumn({
            name: 'provider_id',
            type: 'uuid',
            isNullable: true
        }));

        await queryRunner.createForeignKey('appointments', new TableForeignKey({
            name: 'FK_APPOINTMENT_PROVIDER',
            columnNames: ['provider_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('appointments', 'FK_APPOINTMENT_PROVIDER');
        await queryRunner.dropColumn('appointments', 'provider_id');
        await queryRunner.addColumn('appointments', new TableColumn({
            name: 'provider',
            type: 'varchar'
        }))
    }
}
