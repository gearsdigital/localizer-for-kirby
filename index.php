<?php

Kirby::plugin('gearsdigital/localizer-for-kirby', [
    'api' => require_once __DIR__.'/api.php',
    'areas' => require_once __DIR__.'/areas.php',
    'hooks' => require_once __DIR__.'/hooks.php',
]);
