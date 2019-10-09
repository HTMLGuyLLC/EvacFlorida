<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20191007150027 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'sqlite', 'Migration can only be executed safely on \'sqlite\'.');

        $this->addSql('DROP INDEX IDX_3C4967678E4F209D');
        $this->addSql('DROP INDEX IDX_3C496767A76ED395');
        $this->addSql('DROP INDEX IDX_3C496767F3BF7FF6');
        $this->addSql('CREATE TEMPORARY TABLE __temp__departures AS SELECT id, hurricane_id, user_id, highway_id, direction, traffic_when_added, date, date_added, date_updated, last_alert_date FROM departures');
        $this->addSql('DROP TABLE departures');
        $this->addSql('CREATE TABLE departures (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, hurricane_id INTEGER NOT NULL, user_id INTEGER NOT NULL, highway_id INTEGER DEFAULT NULL, direction VARCHAR(1) DEFAULT NULL COLLATE BINARY, traffic_when_added INTEGER NOT NULL, date DATETIME DEFAULT NULL, date_added DATETIME NOT NULL, date_updated DATETIME DEFAULT NULL, last_alert_date DATETIME DEFAULT NULL, CONSTRAINT FK_3C496767F3BF7FF6 FOREIGN KEY (hurricane_id) REFERENCES hurricanes (id) NOT DEFERRABLE INITIALLY IMMEDIATE, CONSTRAINT FK_3C496767A76ED395 FOREIGN KEY (user_id) REFERENCES users (id) NOT DEFERRABLE INITIALLY IMMEDIATE, CONSTRAINT FK_3C4967678E4F209D FOREIGN KEY (highway_id) REFERENCES highways (id) NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('INSERT INTO departures (id, hurricane_id, user_id, highway_id, direction, traffic_when_added, date, date_added, date_updated, last_alert_date) SELECT id, hurricane_id, user_id, highway_id, direction, traffic_when_added, date, date_added, date_updated, last_alert_date FROM __temp__departures');
        $this->addSql('DROP TABLE __temp__departures');
        $this->addSql('CREATE INDEX IDX_3C4967678E4F209D ON departures (highway_id)');
        $this->addSql('CREATE INDEX IDX_3C496767A76ED395 ON departures (user_id)');
        $this->addSql('CREATE INDEX IDX_3C496767F3BF7FF6 ON departures (hurricane_id)');
        $this->addSql('CREATE TEMPORARY TABLE __temp__highways AS SELECT id, name, directions FROM highways');
        $this->addSql('DROP TABLE highways');
        $this->addSql('CREATE TABLE highways (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name VARCHAR(10) NOT NULL COLLATE BINARY, directions CLOB DEFAULT NULL --(DC2Type:json_array)
        )');
        $this->addSql('INSERT INTO highways (id, name, directions) SELECT id, name, directions FROM __temp__highways');
        $this->addSql('DROP TABLE __temp__highways');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'sqlite', 'Migration can only be executed safely on \'sqlite\'.');

        $this->addSql('DROP INDEX IDX_3C496767F3BF7FF6');
        $this->addSql('DROP INDEX IDX_3C496767A76ED395');
        $this->addSql('DROP INDEX IDX_3C4967678E4F209D');
        $this->addSql('CREATE TEMPORARY TABLE __temp__departures AS SELECT id, hurricane_id, user_id, highway_id, direction, traffic_when_added, date, date_added, date_updated, last_alert_date FROM departures');
        $this->addSql('DROP TABLE departures');
        $this->addSql('CREATE TABLE departures (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, hurricane_id INTEGER NOT NULL, user_id INTEGER NOT NULL, direction VARCHAR(1) DEFAULT NULL, traffic_when_added INTEGER NOT NULL, date DATETIME DEFAULT NULL, date_added DATETIME NOT NULL, date_updated DATETIME DEFAULT NULL, last_alert_date DATETIME DEFAULT NULL, highway_id INTEGER NOT NULL)');
        $this->addSql('INSERT INTO departures (id, hurricane_id, user_id, highway_id, direction, traffic_when_added, date, date_added, date_updated, last_alert_date) SELECT id, hurricane_id, user_id, highway_id, direction, traffic_when_added, date, date_added, date_updated, last_alert_date FROM __temp__departures');
        $this->addSql('DROP TABLE __temp__departures');
        $this->addSql('CREATE INDEX IDX_3C496767F3BF7FF6 ON departures (hurricane_id)');
        $this->addSql('CREATE INDEX IDX_3C496767A76ED395 ON departures (user_id)');
        $this->addSql('CREATE INDEX IDX_3C4967678E4F209D ON departures (highway_id)');
        $this->addSql('CREATE TEMPORARY TABLE __temp__highways AS SELECT id, name, directions FROM highways');
        $this->addSql('DROP TABLE highways');
        $this->addSql('CREATE TABLE highways (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name VARCHAR(10) NOT NULL, directions CLOB DEFAULT \'NULL --(DC2Type:json_array)\' COLLATE BINARY --(DC2Type:json_array)
        )');
        $this->addSql('INSERT INTO highways (id, name, directions) SELECT id, name, directions FROM __temp__highways');
        $this->addSql('DROP TABLE __temp__highways');
    }
}
