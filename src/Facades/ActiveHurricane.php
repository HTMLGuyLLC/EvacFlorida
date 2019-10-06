<?php
namespace App\Facades;

use App\Entity\Hurricanes;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

/**
 * Class ActiveHurricane
 * @package App\Facades
 */
class ActiveHurricane
{
    /**
     * Grabs the active hurricane, if exists
     *
     * @param EntityManagerInterface $em
     * @return Hurricanes|null
     * @throws \Doctrine\DBAL\DBALException
     */
    public static function getActiveHurricane(EntityManagerInterface $em): ?Hurricanes{

        //see if one exists
        $sql = "SELECT id FROM hurricanes WHERE start_date <= :now AND end_date >= :now";
        $hurricane_id = $em->getConnection()->fetchAssoc($sql, [
            'now'=>(new \DateTime())->format("Y-m-d H:i:s")
        ]);

        //return the Hurricane object, or null
        return $hurricane_id ? $em->find(Hurricanes::class, $hurricane_id) : null;
    }

    /**
     * Requires an active hurricane to exist or throws an exception (to be used in controllers)
     *
     * @param EntityManagerInterface $em
     * @param bool $throwException
     * @return Hurricanes|false
     * @throws \Doctrine\DBAL\DBALException
     */
    public static function getAndRequireHurricane(EntityManagerInterface $em, bool $throwException = true){
        //get active hurricane, if exists
        $hurricane = self::getActiveHurricane($em);

        //if not, throw exception or return false
        if( !$hurricane ){
            if( $throwException ){
                throw new BadRequestHttpException('There is no active hurricane.', null, Response::HTTP_BAD_REQUEST);
            }
            return false;
        }

        //return the object or false
        return $hurricane ? $hurricane : false;
    }
}