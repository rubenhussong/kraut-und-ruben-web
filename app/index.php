<!DOCTYPE html>
<?php
$lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);

if ($lang !== 'de') $lang = 'en';

?>
<html>
<head>
    <?php include 'php/meta/head.php'; ?>
</head>
<body class="home">
    <?php include 'php/modules/header.php'; ?>

    <!-- M A I N - P A G E -->
    <section class="page page--main" id="page--main">
        <?php include 'php/modules/page-main.php'; ?>
    </section>

    <!-- P R O J E C T - P A G E S -->
    <section class="page page--project" id="page--space">
        <?php include 'php/modules/projects/page-space.php'; ?>
    </section>
    <section class="page page--project" id="page--casino-bregenz">
        <?php include 'php/modules/projects/page-casino-bregenz.php'; ?>
    </section>
    <section class="page page--project" id="page--grenzkunst">
        <?php include 'php/modules/projects/page-grenzkunst.php'; ?>
    </section>
    <section class="page page--project" id="page--hypernet">
        <?php include 'php/modules/projects/page-hypernet.php'; ?>
    </section>
    <section class="page page--project" id="page--el-presidente">
        <?php include 'php/modules/projects/page-el-presidente.php'; ?>
    </section>

    <?php include 'php/modules/imprint.php'; ?>
</body>
</html>