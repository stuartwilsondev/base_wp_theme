<!DOCTYPE html>
<html lang="">

<head>
    <!-- App version: <?php //echo $this->get('release.version'); ?> -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?= wp_title(); ?></title>

    <link rel="shortcut icon" href="<?php echo get_stylesheet_directory_uri(); ?>/favicon.ico" />

    <?php wp_head(); ?>
</head>

<body>