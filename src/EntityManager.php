<?php

class EntityManager
{
    /*
     * The year of the data the class will manipulate
     */
    var $currentYear;
    
    function EntityManager($currentYear)
    {
        $this->currentYear = $currentYear ?: date("Y");
    }
    
    /**
     * Get an array of Entities from database
     *
     * @return array
     */
    public function listAll($table, $fields = array(), $order = 'id')
    {
        $result = array();
        $connection = Connection::getInstance();

        if (is_array($fields) && count($fields) > 0) {
            $fields = implode(', ', $fields);
        } else {
            $fields = '*';
        }

        $sth = $connection->prepare('SELECT ' . $fields . ' FROM ' . $table . ' WHERE year = ' . $this->currentYear . ' ORDER BY ' . $order);
        $sth->execute();

        foreach ($sth->fetchAll() as $element) {
            $result[] = $element;
        }

        return $result;
    }
    
    /**
     * Get an array of values a given column in the database
     *
     * @return array
     */
    public function getColumnValues($table, $field)
    {
        $result = array();
        $connection = Connection::getInstance();

        $sth = $connection->prepare('SELECT ' . $field . ' FROM ' . $table . ' GROUP BY ' . $field);
        $sth->execute();

        $result = $sth->fetchAll(PDO::FETCH_COLUMN, 0);

        return $result;
    }

    /**
     * Get an Entity from Database
     *
     * @return array
     */
    public function find($table, $id)
    {
        $result = array();
        $connection = Connection::getInstance();

        $sth = $connection->prepare('SELECT * FROM ' . $table . ' WHERE id = :id');
        $sth->execute(array(
            ':id' => $id
        ));

        $result = $sth->fetch();

        return $result;
    }

    /**
     * Add an Entity in Database
     *
     * @return boolean
     */
    public function add($table, $params, $closure = null)
    {
        $params["year"] = $this->currentYear;
        
        $preparedParams = array_keys($params);

        foreach ($preparedParams as &$param) {
            $param = ':' . $param;
        }

        $connection = Connection::getInstance();
        $query = 'INSERT INTO ' . $table . ' (' . implode(', ', array_keys($params)) . ') VALUES (' . implode(',', $preparedParams) . ')';
        $sth = $connection->prepare($query);
        $check = $sth->execute($params);

        if (is_callable($closure)) {
            $closure();
        }

        return $check;
    }

    /**
     * Update an Entity in Database
     *
     * @return boolean
     */
    public function update($table, $id, $params, $closure = null)
    {
        $fields = '';

        if ($closure && is_callable($closure)) {
            $closure();
        }

        foreach ($params as $field => $param) {
            $fields .= $field . ' = :' . $field . ', ';
        }
        $fields = substr($fields, 0, -2);

        // Reset id [shifted param]
        $params['id'] = $id;

        $connection = Connection::getInstance();
        $sth = $connection->prepare('UPDATE ' . $table . ' SET ' . $fields . ' WHERE id = :id');

        return $sth->execute($params);
    }

    /**
     * Delete an Entity from Database
     *
     * @return boolean
     */
    public function delete($table, $id, $closure = null)
    {
        $connection = Connection::getInstance();

        if (is_callable($closure)) {
            $closure();
        }

        $sth = $connection->prepare('DELETE FROM ' . $table . ' WHERE id = :id');
        return $sth->execute(array(
            'id' => $id
        ));
    }
}
