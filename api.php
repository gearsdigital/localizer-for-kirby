<?php

use Kirby\Data\Json;
use Kirby\Filesystem\Dir;
use Kirby\Filesystem\F;
use Kirby\Http\Response;
use Kirby\Toolkit\Collection;
use Kirby\Toolkit\Str;

$contentRoot = kirby()->root('content');
$path = $contentRoot.DS.'localizer';
$localisations = $contentRoot.DS.'localizer'.DS."localisations.json";

return [
    'routes' => [
        [
            'pattern' => '/localizer',
            'method' => 'get',
            'action' => function () use ($path) {
                try {
                    $files = Dir::read($path);
                    $data = [];

                    foreach ($files as $file) {
                        $content = F::read($path.DS.$file);
                        if (F::is($file, 'json')) {
                            $data[] = Json::decode($content);
                        }
                    }

                    return Response::json($data);
                } catch (Exception $exception) {
                    return Response::json([]);
                }
            },
        ],
        [
            'pattern' => '/localizer',
            'method' => 'post',
            'action' => function () use ($path) {
                $translations = kirby()->request()->body()->data();
                $languages = [];

                foreach ($translations as $translation) {
                    $id = $translation['language']['id'];
                    Json::write($path.DS."$id.json", $translation);

                    // save language id for deletion check
                    $languages[] = $id;
                }

                // delete removed languages groups
                $files = Dir::read($path);
                foreach ($files as $file) {
                    $filename = F::name($file);
                    if (!in_array($filename, $languages)) {
                        F::remove($path.DS.$file);
                    }
                }

                return Response::json($translations);
            },
        ],
        [
            'pattern' => '/localizer/translations/(:alpha)',
            'method' => 'get',
            'action' => function ($code) {
                $page = get('page', 1);
                $limit = get('limit', 10);
                $q = trim(get('q'));
                $translations = kirby()->translations()->find($code ?? 'en');

                if (!empty($q)) {
                    $filteredTranslations = array_filter(
                        $translations->data(),
                        fn($v, $k) => Str::contains($k, $q) || Str::contains($v, $q),
                        ARRAY_FILTER_USE_BOTH
                    );
                }

                $collection = new Collection($filteredTranslations ?? $translations->data());

                $pagedCollection = $collection->paginate([
                    'page' => $page,
                    'limit' => $limit,
                ]);

                return Response::json([
                    'data' => $pagedCollection->toArray(),
                    'pagination' => $pagedCollection->pagination()->toArray(),
                ]);
            },
        ],
    ],
];
