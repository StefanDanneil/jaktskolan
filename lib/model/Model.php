<?php

namespace Model;

use Db\DbWrapper;

abstract class Model
{
    protected $created;
    protected $updated;

    public static function getById($id)
    {
        $db = new DbWrapper;
        $model = new static();
        $tableName = strtoLower(array_pop(explode('\\', get_class($model))));
        $result = $db->select('select * from '. $tableName .' where id = ' . $id . ';');

        return $result;
    }

    public function getAll()
    {
        $db = new DbWrapper;
        $model = new static();
        $tableName = strtoLower(array_pop(explode('\\', get_class($model))));
        $result = $db->select('select * from '. $tableName .';');
    }



    // public function save()
    // {
    //     if (empty($this->id)) {
    //         $this->create();
    //     } else {
    //         $this->update();
    //     }
    // }

    // private create()
    // {
    //     $this->created = gmdate();
    //     $this->updated = gmdate();
    // }

    // private update()
    // {
    //     $this->updated = gmdate();
    // }
}