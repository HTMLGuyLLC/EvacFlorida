<?php

namespace App\Repository;

use App\Entity\Highways;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method Highways|null find($id, $lockMode = null, $lockVersion = null)
 * @method Highways|null findOneBy(array $criteria, array $orderBy = null)
 * @method Highways[]    findAll()
 * @method Highways[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class HighwaysRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Highways::class);
    }

    // /**
    //  * @return Highways[] Returns an array of Highways objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('h')
            ->andWhere('h.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('h.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Highways
    {
        return $this->createQueryBuilder('h')
            ->andWhere('h.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
