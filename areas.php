<?php

return [
    'panel-localizer' => function () {
        return [
            'label' => 'Localizer',
            'icon' => 'globe',
            'menu' => true,
            'link' => 'panel-localizer',
            'views' => [
                [
                    'pattern' => 'panel-localizer',
                    'action' => function () {
                        return [
                            'component' => 'k-panel-localizer-area',
                            'title' => 'Localize Panel Translations',
                            'props' => [],
                        ];
                    },
                ],
            ],
        ];
    },
];
