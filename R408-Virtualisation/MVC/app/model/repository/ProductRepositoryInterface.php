<?php
namespace app\model\repository;
Interface ProductRepositoryInterface
{
    public function findAll(): array;
    public function findById(int $id):?\app\model\entity\ProductEntity;
    public function add(\app\model\entity\ProductEntity $product):?\app\model\entity\ProductEntity;
    public function update(int $id, \app\model\entity\ProductEntity $product):?\app\model\entity\ProductEntity;
    public function delete(int $id): bool;

}