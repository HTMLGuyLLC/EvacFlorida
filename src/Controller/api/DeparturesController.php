<?php
namespace App\Controller\api;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController as Controller;

class DeparturesController extends Controller
{
    /**
     * @Route("/departures", methods="POST", name="add-departure")
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function addDeparture(Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        $required = [
            'email'
        ];

        $is_leaving = $request->get('is_leaving');

        if( $is_leaving ){
            $required = array_merge($required, [
                'date' ,
                'highway',
                'direction'
            ]);
        }

        foreach($required as $req){
            if( !$request->get($req) ){
                throw new BadRequestHttpException('', null, 418);
            }
        }

        $email = $request->get('email');
        if( !$email ){
            throw new BadRequestHttpException('Email is required', null, 418);
        }

        foreach($highways as $key=>$highway){
            $highways[$key] = self::getData($highway);
        }

        return $this->json([
            'highways'=>$highways
        ]);
    }
}