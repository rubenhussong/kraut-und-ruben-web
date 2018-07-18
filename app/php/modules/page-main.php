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
<div class="section change-color" id="section--about">
    <div class="scroll-animation" id="about-text">
        <p>
            <?php if ($lang == 'de'): ?>

<!--
                Guten Tag! <span class="icon icon--sun"></span>
                Wir sind Flo und Ruben, zwei Designer aus Deutschland.
                Wir lieben es, Webseiten <span class="icon icon--device"></span>
                zu entwickeln, auf Bäume <span class="icon icon--tree"></span>
                zu klettern und Menschen <span class="icon icon--human"></span> kennen zu lernen –
                also <a href="mailto:gutentag@krautundruben.de">schreib</a> uns,
                <a href="#foot-line">ruf&nbsp;</a>uns an oder besuch uns auf ein, zwei Gläschen Eistee.
                <span class="icon icon--ice-tea"></span>
-->

                Guten Tag! <span class="icon icon--sun"></span>
                Wir sind Flo und Ruben, zwei Designer aus Deutschland.
                Wir lieben es, Webseiten <span class="icon icon--device"></span>
                zu entwickeln, schöne Dinge zu gestalten, auf Bäume <span class="icon icon--tree"></span>
                zu klettern und den Wind in den Haaren zu spüren.

            <?php else: ?>

                Good day! <span class="icon icon--sun"></span>
                We are Flo and Ruben, two designers from Germany.
                We love creating websites <span class="icon icon--device"></span>,
                climbing trees <span class="icon icon--tree"></span>
                and meeting people <span class="icon icon--human"></span>.
                So <a href="mailto:gutentag@krautundruben.de">mail</a>,
                <a href="#foot-line">call</a> or simply visit us for a glass of iced tea <span class="icon icon--ice-tea"></span>.
                Or two.

            <?php endif ?>
        </p>
    </div>
</div>
<div class="section" id="section--projects">
    <div class="project-column" id="project-column--left">
        <div class="scroll-animation project-banner img-large img-left">
            <a href="#page--space" id="project-link--space">
                <img src="" data-src="/img/space/space-banner.jpg" alt="space-banner" sizes="auto">
            </a>
            <div class="project-text project-text--light">
                <h2>
                    Space<br>
                    <span>Editorial</span>
                </h2>
            </div>
        </div>
        <div class="scroll-animation project-banner img-middle img-right">
            <a href="#page--casino-bregenz" id="project-link--casino-bregenz">
                <img src="" data-src="/img/casino-bregenz/casino-bregenz-banner.jpg" alt="casino-bregenz-banner" sizes="auto">
            </a>
            <div class="project-text project-text--dark">
                <h2>
                    Casino Bregenz<br>
                    <span>Animation</span>
                </h2>
            </div>
        </div>
        <div class="scroll-animation project-banner img-small img-left">
            <a href="#page--grenzkunst" id="project-link--grenzkunst">
                <img src="" data-src="/img/grenzkunst/grenzkunst-banner.jpg" alt="grenzkunst-banner" sizes="auto">
            </a>
            <div class="project-text project-text--dark">
                <h2>
                    Grenzkunst<br>
                    <span>Branding</span>
                </h2>
            </div>
        </div>
    </div>
    <div class="project-column" id="project-column--right">
        <div class="scroll-animation project-banner img-small img-right">
            <a href="#page--hypernet" id="project-link--hypernet">
                <img src="" data-src="/img/hypernet/hypernet-banner.jpg" alt="hypernet-banner" sizes="auto">
            </a>
            <div class="project-text project-text--dark">
                <h2>
                    Hypernet<br>
                    <span>Virtual Reality</span>
                </h2>
            </div>
        </div>
        <div class="scroll-animation project-banner img-middle img-left">
            <a href="#page--el-presidente" id="project-link--el-presidente">
                <img src="" data-src="/img/el-presidente/el-presidente-banner.jpg" alt="el-presidente-banner" sizes="auto">
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
<footer class="section change-color" id="section--footer">
    <div class="scroll-animation" id="footer-text">
        <p>
            <?php if ($lang == 'de'): ?>

                Webseiten gestalten. Webseiten entwickeln. Branding. Rebranding. Logos und Wortmarken. Editorial. Illustration. User Experience. App Design. Grafik Design.

            <?php else: ?>

                We work from anywhere, but are currently based in the beautiful city of Constance.
                In case you have a whimsical, exciting or flat out fantastic project you’d like to work on with us:
                we’d be delighted to show you one of our favourite cafés in the old town.

            <?php endif ?>
        </p>
    </div>
    <div class="scroll-animation" id="footer-image">
        <img data-src="/img/about-image.jpg" alt="kraut-und-ruben" sizes="auto">
    </div>
    <?php include 'php/modules/footer.php'; ?>
</footer>