<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\DeparturesRepository")
 */
class Departures
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Hurricanes", inversedBy="departures")
     * @ORM\JoinColumn(nullable=false)
     */
    private $hurricane;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Users", inversedBy="departures")
     * @ORM\JoinColumn(nullable=false)
     */
    private $user;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Highways", inversedBy="departures")
     * @ORM\JoinColumn(nullable=true)
     */
    private $highway;

    /**
     * @ORM\Column(type="string", length=1, nullable=true)
     */
    private $direction;

    /**
     * @ORM\Column(type="integer")
     */
    private $traffic_when_added = 0;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $date;

    /**
     * @ORM\Column(type="datetime")
     */
    private $date_added;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $date_updated;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $last_alert_date;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getHurricane(): ?Hurricanes
    {
        return $this->hurricane;
    }

    public function setHurricane(?Hurricanes $hurricane): self
    {
        $this->hurricane = $hurricane;

        return $this;
    }

    public function getUser(): ?Users
    {
        return $this->user;
    }

    public function setUser(?Users $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getHighway(): ?Highways
    {
        return $this->highway;
    }

    public function setHighway(?Highways $highway): self
    {
        $this->highway = $highway;

        return $this;
    }

    public function getDirection(): ?string
    {
        return $this->direction;
    }

    public function setDirection(?string $direction): self
    {
        $this->direction = $direction;

        return $this;
    }

    public function getTrafficWhenAdded(): ?int
    {
        return $this->traffic_when_added;
    }

    public function setTrafficWhenAdded(int $traffic_when_added): self
    {
        $this->traffic_when_added = $traffic_when_added;

        return $this;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(?\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }

    public function getDateAdded(): ?\DateTimeInterface
    {
        return $this->date_added;
    }

    public function setDateAdded(\DateTimeInterface $date_added): self
    {
        $this->date_added = $date_added;

        return $this;
    }

    public function getDateUpdated(): ?\DateTimeInterface
    {
        return $this->date_updated;
    }

    public function setDateUpdated(?\DateTimeInterface $date_updated): self
    {
        $this->date_updated = $date_updated;

        return $this;
    }

    public function getLastAlertDate(): ?\DateTimeInterface
    {
        return $this->last_alert_date;
    }

    public function setLastAlertDate(?\DateTimeInterface $last_alert_date): self
    {
        $this->last_alert_date = $last_alert_date;

        return $this;
    }
}
