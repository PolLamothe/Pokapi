<?php

namespace app\model\repository;
class DbUserRepository implements UserRepositoryInterface
{

    private $connexion;
    public function __construct()
    {
        //$dsn = "sqlite:".CFG["db"]["host"].CFG["db"]["database"];
        $dsn = "mysql:host=".CFG["db"]["host"].";dbname=".CFG["db"]["database"];
        $this->connexion = \system\SPDO::getInstance($dsn,CFG["db"]["login"],CFG["db"]["password"],CFG["db"]["options"],CFG["db"]["exec"])
            ->getConnexion();
    }

    public function findAll(): array
    {
        $statement = $this->connexion->prepare("SELECT * FROM user");
        $statement->execute();
        return $statement->fetchAll(PDO::FETCH_CLASS, "UserEntity");
    }

    public function findByPseudo(string $pseudo): ?\app\model\entity\UserEntity
    {
        $statement = $this->connexion->prepare("select *
            from  user where pseudo=:pseudo");
        $statement->bindParam('pseudo',$pseudo);
        $statement->execute();
        $res = $statement->fetch(\PDO::FETCH_ASSOC);
        $user = null;
        if ($res) {
            $user = new \app\model\entity\UserEntity();
            $user->setPseudo($res["pseudo"]);
            $user->setEncryptedPassword($res["password"]);
            $user->setStatus($res["status"]);
        }
        return $user;
    }

    public function add(\app\model\entity\UserEntity $user): ?\app\model\entity\UserEntity
    {
        $pseudo = $user->getPseudo();
        $password = $user->getPassword();
        $status = $user->getStatus();
        try {
            $statement = $this->connexion->prepare("insert into user values(:pseudo,:password,:status)");
            $statement->bindParam('pseudo', $id);
            $statement->bindParam('password', $password);
            $statement->bindParam('status', $status);
            $statement->execute();
        } catch (Exception $e){}
        $user = $this->findByPseudo($pseudo);
        return $user;
    }

    public function delete(string $pseudo): bool
    {
        $statement = $this->connexion->prepare("delete 
            from  user where pseudo=:pseudo");
        $statement->bindParam('pseudo',$pseudo);
        $res = $statement->execute();
        return $res;
    }

    public function update(string $pseudoS, \app\model\entity\UserEntity $user): ?\app\model\entity\UserEntity
    {
        $pseudo = $user->getPseudo();
        $password = $user->getPassword();
        $status = $user->getStatus();

        try{
            $statement = $this->connexion->prepare("
            update user 
            set pseudo=:pseudo, password=:password, status=:status
            where pseduo=:pseudoS");
            $statement->bindParam('pseudoS',$pseudoS);
            $statement->bindParam('pseudo', $pseudo);
            $statement->bindParam('password', $password);
            $statement->bindParam('status', $status);
            $statement->execute();
        } catch (Exception $e){}
        $user = $this->findByPseudo($user);
        return $user;
    }
}