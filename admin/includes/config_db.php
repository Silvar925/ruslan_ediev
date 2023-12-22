<?php
function getSchema()
{
    return [
        'album' => [
            'menuName' => 'Альбомы',
            'fields' => [
                'title' => [
                    'name' => 'Название альбома',
                    'element' => 'input',
                    'type' => 'text',
                    'required' => true,
                ],

                'year' => [
                    'name' => 'Год альбома',
                    'element' => 'input',
                    'type' => 'number',
                    'required' => true,
                ],

                'img' => [
                    'name' => 'Картинка альбома',
                    'element' => 'input',
                    'type' => 'file',
                    'required' => true,
                ],
            ],
        ],

        'music' => [
            'menuName' => 'Музыка',
            'fields' => [
                'album' => [
                    'name' => 'Выбор альбома',
                    'element' => 'select',
                    'options' => 'album',
                    'required' => true,
                ],

                'title' => [
                    'name' => 'Название песни',
                    'element' => 'input',
                    'type' => 'text',
                    'required' => true,
                ],

                'img' => [
                    'name' => 'Песня',
                    'element' => 'input',
                    'type' => 'file',
                    'required' => true,
                ],
            ],
        ],
    ];
}