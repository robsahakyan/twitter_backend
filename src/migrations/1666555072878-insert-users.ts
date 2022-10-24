import type { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertUsers1664751142542 implements MigrationInterface {
  name = 'insertUsers1664751142542';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO users (email,password,first_name,last_name,phone)
        VALUES
             ('elonmusk@gmail.com','$2b$10$2UaNYSNowXS4SCrTelRNGu91j78VYq.RFiWrrcvsfSLO/j0vv/GYW','Elon','Musk', '077777788'),
             ('vardan@gmail.com','$2b$10$XBxOYvUzqnL4kmkzMbhsTesTe4LNm8Qgpr0BBivCSjP8zn0YCTE5O','Vardan','Grigoryan', '077987654'),
             ('robsahakyan@gmail.com', '$2b$10$e0EI9HlSV6BmGwvACCQBy.N7Tv4BG7.TnsXilq20KSRjhi3E2r1mq', 'Robert', 'Sahakyan', '098567495'),
             ('muradyanhrach@gmail.com', '$2b$10$RVgUvI/V/f1LRrAcRrdyhuHVc7tG8a/aj3iP74unA/SLhJckZGfYm', 'Hrach', 'Muradyan', '055555555')
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DELETE FROM users WHERE email = 'elonmusk@gmail.com'");
    await queryRunner.query("DELETE FROM users WHERE email = 'vardan@gmail.com'");
    await queryRunner.query("DELETE FROM users WHERE email = 'robsahakyan@gmail.com'");
    await queryRunner.query("DELETE FROM users WHERE email = 'muradyanhrach@gmail.com'");
  }
}
