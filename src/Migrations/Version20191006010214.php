<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20191006010214 extends AbstractMigration
{
    public function getDescription() : string
    {
        return 'Change sample hurricane date for testing';
    }

    public function up(Schema $schema) : void
    {
        $this->addSql("UPDATE Hurricanes SET start_date = '2019-10-05' WHERE id = 1");
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs

    }
}
