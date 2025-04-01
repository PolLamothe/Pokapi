<?php
namespace app\controller;

class Home
{
    private \app\model\repository\ProductRepositoryInterface $repository;
    public function __construct()
    {
        $this->repository = new \app\model\repository\DbProductRepository();
    }

    function index(){
        $data = $this->repository->findAll();
        require "view".DIRECTORY_SEPARATOR."home.php";

    }


}
