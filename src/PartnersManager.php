<?php

require_once 'EntityManager.php';

class PartnersManager extends EntityManager
{
    public function listAll()
    {
        return json_encode(parent::listAll(PARTNERS_TABLE, array('id', 'name', 'picture', 'website', 'priority'), 'priority DESC, name'));
    }

    public function add($params)
    {
        var_dump($params);
        return parent::add(PARTNERS_TABLE, $params);
    }

    public function update($id, $params)
    {
        return parent::update(PARTNERS_TABLE, $id, $params, function ($connection, $id, $params) {
            $connection = Connection::getInstance();
            $sth = $connection->prepare('SELECT picture FROM ' . PARTNERS_TABLE . 'WHERE id = :id');
            $sth->execute(array(
                'id' => $id
            ));

            if ($partner = $sth->fetch()) {
                // Delete partner picture
                if (!empty($partner['picture']) && $partner['picture'] != $params['picture']) {
                    $picturePath = substr($partner['picture'], strpos($partner['picture'], '/src'));
                    if (!@unlink(getcwd() . $picturePath)) {
                        echo ('Error deleting : ' . $picturePath);
                    }
                }
            }
        });
    }

    public function delete($id)
    {
        return parent::delete(PARTNERS_TABLE, $id, function ($connection, $id) {
            $connection = Connection::getInstance();
            $sth = $connection->prepare('SELECT picture FROM ' . PARTNERS_TABLE . 'WHERE id = :id');
            $sth->execute(array(
                'id' => $id
            ));

            if ($partner = $sth->fetch()) {
                // Delete partner picture
                if (!empty($partner['picture'])) {
                    $picturePath = substr($partner['picture'], strpos($partner['picture'], '/src'));
                    if (!@unlink(getcwd() . $picturePath)) {
                        echo ('Error deleting : ' . $picturePath);
                    }
                }
            }
        });
    }
}
