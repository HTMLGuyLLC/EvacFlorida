<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\UsersRepository")
 */
class Users
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=50, nullable=true)
     */
    private $external_id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=50, nullable=true)
     */
    private $fname;

    /**
     * @ORM\Column(type="string", length=50, nullable=true)
     */
    private $lname;

    /**
     * @ORM\Column(type="boolean")
     */
    private $traffic_spike_alert_enabled;

    /**
     * @ORM\Column(type="boolean")
     */
    private $reminder_alert_enabled;

    /**
     * @ORM\Column(type="datetime")
     */
    private $date_added;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Departures", mappedBy="user")
     */
    private $departures;

    public function __construct()
    {
        $this->departures = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getExternalId(): ?string
    {
        return $this->external_id;
    }

    public function setExternalId(?string $external_id): self
    {
        $this->external_id = $external_id;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getFname(): ?string
    {
        return $this->fname;
    }

    public function setFname(?string $fname): self
    {
        $this->fname = $fname;

        return $this;
    }

    public function getLname(): ?string
    {
        return $this->lname;
    }

    public function setLname(?string $lname): self
    {
        $this->lname = $lname;

        return $this;
    }

    public function getTrafficSpikeAlertEnabled(): ?bool
    {
        return $this->traffic_spike_alert_enabled;
    }

    public function setTrafficSpikeAlertEnabled(bool $traffic_spike_alert_enabled): self
    {
        $this->traffic_spike_alert_enabled = $traffic_spike_alert_enabled;

        return $this;
    }

    public function getReminderAlertEnabled(): ?bool
    {
        return $this->reminder_alert_enabled;
    }

    public function setReminderAlertEnabled(bool $reminder_alert_enabled): self
    {
        $this->reminder_alert_enabled = $reminder_alert_enabled;

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

    /**
     * @return Collection|Departures[]
     */
    public function getDepartures(): Collection
    {
        return $this->departures;
    }

    public function addDeparture(Departures $departure): self
    {
        if (!$this->departures->contains($departure)) {
            $this->departures[] = $departure;
            $departure->setUser($this);
        }

        return $this;
    }

    public function removeDeparture(Departures $departure): self
    {
        if ($this->departures->contains($departure)) {
            $this->departures->removeElement($departure);
            // set the owning side to null (unless already changed)
            if ($departure->getUser() === $this) {
                $departure->setUser(null);
            }
        }

        return $this;
    }
}
