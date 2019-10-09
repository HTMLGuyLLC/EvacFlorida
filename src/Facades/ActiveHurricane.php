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
     * Requires an active hurricane to exist or throws an exception (to be used in controllers)
     *
     * @param EntityManagerInterface $em
     * @param bool $throwException
     * @return Hurricanes|false
     * @throws \Doctrine\DBAL\DBALException
     */
    public static function getAndRequireHurricane(EntityManagerInterface $em, bool $throwException = true)
    {
        //get active hurricane, if exists
        $hurricane = $em->getRepository(Hurricanes::class)->getActive();

        //if not, throw exception or return false
        if (!$hurricane) {
            if ($throwException) {
                throw new BadRequestHttpException('There is no active hurricane.', null, Response::HTTP_BAD_REQUEST);
            }
            return false;
        }

        //return the object or false
        return $hurricane ? $hurricane : false;
    }
}