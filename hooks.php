<?php

use Kirby\Data\Json;
use Kirby\Filesystem\Dir;
use Kirby\Filesystem\F;

return [
    'system.loadPlugins:after' => function () {
        $contentRoot = kirby()->root('content');
        $path = $contentRoot.DS.'localizer';
        $files = Dir::read($path);
        $translations = [];

        foreach ($files as $file) {
            $filePath = $path.DS.$file;
            if (!F::exists($filePath)) {
                return;
            }

            $content = Json::read($filePath);
            if (F::is($file, 'json')) {
                if (is_array($content['translations']) && count($content['translations']) > 0) {
                    $translations[$content['language']['id']] = array_map(function ($arr) {
                        if (array_key_exists('override', $arr) && $arr['override']) {
                            return [$arr['key'] => $arr['override']];
                        }

                        return $arr;
                    }, $content['translations'])[0];
                }
            }
        }

        kirby()->extend(['translations' => $translations], kirby()->plugin('gearsdigital/kirby-panel-localizer'));
    },
];
