<?php

namespace Model\Quiz;

use Model\Model;

class Quiz extends Model
{
    protected $name = '';
    protected $description = '';
    protected $id;
    protected $created;
    protected $updated;
    protected $categories = [];
    protected $questions = [];
}