<?php

require __dir__ . '/../vendor/autoload.php';

use PHPUnit\Framework\TestCase;

class test
{
  public static function doMath($a, $b)
  {
    return $a + $b;
  }
}

/**
 * @covers Email
 */
final class MyTest extends TestCase
{
  public function testDoMath()
  {
    $this->assertEquals(4, test::doMath(2,2));
  }
}
