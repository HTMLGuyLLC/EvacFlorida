<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\HighwaysRepository")
 */
class Highways
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=10)
     */
    private $name;

    /**
     * @ORM\Column(type="json_array", nullable=true)
     */
    private $directions = [];

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Departures", mappedBy="highway")
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

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getDirections(): ?array
    {
        return $this->directions;
    }

    public function setDirections(?array $directions): self
    {
        $this->directions = $directions;

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
            $departure->setHighway($this);
        }

        return $this;
    }

    public function removeDeparture(Departures $departure): self
    {
        if ($this->departures->contains($departure)) {
            $this->departures->removeElement($departure);
            // set the owning side to null (unless already changed)
            if ($departure->getHighway() === $this) {
                $departure->setHighway(null);
            }
        }

        return $this;
    }
}
