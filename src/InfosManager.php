<?php

require_once 'EntityManager.php';

class InfosManager extends EntityManager
{
    public function listAll()
    {
        $tree = array();
        $pool = array();
        $cursor = array(
            'list' => 0,
            'pool' => 0
        );

        $infos = parent::listAll(INFOS_TABLE, array('id', 'name', 'parent as parentId', 'isCategory'), 'name');

        foreach ($infos as $info) {
            if ($info['parentId'] == '0') {
                $tree[] = $info;
            } else {
                $pool[] = $info;
            }
        }

        // We want no item to be before its parent in $tree so that the js tree can be constructed
        // Check infos list until there is no child anymore or if all the root-level have been sorted.
        while (count($pool) > 0 && $cursor['list'] < count($tree)) {
            $cursor['pool'] = 0;
            $poolSize = count($pool);
            while ($cursor['pool'] < $poolSize) {
                // For each child of the current root-level info
                if ($pool[$cursor['pool']]['parentId'] == $tree[$cursor['list']]['id']) {
                    // Add it in the list
                    $tree[] = $pool[$cursor['pool']];
                    // Remove it from the children list
                    unset($pool[$cursor['pool']]);
                }
                $cursor['pool']++;
            }
            $pool = array_values($pool);
            $cursor['list']++;
        }

        return json_encode($tree);
    }
    
    public function getYears()
    {
        return parent::getColumnValues(INFOS_TABLE, 'year');
    }

    public function find($id)
    {
        $connection = Connection::getInstance();
        $sth = $connection->prepare('SELECT
infos.`id`,
infos.`name`,
infos.`picture`,
infos.`isCategory`,
infos.`content`,
infos.`parent`,
infos.`year`,
(Select count(*) from ' . MAP_TABLE . ' map where map.`infoId` = infos.`id`) as `isDisplayedOnMap`
FROM ' . INFOS_TABLE . ' infos WHERE infos.id = :id');
        $sth->execute(array(
            'id' => $id
        ));
        
        $result = $sth->fetch();
        
        return json_encode($result);
    }

    public function add($params)
    {
        return parent::add(INFOS_TABLE, $params);
    }

    public function update($id, $params)
    {
        $connection = Connection::getInstance();

        return parent::update(INFOS_TABLE, $id, $params, function () use ($connection, $id, $params) {
            $sth = $connection->prepare('SELECT picture FROM ' . INFOS_TABLE . ' WHERE id = :id');
            $sth->execute(array(
                'id' => $id
            ));

            if ($info = $sth->fetch()) {
                // Delete info picture
                if (!empty($info['picture']) && $info['picture'] != $params['picture']) {
                    $picturePath = substr($info['picture'], strpos($info['picture'], '/src'));
                    if (!@unlink(getcwd() . $picturePath)) {
                        echo ('Error deleting : ' . $picturePath);
                    }
                }
            }
        });
    }

    public function delete($id)
    {
        $connection = Connection::getInstance();

        return parent::delete(INFOS_TABLE, $id, function () use ($connection, $id) {
            // Reset info children's parent as info's parent
            $sth = $connection->prepare('SELECT parent FROM ' . INFOS_TABLE . ' WHERE id = :id');
            $sth->execute(array(
                'id' => $id
            ));

            if ($parent = $sth->fetch()) {
                $sth = $connection->prepare('UPDATE ' . INFOS_TABLE . ' SET parent = :parent WHERE parent = :id');
                $sth->execute(array(
                    'parent' => $parent['parent'],
                    'id' => $id
                ));
            }

            // Delete info's picture
            $sth = $connection->prepare('SELECT picture FROM ' . INFOS_TABLE . ' WHERE id = :id');
            $sth->execute(array(
                'id' => $id
            ));

            if ($info = $sth->fetch()) {
                // Delete info picture
                if (!empty($info['picture'])) {
                    $picturePath = substr($info['picture'], strpos($info['picture'], '/src'));
                    if (!@unlink(getcwd() . $picturePath)) {
                        echo ('Error deleting : ' . $picturePath);
                    }
                }
            }

            // Delete linked map items if exists
            $sth = $connection->prepare('DELETE FROM ' . MAP_TABLE . ' WHERE infoId = :id');
            $sth->execute(array(
                'id' => $id
            ));
        });
    }
}
