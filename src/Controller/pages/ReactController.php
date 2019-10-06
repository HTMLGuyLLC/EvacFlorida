<?php
namespace App\Controller\pages;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController as Controller;

class ReactController extends Controller
{
    /**
     * @Route("/{reactRouting}", name="index", defaults={"reactRouting": null})
     */
    public function reactAction()
    {
        return $this->render('pages/homepage.html.twig');
    }
}