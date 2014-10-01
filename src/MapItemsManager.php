<?php

require_once 'EntityManager.php';

class MapItemsManager extends EntityManager
{
    public function listAll()
    {
        return json_encode(parent::listAll(MAP_TABLE, array('id', 'label', 'x', 'y', 'infoId'), 'label'));
    }

    public function add($params)
    {
        $connection = Connection::getInstance();

        return parent::add(MAP_TABLE, $params, function () use ($connection, $params) {
            if ($params['infoId'] != '-1') {
                $sth = $connection->prepare('UPDATE ' . INFOS_TABLE . ' SET isDisplayedOnMap = :isDisplayedOnMap WHERE id = :id');
                $sth->execute(array(
                    'isDisplayedOnMap' => 1,
                    'id' => $params['infoId']
                ));
            }
        });
    }

    public function update($id, $params)
    {
        $connection = Connection::getInstance();

        return parent::update(MAP_TABLE, $id, $params, function () use ($connection, $id, $params) {
            if ($params['infoId'] != '-1') {
                $sth = $connection->prepare('SELECT infoId FROM ' . MAP_TABLE . ' WHERE id = :id');
                $sth->execute(array(
                    'id' => $id
                ));

                if ($mapItem = $sth->fetch()) {
                    if ($mapItem['infoId'] != $params['infoId']) {
                        $sth = $connection->prepare('UPDATE ' . INFOS_TABLE . ' SET isDisplayedOnMap = :isDisplayedOnMap WHERE id = :id');
                        $sth->execute(array(
                            'isDisplayedOnMap' => 0,
                            'id' => $mapItem['infoId']
                        ));

                        $sth = $connection->prepare('UPDATE ' . INFOS_TABLE . ' SET isDisplayedOnMap = :isDisplayedOnMap WHERE id = :id');
                        $sth->execute(array(
                            'isDisplayedOnMap' => 1,
                            'id' => $params['infoId']
                        ));
                    }
                }
            }
        });
    }

    public function delete($id)
    {
        return parent::delete(MAP_TABLE, $id, function ($connection, $id) {
            $connection = Connection::getInstance();
            $sth = $connection->prepare('SELECT infoId FROM ' . MAP_TABLE . ' WHERE id = :id');
            $sth->execute(array(
                'id' => $id
            ));

            if ($mapItem = $sth->fetch()) {
                if ($mapItem['infoId'] != '-1') {
                    $sth = $connection->prepare('UPDATE ' . INFOS_TABLE . ' SET isDisplayedOnMap = :isDisplayedOnMap WHERE id = :id');
                    $sth->execute(array(
                        'isDisplayedOnMap' => 0,
                        'id' => $mapItem['infoId']
                    ));
                }
            }
        });
    }
}
