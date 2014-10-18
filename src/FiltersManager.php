<?php

require_once 'EntityManager.php';

class FiltersManager extends EntityManager
{
    public function listAll()
    {
        return json_encode(parent::listAll(FILTERS_TABLE, array('id', 'picture')));
    }
    
    public function getYears()
    {
        return parent::getColumnValues(FILTERS_TABLE, 'year');
    }

    public function add($params)
    {
        return parent::add(FILTERS_TABLE, $params);
    }

    public function delete($id)
    {
        $connection = Connection::getInstance();

        return parent::delete(FILTERS_TABLE, $id, function () use ($connection, $id) {
            $sth = $connection->prepare('SELECT picture FROM ' . FILTERS_TABLE . ' WHERE id = :id');
            $sth->execute(array(
                ':id' => $id
            ));

            if ($filter = $sth->fetch(PDO::FETCH_ASSOC)) {
                // Delete filter picture
                if (!empty($filter['picture'])) {
                    $picturePath = substr($filter['picture'], strpos($filter['picture'], '/src'));
                    if (!@unlink(getcwd() . $picturePath)) {
                        echo ('Error deleting : ' . $picturePath);
                    }
                }
            }
        });
    }
}
