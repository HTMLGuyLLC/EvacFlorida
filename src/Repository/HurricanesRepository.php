<?php

namespace App\Repository;

use App\Entity\Hurricanes;
use DateTime;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;
use Doctrine\DBAL\DBALException;
use Doctrine\ORM\EntityManagerInterface;

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

    /**
     * Grabs the active hurricane, if exists
     *
     * @return Hurricanes|null
     * @throws DBALException
     * @throws \Doctrine\ORM\ORMException
     * @throws \Doctrine\ORM\OptimisticLockException
     * @throws \Doctrine\ORM\TransactionRequiredException
     */
    public function getActive(): ?Hurricanes
    {
        $em = $this->getEntityManager();

        //see if one exists
        $sql = "SELECT id FROM hurricanes WHERE start_date <= :now AND end_date >= :now";
        $hurricane_id = $em->getConnection()->fetchAssoc($sql, [
            'now' => (new DateTime())->format("Y-m-d H:i:s")
        ]);

        //return the Hurricane object, or null
        return $hurricane_id ? $em->find(Hurricanes::class, $hurricane_id) : null;
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
