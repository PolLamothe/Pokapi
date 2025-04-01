<?php
namespace app\controller;
    session_start();
    
    if (!isset($_SESSION['login'])) {
        require 'view'.DIRECTORY_SEPARATOR.'accessDenied.php';
        die();
    }
    else {
        if ($_SESSION['login']['status']!='Administrator') {
            require 'view'.DIRECTORY_SEPARATOR.'accessDenied.php';
            die();
        }
    }


class Product
{
    private \app\model\repository\ProductRepositoryInterface $repository;
    public function __construct()
    {
        $this->repository = new \app\model\repository\DbProductRepository();
    }

    function add(){
        require "view".DIRECTORY_SEPARATOR."addProduct.php";
    }

    function addProduct(){
        $product = new \app\model\entity\ProductEntity();
        $product->setId(intval($_POST["id"]));
        $product->setName($_POST["name"]);
        $product->setPrice(floatval($_POST["price"]));
        $product->setQuantity(intval($_POST["quantity"]));
        $product = $this->repository->add($product);
        require "view".DIRECTORY_SEPARATOR."displayProduct.php";

    }

    function display(  array $params){
        $id = intval($params[0]);
        $product =  $this->repository->findById($id);
        require "view".DIRECTORY_SEPARATOR."displayProduct.php";
    }

    function update(array $params){
        $id = intval($params[0]);
        $product =  $this->repository->findById($id);
        require "view".DIRECTORY_SEPARATOR."updateProduct.php";
    }

    function updateProduct(){
        $idS = $_POST['idS'];
        $product=new \app\model\entity\ProductEntity();
        $product->setId(intval($_POST["id"]));
        $product->setName($_POST["name"]);
        $product->setPrice(floatval($_POST["price"]));
        $product->setQuantity(intval($_POST["quantity"]));
        $product=$this->repository->update($idS,$product);
        require "view".DIRECTORY_SEPARATOR."displayProduct.php";
    }


    function delete(array $params){
        $id = intval($params[0]);
        $res =  $this->repository->delete($id);
        header("Location: ".CFG["siteURL"]."Home");

    }
}