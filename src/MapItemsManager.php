<?php

require_once 'EntityManager.php';

class MapItemsManager extends EntityManager
{
    public function listAll()
    {
        return json_encode(parent::listAll(MAP_TABLE, array('id', 'label', 'x', 'y', 'infoId'), 'label'));
    }
    
    public function getYears()
    {
        return parent::getColumnValues(MAP_TABLE, 'year');
    }

    public function add($params)
    {
        $connection = Connection::getInstance();

        return parent::add(MAP_TABLE, $params);
    }

    public function update($id, $params)
    {
        $connection = Connection::getInstance();

        return parent::update(MAP_TABLE, $id, $params);
    }

    public function delete($id)
    {
        return parent::delete(MAP_TABLE, $id);
    }
}
