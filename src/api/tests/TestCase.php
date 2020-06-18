<?php

namespace Tests;

use Carbon\Carbon;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;

    protected function setUp(): void
    {
        parent::setUp();

        // Set "current time" for this test to a specific datetime
        Carbon::setTestNow(Carbon::create(2020, 1, 1));
    }
}
