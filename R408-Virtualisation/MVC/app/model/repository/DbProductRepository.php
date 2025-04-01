<?php

namespace app\model\repository;
class DbProductRepository implements ProductRepositoryInterface
{
    private $connexion;

    public function __construct()
    {
        $dsn = "sqlite:".CFG["db"]["host"].CFG["db"]["database"];
        $this->connexion = \system\SPDO::getInstance($dsn,CFG["db"]["login"],CFG["db"]["password"],CFG["db"]["options"],CFG["db"]["exec"])
            ->getConnexion();
    }

    public function findAll(): array
    {
        $statement = $this->connexion->prepare("SELECT * FROM product");
        $statement->execute();
        return $statement->fetchAll(\PDO::FETCH_CLASS, "\app\model\Entity\ProductEntity");
    }

    public function add(\app\model\entity\ProductEntity $product): \app\model\entity\ProductEntity
    {
        $id = $product->getId();
        $name = $product->getName();
        $price = $product->getPrice();
        $quantity = $product->getQuantity();
        try {
            $statement = $this->connexion->prepare("insert into product values(:id,:name,:price,:quantity)");
            $statement->bindParam('id', $id);
            $statement->bindParam('name', $name);
            $statement->bindParam('price', $price);
            $statement->bindParam('quantity', $quantity);
            $statement->execute();
        } catch (Exception $e){}
        $product = $this->findById($id);
        return $product;
    }

    public function findById(int $id): ?\app\model\entity\ProductEntity
    {

        $statement = $this->connexion->prepare("select *
            from  product where id=:id");
        $statement->bindParam('id',$id);
        $statement->execute();
        $res = $statement->fetch(\PDO::FETCH_ASSOC);
        $product = null;
        if ($res) {
            $product = new \app\model\entity\ProductEntity();
            $product->setId($res["id"]);
            $product->setName($res["name"]);
            $product->setPrice($res["price"]);
            $product->setQuantity($res["quantity"]);
        }
        return $product;
    }

    public function update(int $idS, \app\model\entity\ProductEntity $product): \app\model\entity\ProductEntity
    {
        $id = $product->getId();
        $name = $product->getName();
        $price = $product->getPrice();
        $quantity = $product->getQuantity();
        try{
        $statement = $this->connexion->prepare("
            update product 
            set id=:id, name=:name, price=:price, quantity=:quantity
            where id=:idS");
        $statement->bindParam('idS',$idS);
        $statement->bindParam('id', $id);
        $statement->bindParam('name', $name);
        $statement->bindParam('price', $price);
        $statement->bindParam('quantity', $quantity);
        $statement->execute();
    } catch (Exception $e){}
        $product = $this->findById($id);
        return $product;
    }

    public function delete(int $id): bool
    {
        $statement = $this->connexion->prepare("delete 
            from  product where id=:id");
        $statement->bindParam('id',$id);
        $res = $statement->execute();
        return $res;
    }
}