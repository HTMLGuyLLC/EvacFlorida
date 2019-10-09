<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20191006004720 extends AbstractMigration
{
    public function getDescription() : string
    {
        return 'Add Highways';
    }

    public function up(Schema $schema) : void
    {
        $directions = json_encode(['N','S']);
        $this->addSql("INSERT INTO `Highways` (name, directions) VALUES ('95', :dir)", [
            'dir'=>$directions
        ]);
        $this->addSql("INSERT INTO `Highways` (name, directions) VALUES ('FL Turnpike', :dir)", [
            'dir'=>$directions
        ]);

        $directions = json_encode(['W']);
        $this->addSql("INSERT INTO `Highways` (name, directions) VALUES ('75', :dir)", [
            'dir'=>$directions
        ]);
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs

    }
}
