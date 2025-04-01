<?php
namespace app\controller;

class User
{
    private \app\model\repository\UserRepositoryInterface $repository;
    public function __construct()
    {
        $this->repository = new \app\model\repository\DbUserRepository();
    }

    function login(){
        require "view".DIRECTORY_SEPARATOR."login.php";
    }

    function loginCheck(){

        $pseudo = $_POST['pseudo'];
        $password = $_POST ['password'];
        $user = $this->repository->findByPseudo($pseudo);

        if ($user !=null && $user->isValidPassword($password)) {
            session_start();
            $_SESSION['login']=array("pseudo"=>$user->getPseudo(), "status"=>$user->getStatus());
            header("Location: ".CFG['siteURL']."Home");
            die();
        }
        require 'view'.DIRECTORY_SEPARATOR.'accessDenied.php';

    }
    function logout(){
        session_start();
        unset($_SESSION["login"]);
        header("Location: ".CFG['siteURL']."Home");
    }

}