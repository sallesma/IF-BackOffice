<?php

require_once 'EntityManager.php';

class ArtistsManager extends EntityManager
{
    public function listAll()
    {
        return json_encode(parent::listAll(ARTISTS_TABLE, array('id', ' name', ' style', ' day', ' stage', ' beginHour'), 'name'));
    }

    public function add($params)
    {
        return parent::add(ARTISTS_TABLE, $params);
    }

    public function find($id)
    {
        return json_encode(parent::find(ARTISTS_TABLE, $id));
    }

    public function update($id, $params)
    {
        parent::update(ARTISTS_TABLE, $id, $params);
    }

    public function delete($id)
    {
        $connection = Connection::getInstance();

        return parent::delete(ARTISTS_TABLE, $id, function () use ($connection, $id) {
            $sth = $connection->prepare('SELECT picture FROM ' . ARTISTS_TABLE . ' WHERE id = :id');
            $sth->execute(array(
                ':id' => $id
            ));

            if ($artist = $sth->fetch(PDO::FETCH_ASSOC)) {
                // Delete artist picture
                if (!empty($artist['picture'])) {
                    $picturePath = substr($artist['picture'], strpos($artist['picture'], '/src'));
                    if (!@unlink(getcwd() . $picturePath)) {
                        echo ('Error deleting : ' . $picturePath);
                    }
                }
            }
        });
    }
}
