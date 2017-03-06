<?php

namespace FlashCards\Quiz;

class Quiz
{
  public $name = '';
  public $description = '';

  protected $id;
  protected $created;
  protected $updated;
  protected $categories = [];
  protected $questions = [];

  public function save()
  {
    if ( empty($this->id)) {
      $this->create();
    } else {
      $this->update();
    }
  }

  private create()
  {
    $this->created = gmdate();
    $this->updated = gmdate();
  }

  private update()
  {

  }
}