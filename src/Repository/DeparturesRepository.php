<?php

namespace App\Repository;

use App\Entity\Departures;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method Departures|null find($id, $lockMode = null, $lockVersion = null)
 * @method Departures|null findOneBy(array $criteria, array $orderBy = null)
 * @method Departures[]    findAll()
 * @method Departures[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class DeparturesRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Departures::class);
    }

    // /**
    //  * @return Departures[] Returns an array of Departures objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('d')
            ->andWhere('d.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('d.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Departures
    {
        return $this->createQueryBuilder('d')
            ->andWhere('d.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
