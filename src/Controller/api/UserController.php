<?php

namespace App\Controller\api;

use App\Entity\Highways;
use App\Entity\Users;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController as Controller;

class UserController extends Controller
{
    /**
     * @TODO: Secure this by using an Auth0 token instead of email.
     *  This is a quick fix/match since the site doesn't require extreme security
     *
     * No endpoints allow you to do anything using the user ID, so it's not a big deal.
     *
     * @Route("/get-or-create-user", methods="POST", name="get-or-create-user")
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     * @throws \Exception
     */
    public function getOrCreateUser(Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        //get email from request
        $email = $request->get('email');

        //require email
        if (!$email || !mb_strlen(trim($email))) {
            throw new BadRequestHttpException('Email is required', null, Response::HTTP_BAD_REQUEST);
        }

        $user = null;

        //prefer external id (email may have changed)
        if ($external_id = $request->get('external_id')) {
            $user = $em->getRepository(Users::class)->findOneBy([
                'external_id' => $external_id
            ]);
        }

        //if user not found by external, try email
        if (!$user) {
            $user = $em->getRepository(Users::class)->findOneBy([
                'email' => $email
            ]);
        }

        //if no user, create one
        if (!$user) {
            $user = new Users();
            $user->setExternalId($request->get('external_id'));
            $user->setFname($request->get('fname'));
            $user->setLname($request->get('lname'));
            $user->setEmail($email);
            $user->setReminderAlertEnabled(true);
            $user->setDateAdded(new \DateTime());

            $em->persist($user);
        }

        $em->flush();

        return $this->json([
            'user' => self::getData($user)
        ]);
    }

    /**
     * @param Users $user
     * @return array
     */
    public static function getData(Users $user)
    {
        return [
            'id' => $user->getId(),
            'external_id' => $user->getExternalId(),
            'fname' => $user->getFname() ?? '', //TextFields in JS hate null values
            'lname' => $user->getLname() ?? '', //TextFields in JS hate null values
            'email' => $user->getEmail(),
            'reminder_alert' => $user->getReminderAlertEnabled(),
            'spike_alert' => $user->getTrafficSpikeAlertEnabled(),
        ];
    }
}