<?php
namespace system;

class SPDO
{
    private \PDO $connexion;
    private static ?SPDO $PDOInstance=null;

    private function __construct(string $dsn,
                                  ?string $username = null,
                                  ?string $password = null,
                                  ?array $options = null,
                                  ?string $exec = null)
    {
        $this->connexion = new \PDO($dsn,$username , $password, $options);
        $this->connexion->exec($exec);
    }

    public static function getInstance(string $dsn,
                                       ?string $username = null,
                                       ?string $password = null,
                                       ?array $options = null,
                                       ?string $exec = null):\system\SPDO
    {
        if(!self::$PDOInstance)
        {
            self::$PDOInstance = new \system\SPDO($dsn,$username , $password, $options, $exec);
        }
        return self::$PDOInstance;
    }

    public function getConnexion():\PDO{
        return $this->connexion;
    }
}