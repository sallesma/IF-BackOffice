<?php

// Tables Names
define("ARTISTS_TABLE","bo_artists");
define("FILTERS_TABLE","bo_filters");
define("INFOS_TABLE","bo_infos");
define("MAP_TABLE","bo_map");
define("NEWS_TABLE","bo_news");
define("PARTNERS_TABLE","bo_partners");

// Database Connection
class Connection
{
    private static $connection;

    public static function getInstance()
    {
        if (is_null(self::$connection)) {
            self::$connection = self::createInstance();
        }

        return self::$connection;
    }

    private static function createInstance()
    {
        $connection = null;

        try {
            $infos = parse_ini_file('parameters.ini', true);

            if (!$infos) {
                die('Missing parameters.ini file in src/ folder !');
            }

            $driver = $infos['connection']['db_driver'];
            $dsn = "${driver}:";
            foreach ($infos["dsn"] as $key => $value) {
                $dsn .= "${key}=${value};" ;
            }

            $connection = new PDO($dsn, $infos['connection']['db_user'], $infos['connection']['db_password']);
            $connection->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        }
        catch (PDOException $e) {
            die($e->getMessage());
        }

        return $connection;
    }
}
