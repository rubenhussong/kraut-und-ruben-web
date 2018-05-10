<?php
$lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
?>

<!DOCTYPE html>
<html lang="{{ lang }}">
<head>
    <meta charset="UTF-8">
    <title>Kraut und Ruben</title>
    <base href="index.html">

    <meta name="description" content="Independent graphic design and web development studio" />
    <meta name="keywords" content="kraut und ruben, web development, design, graphic, hot and fancy" />
    <meta name="author" content="Ruben Hussong, Florian Ortlieb" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
    
    <link rel="stylesheet" href="/css/normalize.css">
    <link rel="stylesheet" href="/css/style.css">
    <link rel="shortcut icon" href="fav.ico"/>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js" type="text/javascript"></script>
    <script language="javascript" type="text/javascript" src="/js/main-min.js"></script>

    <link href="https://fonts.googleapis.com/css?family=Tenor+Sans" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Barlow:400,500|Nobile:400,500|Overpass+Mono:400,600|Overpass:400,600|Share+Tech|Space+Mono:400,700" rel="stylesheet">
    <link rel="stylesheet" href="https://use.typekit.net/jnr4uns.css">
    <link href="https://fonts.googleapis.com/css?family=Spectral:400,400i,500,600,700" rel="stylesheet">
</head>

<body class="home">
<header class="on-load scroll-top">
    <h1 class="word-mark">
        <span id="h1--left">Kraut</span>
        <span id="h1--center">&</span>
        <span id="h1--right">Ruben</span>
    </h1>
    <div class="head-icon" id="head-icon--kraut" href="#">
        <img src="/img/kraut-icon.png" alt="kraut-icon" sizes="auto">
    </div>
    <div class="head-icon" id="head-icon--ruebe" href="#">
        <img src="/img/ruebe-icon.png" alt="ruebe-icon" sizes="auto">
    </div>
</header>

<section class="page page--main" id="page--main">
    <nav class="on-load scroll-top">
        <a href="#section--projects" id="scroll-marker">
            <p>Projekte</p>
            <p id="scroll-arrow">&#9660;</p>
        </a>
    </nav>
    <div class="section" id="section--about">
        <div id="about-images">
            <img class="about-image" id="about-image--wir" src="/img/flo-und-ruben-02.jpg" alt="kraut-und-ruben" sizes="auto">
        </div>
        <div class="fade-in fade-in-visible on-load" id="about-text">
            <p>
                <?php if ($lang == 'de'): ?>

                    Hallo, <span id="span--wir">wir</span>
                    sind <span id="span--flo">Flo</span>
                    und <span id="span--ruben">Ruben</span>,
                    zwei Designer aus <span id="span--konstanz">Konstanz</span>
                    am <span id="span--bodensee">Bodensee</span>.
                    Am Liebsten gestalten und entwickeln wir <span id="span--webseiten">Webseiten</span>.
                    Außerdem visualisieren wir Marken, erstellen Editorial-Designs und ungefähr einer von uns zwei ist ein toller Illustrator.
                    Wir mögen Menschen – also <a href="mailto:gutentag@krautundruben.de">schreib</a>
                    uns, <a href="#section--footer">ruf</a>
                    uns an oder <a href="#section--footer">besuch</a>
                    uns gleich auf ein, zwei, drei Kaffee!

                <?php else: ?>

                    Hello, <span id="span--wir">we</span>
                    are <span id="span--flo">Flo</span>
                    and <span id="span--ruben">Ruben</span>,
                    two designers from <span id="span--konstanz">Constance</span>,
                    Germany.
                    We love creating <span id="span--webseiten">websites</span>,
                    but also do branding and editorial design. At least one of us is a great illustrator.
                    We like people – so <a href="mailto:gutentag@krautundruben.de">mail</a>,
                    <a href="#section--footer">call</a>
                    or <a href="#section--footer">visit</a>
                    us for one, two, three cups of coffee!

                <?php endif ?>
            </p>
        </div>
    </div>
    <div class="section" id="section--projects">
        <div class="project-column" id="project-column--left">
            <div class="fade-in project-banner img-large img-left">
                <a href="#page--space" id="project-link--space">
                    <img src="" data-src="/img/space-banner.jpg" alt="space-banner" sizes="auto">
                </a>
                <div class="project-text">
                    <h2>
                        Space<br>
                        <span>Editorial</span>
                    </h2>
                </div>
            </div>
            <div class="fade-in project-banner img-middle img-right">
                <a href="#page--casino-bregenz" id="project-link--casino-bregenz">
                    <img src="" data-src="/img/casino-bregenz-banner.jpg" alt="casino-bregenz-banner" sizes="auto">
                </a>
                <div class="project-text project-text--dark">
                    <h2>
                        Casino Bregenz<br>
                        <span>Animation</span>
                    </h2>
                </div>
            </div>
            <div class="fade-in project-banner img-small img-left">
                <a href="#page--grenzkunst" id="project-link--grenzkunst">
                    <img src="" data-src="/img/grenzkunst-banner.jpg" alt="grenzkunst-banner" sizes="auto">
                </a>
                <div class="project-text">
                    <h2>
                        Grenzkunst<br>
                        <span>Branding</span>
                    </h2>
                </div>
            </div>
        </div>
        <div class="project-column" id="project-column--right">
            <div class="fade-in project-banner img-small img-right">
                <a href="#page--hypernet" id="project-link--hypernet">
                    <img src="" data-src="/img/hypernet-banner.jpg" alt="hypernet-banner" sizes="auto">
                </a>
                <div class="project-text project-text--dark">
                    <h2>
                        Hypernet<br>
                        <span>Virtual Reality</span>
                    </h2>
                </div>
            </div>
            <div class="fade-in project-banner img-middle img-left">
                <a href="#page--el-presidente" id="project-link--el-presidente">
                    <img src="" data-src="/img/el-presidente-banner.jpg" alt="el-presidente-banner" sizes="auto">
                </a>
                <div class="project-text project-text--dark">
                    <h2>
                        El Presidente<br>
                        <span>Virtual Reality</span>
                    </h2>
                </div>
            </div>
        </div>
    </div>
    <footer class="section" id="section--footer">
        <div class="fade-in" id="footer-text">
            <p>
                Wir arbeiten von überall, aber meistens vom schönen Konstanz aus.
                Wenn du ein lustiges, aufregendes oder fantastisches Projekt hast, an dem du mit uns arbeiten möchtest, zeigen wir dir gerne eines unserer Lieblings-Cafés in der Altstadt.
            </p>
        </div>
        <ul class="" id="foot-line">
            <li class="fade-in footer-li">
                <p>
                    <a href="mailto:gutentag@krautundruben.de">gutentag@krautundruben.de</a>
                </p>
                <p>
                    <span>+4915738207073</span>
                </p>
            </li>
            <li class="fade-in footer-li">
                <p>
                    <a href="https://www.instagram.com/krautundruben/">Instagram</a>
                </p>
                <p>
                    <a href="https://twitter.com/kraut_und_ruben">Twitter</a>
                </p>
            </li>
            <li class="fade-in footer-li">
                <p>
                    <a href="#">Impressum</a>
                </p>
                <p id="copyright">
                    <span>© Kraut & Ruben</span>
                </p>
            </li>
        </ul>
    </footer>
</section>

<section class="page page--project" id="page--space">
    <a href="#page--main" class="close-modal">Close</a>
</section>

<section class="page page--project" id="page--casino-bregenz">
    <a href="#page--main" class="close-modal">Close</a>
</section>

<section class="page page--project" id="page--grenzkunst">
    <a href="#page--main" class="close-modal">Close</a>
</section>

<section class="page page--project" id="page--hypernet">
    <a href="#page--main" class="close-modal">Close</a>
</section>

<section class="page page--project" id="page--el-presidente">
    <a href="#page--main" class="close-modal">Close</a>
</section>

</body>
</html>