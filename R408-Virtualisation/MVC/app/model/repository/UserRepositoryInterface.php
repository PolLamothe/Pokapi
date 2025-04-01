<?php
namespace app\model\repository;
Interface UserRepositoryInterface
{
    public function findAll(): array;
    public function findByPseudo(string $pseudo):?\app\model\entity\UserEntity;
    public function add(\app\model\entity\UserEntity $user):?\app\model\entity\UserEntity;
    public function delete(string $pseudo):bool;
    public function update(string $pseudoS, \app\model\entity\UserEntity $user):?\app\model\entity\UserEntity;
}