<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20191006005557 extends AbstractMigration
{
    public function getDescription() : string
    {
        return 'Add Hurricane for testing';
    }

    public function up(Schema $schema) : void
    {
        $this->addSql("INSERT INTO `Hurricanes` (name, start_date, end_date, noaa_link, date_added) 
        VALUES 
        ('Dorian', '2019-01-01', '2025-01-01', :url, :now)", [
            'url'=>'https://www.nhc.noaa.gov/archive/2019/DORIAN_graphics.php?product=5day_cone_no_line_and_wind',
            'now'=>date("Y-m-d H:i:s")
        ]);
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs

    }
}
