<div class="on-load scroll-top" id="scroll-marker-wrapper">
    <a href="#section--projects" id="scroll-marker">
        <p>
            <?php if ($lang == 'de'): ?>
                Projekte
            <?php else: ?>
                Projects
            <?php endif ?>
        </p>
        <p id="scroll-arrow">&#x2193;</p>
    </a>
</div>
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
                zwei Designer aus <span id="span--konstanz">Konstanz</span>.
                Am Liebsten entwickeln wir <span id="span--webseiten">Webseiten</span>.
                Außerdem gestalten wir Marken und Editorial-Designs. Mindestens einer von uns ist ein toller Illustrator.
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
                or simply <a href="#section--footer">visit</a>
                us for a cup of coffee. Or two.

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
            <div class="project-text project-text--light">
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
            <div class="project-text project-text--light">
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
    <?php include 'php/modules/footer.php'; ?>
</footer>