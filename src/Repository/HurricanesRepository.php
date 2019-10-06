<?php

namespace App\Repository;

use App\Entity\Hurricanes;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method Hurricanes|null find($id, $lockMode = null, $lockVersion = null)
 * @method Hurricanes|null findOneBy(array $criteria, array $orderBy = null)
 * @method Hurricanes[]    findAll()
 * @method Hurricanes[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class HurricanesRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Hurricanes::class);
    }

    // /**
    //  * @return Hurricanes[] Returns an array of Hurricanes objects
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
    public function findOneBySomeField($value): ?Hurricanes
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
