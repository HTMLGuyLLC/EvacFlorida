<?php

namespace App\Controller\api;

use App\Entity\Departures;
use App\Entity\Highways;
use App\Entity\Users;
use App\Facades\ActiveHurricane;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController as Controller;

class DeparturesController extends Controller
{
    /**
     * @Route("/departures", methods="POST", name="add-departure")
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     * @throws \Doctrine\DBAL\DBALException
     */
    public function addDeparture(Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        $hurricane = ActiveHurricane::getAndRequireHurricane($em);

        //field=>label (for error messages)
        $fields = [
            'date' => 'Departure Date/Time',
            'highway' => 'Highway',
            'direction' => 'Direction',
            'email' => 'Email',
        ];

        //set a list of required fields
        $required = [
            'email'
        ];

        //get the fact that they're leaving or not
        $is_leaving = $request->get('is_leaving');

        //if they're leaving, additional fields are required
        if ($is_leaving) {
            $required = array_merge($required, [
                'date',
                'highway',
                'direction'
            ]);
        }

        //validate all required fields are set
        foreach ($required as $req) {
            //nothing should be 0, so we can just verify again truthy values and strlen with trim
            if (!$request->get($req) || !mb_strlen(trim($request->get($req)))) {
                return $this->json([
                    'msg'=>$fields[$req] . ' is required.',
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }
        }

        //validate email format
        $email = $request->get('email');
        if (filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
            return $this->json([
                'msg'=>'Please enter a valid email address.',
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        //get user, if exists, by email
        $user = $em->getRepository(Users::class)->findOneBy([
            'email' => $email
        ]);

        //if not, create user
        if (!$user) {
            $user = new Users();
            $user->setEmail($email);
            $user->setDateAdded(new \DateTime());

            $em->persist($user);
        }

        //get departure, if exists
        $departure = $em->getRepository(Departures::class)->findOneBy([
            'user' => $user,
            'hurricane' => $hurricane
        ]);

        //if not, create departure
        if (!$departure) {
            $departure = new Departures();
            $departure->setUser($user);
            $departure->setHurricane($hurricane);
            $departure->setDateAdded(new \DateTime());
            /** @Todo: Set traffic count when this departure was added for alerting of spikes */
//        $departure->setTrafficWhenAdded();

            $em->persist($departure);
        } else {
            $departure->setDateUpdated(new \DateTime());
        }

        //additional fields required if leaving
        if ($is_leaving) {

            //validate date format by just passing it to the DateTime constructor, for now
            try {
                $date = new \DateTime($request->get('date'));
            } catch (\Throwable $t) {
                return $this->json([
                    'msg'=>'Invalid date format',
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            //validate that the departure date is between the hurricane dates
            if ($date < $hurricane->getStartDate()) {
                return $this->json([
                    'msg'=>'Please choose a departure date after ' . $hurricane->getStartDate()->format("m/d g:ia"),
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }
            if ($date > $hurricane->getEndDate()) {
                return $this->json([
                    'msg'=>'Please choose a departure date before ' . $hurricane->getEndDate()->format("m/d g:ia"),
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            $departure->setDate($date);

            $highway_id = $request->get('highway');
            //get highway
            $highway = $em->find(Highways::class, $highway_id);

            //if highway wasn't found...they probably tampered with the POST
            if (!$highway) {
                return $this->json([
                    'msg'=>'Invalid highway',
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            //validate the direction they are traveling on the highway (should never be incorrect unless tampered with)
            $direction = $request->get('direction');
            if (!in_array($direction, ['N', 'S', 'E', 'W']) || !in_array($direction, $highway->getDirections())) {
                return $this->json([
                    'msg'=>'Invalid direction',
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            $departure->setHighway($highway);
            $departure->setDirection($direction);
        }

        $em->flush();

        return $this->json([
            'departure' => [
                'id' => $departure->getId(),
            ],
            'user' => [
                'id' => $user->getId()
            ],
        ]);
    }
}