<?php

namespace App\Controller\api;

use App\Entity\Highways;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController as Controller;

class HighwaysController extends Controller
{
    /**
     * @Route("/highways", methods="GET", name="get-highways")
     */
    public function getHighways()
    {
        $em = $this->getDoctrine()->getManager();
        $highways = $em->getRepository(Highways::class)->findAll();

        foreach ($highways as $key => $highway) {
            $highways[$key] = self::getData($highway);
        }

        return $this->json([
            'highways' => $highways
        ]);
    }

    /**
     * @param Highways $highway
     * @return array
     */
    public static function getData(Highways $highway)
    {
        return [
            'id' => $highway->getId(),
            'name' => $highway->getName(),
            'directions' => $highway->getDirections()
        ];
    }
}