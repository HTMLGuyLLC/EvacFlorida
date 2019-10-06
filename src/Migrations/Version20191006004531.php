<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20191006004531 extends AbstractMigration
{
    public function getDescription() : string
    {
        return 'Init Tables';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'sqlite', 'Migration can only be executed safely on \'sqlite\'.');

        $this->addSql('CREATE TABLE highways (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name VARCHAR(10) NOT NULL, directions CLOB DEFAULT NULL --(DC2Type:json_array)
        )');
        $this->addSql('CREATE TABLE hurricanes (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name VARCHAR(50) NOT NULL, start_date DATETIME DEFAULT NULL, end_date DATETIME DEFAULT NULL, noaa_link VARCHAR(500) DEFAULT NULL, date_added DATETIME DEFAULT NULL)');
        $this->addSql('CREATE TABLE departures (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, hurricane_id INTEGER NOT NULL, user_id INTEGER NOT NULL, highway_id INTEGER NOT NULL, direction VARCHAR(1) DEFAULT NULL, traffic_when_added INTEGER NOT NULL, date DATETIME DEFAULT NULL, date_added DATETIME NOT NULL, date_updated DATETIME DEFAULT NULL, last_alert_date DATETIME DEFAULT NULL)');
        $this->addSql('CREATE INDEX IDX_3C496767F3BF7FF6 ON departures (hurricane_id)');
        $this->addSql('CREATE INDEX IDX_3C496767A76ED395 ON departures (user_id)');
        $this->addSql('CREATE INDEX IDX_3C4967678E4F209D ON departures (highway_id)');
        $this->addSql('CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, external_id VARCHAR(50) DEFAULT NULL, email VARCHAR(255) NOT NULL, fname VARCHAR(50) DEFAULT NULL, lname VARCHAR(50) DEFAULT NULL, traffic_spike_alert_enabled BOOLEAN NOT NULL, reminder_alert_enabled BOOLEAN NOT NULL, date_added DATETIME NOT NULL)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'sqlite', 'Migration can only be executed safely on \'sqlite\'.');

        $this->addSql('DROP TABLE highways');
        $this->addSql('DROP TABLE hurricanes');
        $this->addSql('DROP TABLE departures');
        $this->addSql('DROP TABLE users');
    }
}
