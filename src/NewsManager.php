<?php

require_once 'EntityManager.php';

class NewsManager extends EntityManager
{
    public function listAll()
    {
        return json_encode(parent::listAll(NEWS_TABLE, array('id', 'title', 'content', 'date'), 'date DESC'));
    }

    public function add($params)
    {
        return parent::add(NEWS_TABLE, $params);
    }

    public function update($id, $params)
    {
        return parent::update(NEWS_TABLE, $id, $params);
    }

    public function delete($id)
    {
        return parent::delete(NEWS_TABLE, $id, null);
    }
}
