<?php

namespace app\model\repository;
    class MemoryProductRepository implements ProductRepositoryInterface
{

    public function findAll(): array
    {
        $p1 = new ProductEntity();
        $p2 = new ProductEntity();
        return array(
            new Product("1", "p1",10.0,1),
            new Product("2", "p2",20.0,2));

    }

        public function add(ProductEntity $product): ProductEntity
        {
            // TODO: Implement add() method.
        }

        public function findById(int $id): ?ProductEntity
        {
            // TODO: Implement findById() method.
        }

        public function update(int $id, ProductEntity $product): ProductEntity
        {
            // TODO: Implement update() method.
        }

        public function delete(int $id): bool
        {
            // TODO: Implement delete() method.
        }
    }