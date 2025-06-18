<template>
    <div>
        <article class="prose lg:prose-lg px-10 py-20 min-w-full">
            <h1 id="-1-pr-ambule-"><strong>1. Préambule</strong></h1>
            <p>
                Ce document a pour fonction d’établir les règles officielles propres à l'n7 de la
                belote contrée, dans sa variante la plus pratiquée, c’est-à-dire la belote contrée à
                4 joueurs répartis en 2 équipes de 2 joueurs, en se basant sur les règles reconnues
                par la Fédération Française de Belote.
            </p>
            <p>
                Sources :
                <a
                    href="http://www.ffbelote.org/wp-content/uploads/2015/11/REGLES-DE-LA-BELOTE-CONTREE.pdf"
                >
                    Règles officielles de la Belote Contrée
                </a>
                <a
                    href="https://github.com/vareversat/carg/blob/dev/assets/rules/contree_belote_rules.md"
                >
                    Règles rédigées par Valentin REVERSAT
                </a>
            </p>
            <hr />
            <h1 id="-2-pr-sentation-"><strong>2. Présentation</strong></h1>
            <p>
                Le jeu de belote se joue avec un jeu de
                <strong>32 cartes</strong>
                , comprenant les 7, 8, 9, 10, Valets, Dames, Rois et As les quatre couleurs pique,
                cœur, carreau et trèfle et oppose deux équipes de deux joueurs se faisant face :
                équipe nord/sud opposée à ouest/est.
            </p>
            <p>
                La partie se déroule en plusieurs donnes (également appelées mènes) et se termine
                lorsqu’une équipe atteint ou dépasse un nombre de points défini au départ, ou après
                un nombre défini de donnes. Une donne comprend plusieurs phases de jeu :
            </p>
            <ul>
                <li>La distribution,</li>
                <li>Les enchères,</li>
                <li>Le jeu de la carte,</li>
                <li>Le calcul du score.</li>
            </ul>
            <hr />
            <h1 id="-3-la-distribution-"><strong>3. La distribution</strong></h1>
            <h2 id="3-1-le-donneur">3.1. Le donneur</h2>
            <p>
                Le premier donneur de la partie est tiré au sort. Pour la donne suivante, le donneur
                sera son voisin de droite et ainsi de suite.
            </p>
            <h2 id="3-2-m-lange-des-cartes">3.2. Mélange des cartes</h2>
            <p>
                Le mélange du jeu est obligatoire avant chaque distribution. Le donneur saisit les
                32 cartes faces cachées et effectue un mélange avant de reposer le paquet sur la
                table, toujours face cachée.
            </p>
            <h2 id="3-3-la-coupe">3.3. La coupe</h2>
            <p>
                Le joueur situé à la gauche du donneur effectue une coupe en 2 de manière franche
                sans compter le nombre de cartes qu’il souhaite couper.
                <strong>Chaque tas doit contenir au moins 3 cartes</strong>
                . Le donneur referme la coupe.
            </p>
            <h2 id="3-4-la-distribution">3.4. La distribution</h2>
            <p>
                Le donneur distribue 8 cartes à chaque joueur,
                <strong>
                    dans le sens inverse des aiguilles d’une montre en commençant par son voisin de
                    droite
                </strong>
                , de l’une des manières suivantes :
            </p>
            <ul>
                <li>3 cartes puis 2 puis 3</li>
                <li>3 cartes puis 3 puis 2</li>
                <li>2 cartes puis 3 puis 3</li>
            </ul>
            <hr />
            <h1 id="-4-les-ench-res-"><strong>4. Les enchères</strong></h1>
            <h2 id="4-1-tour-d-ench-res">4.1. Tour d’enchères</h2>
            <p>
                Les joueurs s&#39;expriment chacun à leur tour en commençant par le joueur placé à
                droite du donneur. Chaque joueur peut :
            </p>
            <h2 id="-passer-"><em>Passer</em></h2>
            <p>
                Un joueur passe son tour en disant « je passe » à l’exception de toute autre
                locution sauf accord préalable entre les 2 équipes. Un joueur qui a passé une fois
                pourra enchérir par la suite s’il en a l’opportunité. Si les 4 joueurs passent sans
                enchérir, la donne est terminée sans points marqués.
            </p>
            <blockquote>
                <p>
                    Le donneur rassemble les cartes et les fait passer au joueur à sa droite qui
                    sera le nouveau donneur.
                </p>
            </blockquote>
            <h2 id="-ench-rir-"><em>Enchérir</em></h2>
            <p>
                Un joueur fait une enchère en désignant clairement le nombre de points qu’il engage
                son équipe à obtenir, et la couleur de l&#39;atout qu&#39;il choisit.
            </p>
            <p>
                L’enchère doit être de
                <strong>
                    80 au minimum, doit être un multiple de 10 et doit être supérieure à
                    l&#39;enchère précédente.
                </strong>
            </p>
            <p>
                En lieu et place d’un nombre de points, il est possible
                <strong>à tout moment</strong>
                de demander un capot, engageant alors l’équipe à remporter les huit plis. Il
                n’existe pas d’enchère supérieure au capot ; dès lors l’équipe adverse ne peut plus
                que passer ou contrer.
            </p>
            <p>
                La manière d’annoncer son contrat doit toujours être la même. On annonce d’abord la
                valeur du contrat (80, 90,100…), puis la couleur (pique, cœur…), par exemple « 90
                cœur ».
            </p>
            <blockquote>
                <p>
                    Les locutions du type « 20 de mieux », « 10 de plus », etc... sont interdites.
                </p>
            </blockquote>
            <p>
                Il est impossible de surenchérir sur soi-même : le tour de d’enchère s’achève
                lorsqu&#39;après une enchère ou un contre, les trois joueurs suivants passent.
            </p>
            <h2 id="-contrer-"><em>Contrer</em></h2>
            <p>
                Un joueur peut contrer une enchère adverse, mettant ainsi en doute la capacité de
                son adversaire à réaliser son contrat, en disant « Je contre ».
            </p>
            <blockquote>
                <p>
                    On ne peut contrer que lorsque c’est à son tour de parler (on ne contre pas « à
                    la volée »).
                </p>
            </blockquote>
            <p>
                Le fait de contrer fige le contrat, empêchant ainsi toute possibilité de surenchère.
            </p>
            <p><strong>Le score de la donne sera multiplié par 2.</strong></p>
            <h2 id="-surcontrer-"><em>Surcontrer</em></h2>
            <p>
                Lorsqu&#39;une équipe a contré, l’équipe adverse a la possibilité de surcontrer en
                disant « je surcontre ». Le tour d’enchères s’arrête alors immédiatement.
            </p>
            <p><strong>Le score de la donne sera multiplié par 4.</strong></p>
            <h2 id="4-2-contrat">4.2. Contrat</h2>
            <p>
                En prenant, le joueur engage son équipe (les preneurs) à réussir deux conditions,
                avec un jeu de la carte basé sur la couleur d’atout qu’il a désignée :
            </p>
            <ul>
                <li>
                    Atteindre ou dépasser le nombre de points demandés lors de l’enchère, ou huit
                    plis si capot demandé,
                </li>
                <li>Réaliser plus de points que l’équipe adverse (la défense)</li>
            </ul>
            <p>Le nombre de points comprend :</p>
            <ul>
                <li>Les points remportés lors des plis</li>
                <li>Les points de la belote éventuelle ainsi</li>
                <li>Les points des annonces éventuelles.</li>
            </ul>
            <hr />
            <h1 id="-5-le-jeu-de-la-carte-"><strong>5. Le jeu de la carte</strong></h1>
            <p>Le jeu de la carte se compose de huit plis (ou « levées ») de quatre cartes.</p>
            <h2 id="5-1-d-roulement">5.1. Déroulement</h2>
            <p>
                Le joueur situé à droite du donneur joue la carte de son choix : c’est l’entame. La
                couleur de la carte de l’entame fixe la couleur demandée.
            </p>
            <p>
                Les trois autres joueurs jouent alors une carte chacun leur tour, toujours dans le
                sens inverse des aiguilles d’une montre, et en suivant les règles ci-dessous. Le pli
                est remporté par le joueur qui a joué la plus forte carte à l&#39;atout ou, à
                défaut, à la couleur demandée. Ce dernier entame le pli suivant, et ainsi de suite.
            </p>
            <p>
                <strong>Toute carte montrée doit être jouée</strong>
                sauf autorisation ou avis contraire de la part des adversaires. Les plis sont
                toujours ramassés du côté de la même personne dans chaque équipe durant toute la
                donne, et sont empilés dans leur ordre d’apparition. Le dernier pli peut être
                consulté par n’importe quel joueur de la partie tant que le pli suivant n’a pas été
                ramassé.
            </p>
            <p>Lorsque toutes les cartes ont été jouées, on procède au calcul des points.</p>
            <h2 id="5-2-r-gles">5.2. Règles</h2>
            <ul>
                <li>
                    <p>
                        On doit
                        <strong>toujours</strong>
                        fournir la couleur demandée à l&#39;entame si l&#39;on en possède. Si la
                        couleur demandée est l&#39;atout, lorsque c&#39;est possible, il faut en
                        plus monter sur la carte la plus haute déjà posée.
                    </p>
                </li>
                <li>
                    <p>
                        Si l&#39;on ne possède pas de carte dans la couleur demandée, et que notre
                        partenaire est maître c’est-à-dire qu’il a joué la meilleure carte sur le
                        tapis (on dit qu’il « tient le pli »): on peut alors jouer n&#39;importe
                        quelle carte ; on se &quot; défausse&quot;. On peut également jouer atout si
                        bon nous semble.
                    </p>
                </li>
                <li>
                    <p>
                        Si l&#39;on ne possède pas de carte dans la couleur demandée, et que notre
                        partenaire n&#39;est pas maître ou n&#39;a pas encore joué : on est tenu de
                        jouer un atout si l&#39;on en possède (on dit que l’on « coupe »), sinon on
                        se défausse en jouant n&#39;importe quelle carte.
                    </p>
                    <p>
                        Précision : Si un adversaire a déjà coupé, et qu’il ne nous reste que des
                        atouts inférieurs au sien, il n’est
                        <strong>pas</strong>
                        obligatoire d’en jouer un (on dit que l’on « ne pisse pas »), on peut se
                        défausser
                    </p>
                </li>
                <li>
                    <p>
                        Lorsque l’on est conduit à jouer atout, soit parce qu’il s’agit de la
                        couleur demandée à l’entame, soit parce que l’on doit couper, on doit
                        toujours jouer un atout plus fort que ceux déjà présents sur le tapis, même
                        si cela est contraire à notre intérêt. Si cela s&#39;avère impossible, on
                        peut jouer un atout plus faible
                    </p>
                </li>
                <li>
                    <p>
                        Lorsque notre partenaire, maître, a coupé une carte adverse et que nous ne
                        possédons plus que de l’atout, il n’est pas obligé de fournir un atout
                        supérieur. C’est le seul cas de figure, plutôt rare, où il est permis de
                        jouer un atout inférieur.
                    </p>
                </li>
            </ul>
            <hr />
            <h1 id="-6-ordre-et-valeur-des-cartes-">
                <strong>6. Ordre et valeur des cartes</strong>
            </h1>
            <p>
                Les cartes n’ont pas le même ordre ni la même valeur selon qu’il s’agisse d’atout ou
                non. Les tableaux suivants indiquent l’ordre et la valeur des cartes dans l’ordre
                décroissant.
            </p>
            <table>
                <thead>
                    <tr>
                        <th>Carte</th>
                        <th>À l’atout</th>
                        <th>Hors atout</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><em>As</em></td>
                        <td>11 points</td>
                        <td>11 points</td>
                    </tr>
                    <tr>
                        <td><em>Dix</em></td>
                        <td>10 points</td>
                        <td>10 points</td>
                    </tr>
                    <tr>
                        <td><em>Roi</em></td>
                        <td>4 points</td>
                        <td>4 points</td>
                    </tr>
                    <tr>
                        <td><em>Dame</em></td>
                        <td>3 points</td>
                        <td>3 points</td>
                    </tr>
                    <tr>
                        <td><em>Valet</em></td>
                        <td><strong>20 points</strong></td>
                        <td><strong>2 points</strong></td>
                    </tr>
                    <tr>
                        <td><em>Neuf</em></td>
                        <td><strong>14 points</strong></td>
                        <td><strong>0 points</strong></td>
                    </tr>
                    <tr>
                        <td><em>Huit</em></td>
                        <td>0 point</td>
                        <td>0 point</td>
                    </tr>
                    <tr>
                        <td><em>Sept</em></td>
                        <td>0 point</td>
                        <td>0 point</td>
                    </tr>
                </tbody>
            </table>
            <hr />
            <h1 id="-7-la-belote-et-la-rebelote-"><strong>7. La belote et la rebelote</strong></h1>
            <p>
                Lorsqu&#39;un joueur détient ensemble
                <strong>le roi et la dame d’atout</strong>
                , on dit qu’il a la belote, ce qui offre à son équipe un bonus de
                <strong>20 points</strong>
                .
            </p>
            <p>
                Pour être conforme, elle doit être annoncée en disant « belote » lorsqu&#39;il joue
                la première de ces deux cartes ( indifféremment la Dame ou le Roi), puis
                obligatoirement « rebelote » lorsqu&#39;il joue la seconde.
            </p>
            <blockquote>
                <p>
                    En cas d&#39;omission d&#39;un de ces deux termes, la belote n&#39;est pas prise
                    en compte.
                </p>
            </blockquote>
            <p>
                <strong>
                    La belote annoncée de manière conforme est imprenable : le bonus de points est
                    accordé même en cas de chute.
                </strong>
            </p>
            <hr />
            <h1 id="-8-les-annonces-"><strong>8. Les annonces</strong></h1>
            <p>La belote contrée se joue toujours sans annonces.</p>
            <hr />
            <h1 id="-9-dix-de-der-et-capot-"><strong>9. Dix de der et capot</strong></h1>
            <h2 id="9-1-dix-de-der">9.1. Dix de der</h2>
            <p>
                L’équipe réalisant le dernier pli obtient un bonus de 10 points pour ce pli. Il
                s&#39;agit de la règle du « dix de der », der étant le diminutif de « dernier pli ».
                Le total des points du jeu est donc de 162, en comptant le « dix de der ».
            </p>
            <h2 id="9-2-capot">9.2. Capot</h2>
            <p>
                En cas de capot, c’est-à-dire les 8 plis remportés par la même équipe, le dix de der
                vaut 100 points, portant ainsi le total à 252 points.
            </p>
            <h2 id="9-3-generale">9.3. Générale</h2>
            <p>
                En cas de générale, c’est-à-dire les 8 plis remportés par la même personne, portant
                ainsi le total à 500 points.
            </p>
            <hr />
            <h1 id="-10-calcul-du-score-"><strong>10. Calcul du score</strong></h1>
            <h2 id="10-1-r-sultat-de-la-donne">10.1. Résultat de la donne</h2>
            <p>
                Lorsque les 8 plis ont été joués, on procède au calcul du score. Chaque camp
                totalise ses points, à savoir :
            </p>
            <ul>
                <li>Le nombre de points contenus dans les plis réalisés par son équipe,</li>
                <li>Le dix de der,</li>
                <li>La belote/rebelote.</li>
            </ul>
            <h3 id="-10-1-1-contrat-r-ussi-"><em>10.1.1. Contrat réussi</em></h3>
            <p>Le contrat est réussi si les deux conditions suivantes sont réunies :</p>
            <ul>
                <li>
                    <p>
                        Les preneurs obtiennent un
                        <strong>
                            total supérieur ou égal à l’enchère demandée OU ont réalisé les huit
                            plis en cas de capot demandé OU la même personne a réalisé les huit
                            plis.
                        </strong>
                    </p>
                </li>
                <li>
                    <p>Les preneurs obtiennent un total supérieur à celui de la défense.</p>
                    <ul>
                        <li>
                            <strong>Les preneurs marquent</strong>
                            :
                            <em>Leur total</em>
                            +
                            <em>
                                Le montant du contrat demandé (250 points pour un capot demandé)
                            </em>
                            .
                        </li>
                        <li>
                            <strong>Les défenseurs marquent</strong>
                            :
                            <em>Leur total</em>
                            .
                        </li>
                    </ul>
                </li>
            </ul>
            <p>
                Cas particulier : si un capot est réalisé par les preneurs, les annonces des
                défenseurs changent de main et sont marqués par les preneurs, et ce, que le capot
                ait été demandé lors des enchères ou non.
            </p>
            <ul>
                <li>
                    Si le contrat a été contré (resp.surcontré) :
                    <ul>
                        <li>
                            <strong>Les preneurs marquent</strong>
                            : (
                            <em>160 points (ou 250 points si capot réalisé, même non demandé)</em>
                            +
                            <em>Leurs annonces</em>
                            +
                            <em>Leur belote</em>
                            +
                            <em>Les annonces des défenseurs qui changent de main</em>
                            +
                            <em>
                                Le montant du contrat demandé (250 points pour un capot demandé)
                            </em>
                            ) × 2 (resp.4)
                        </li>
                        <li>
                            <strong>Les défenseurs</strong>
                            <em>ne marquent rien</em>
                            , à l’exception éventuelle des 20 points de belote qui sont réputés
                            imprenables.
                        </li>
                    </ul>
                </li>
            </ul>
            <h3 id="-10-1-2-contrat-chut-"><em>10.1.2. Contrat chuté</em></h3>
            <p>
                Le contrat est chuté si
                <strong>
                    la défense obtient un total supérieur ou égal aux preneurs OU si les preneurs
                    n’ont pas atteint leur contrat.
                </strong>
            </p>
            <ul>
                <li>
                    <strong>Les preneurs</strong>
                    ne marquent
                    <em>rien</em>
                    , à l’exception éventuelle des 20 points de belote qui sont réputés imprenables.
                </li>
                <li>
                    <strong>Les défenseurs</strong>
                    marquent
                    <em>160 points de chute</em>
                    +
                    <em>Leurs annonces</em>
                    +
                    <em>Leur belote</em>
                    +
                    <em>Les annonces des preneurs qui changent de main</em>
                    +
                    <em>Le montant du contrat demandé (250 points pour un capot demandé)</em>
                    .
                </li>
            </ul>
            <p>
                <strong>
                    Si le contrat a été contré (resp. surcontré), les défenseurs doublent (resp.
                    quadruplent) leurs points.
                </strong>
            </p>
            <h3 id="-10-1-3-r-gle-du-litige-"><em>10.1.3. Règle du litige</em></h3>
            <p>
                En cas d&#39;égalité entre les totaux de points des deux équipes (81-81 ou 91-91),
                il y a « litige ». Dans ce cas,
                <strong>
                    les points du preneur sont remis en jeu (81 ou 91) et seront reversés à
                    l&#39;équipe réussissant le contrat de la donne suivante.
                </strong>
                L&#39;équipe qui n&#39;avait pas pris marque ses points (81 ou 91) dès la donne
                ayant mené au litige.
            </p>
            <blockquote>
                <p>
                    Chaque tournoi se réserve le droit d&#39;appliquer ou non la règle du litige et
                    doit le stipuler clairement en amont. Dans le cas où elle n&#39;est pas
                    appliquée, le tournoi doit définir à l&#39;avance si l&#39;égalité de score
                    provoque la chute ou la réussite du contrat pour l&#39;équipe preneuse.
                </p>
            </blockquote>
            <h2 id="10-2-fin-de-partie">10.2. Fin de partie</h2>
            <p>
                Le premier camp atteignant ou dépassant le nombre de points fixés au préalable
                remporte la partie.
            </p>
            <p>
                Si les deux camps dépassent les points fixés au même moment, c&#39;est celui qui a
                le plus de points au-delà qui remporte la partie.
            </p>
            <p>En cas de nouvelle égalité, une dernière donne départage les deux camps.</p>
            <p>
                Cas particulier : Si une équipe est capot ou chute, et atteint les points fixés
                uniquement grâce aux points d’une belote, la partie n’est pas encore gagnée et doit
                se poursuivre. L’équipe aura besoin d’un pli supplémentaire pour valider la partie.
            </p>
            <hr />
            <h1 id="-11-variante-sans-atout-tout-atout-">
                <strong>11. Variante : Sans Atout / Tout Atout</strong>
            </h1>
            <p>
                L’organisateur d’un tournoi peut décider de le jouer avec la variante du Sans Atout
                / Tout Atout. Cette variante permet de prendre, en sus des 4 couleurs d’atout
                possibles, à « Sans Atout » (il n’existe aucune couleur d’atout) et « Tout atout »
                (toutes les couleurs sont atout), et implique les changements suivants :
            </p>
            <h2 id="11-1-tour-d-ench-res">11.1. Tour d’enchères</h2>
            <p>Un joueur peut prendre à la couleur ainsi qu’à Sans Atout et Tout Atout.</p>
            <h2 id="11-2-sans-atout">11.2. Sans Atout</h2>
            <p>
                Lors d&#39;un contrat à Sans Atout, il n&#39;y a aucun atout. De fait, il est
                impossible de couper. Il n&#39;y a pas de belote possible.
            </p>
            <p>L&#39;ordre et la valeur des cartes sont les suivants :</p>
            <table>
                <thead>
                    <tr>
                        <th>Carte</th>
                        <th>Valeur</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>As</td>
                        <td>19 points</td>
                    </tr>
                    <tr>
                        <td>Dix</td>
                        <td>10 points</td>
                    </tr>
                    <tr>
                        <td>Roi</td>
                        <td>4 points</td>
                    </tr>
                    <tr>
                        <td>Dame</td>
                        <td>3 points</td>
                    </tr>
                    <tr>
                        <td>Valet</td>
                        <td>0 points</td>
                    </tr>
                    <tr>
                        <td>Neuf</td>
                        <td>0 points</td>
                    </tr>
                    <tr>
                        <td>Huit</td>
                        <td>0 point</td>
                    </tr>
                    <tr>
                        <td>Sept</td>
                        <td>0 point</td>
                    </tr>
                </tbody>
            </table>
            <h2 id="11-3-tout-atout">11.3. Tout Atout</h2>
            <p>
                Lors d&#39;un contrat à Tout Atout, toutes les couleurs sont définies comme atout.
                De fait, il est impossible de couper et il est obligatoire de monter sur la carte
                qui tient, quand cela est possible.
            </p>
            <p>
                <strong>
                    Il peut y avoir jusqu&#39;à 4 belotes ET on est toujours obligé de monter sur la
                    carte qui tient si l&#39;on peut.
                </strong>
                .
            </p>
            <p>L&#39;ordre et la valeur des cartes sont les suivants :</p>
            <table>
                <thead>
                    <tr>
                        <th>Carte</th>
                        <th>Valeur</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Valet</td>
                        <td><strong>13 points</strong></td>
                    </tr>
                    <tr>
                        <td>Neuf</td>
                        <td><strong>9 points</strong></td>
                    </tr>
                    <tr>
                        <td>As</td>
                        <td><strong>6 points</strong></td>
                    </tr>
                    <tr>
                        <td>Dix</td>
                        <td><strong>5 points</strong></td>
                    </tr>
                    <tr>
                        <td>Roi</td>
                        <td><strong>3 points</strong></td>
                    </tr>
                    <tr>
                        <td>Dame</td>
                        <td><strong>2 points</strong></td>
                    </tr>
                    <tr>
                        <td>Huit</td>
                        <td>0 point</td>
                    </tr>
                    <tr>
                        <td>Sept</td>
                        <td>0 point</td>
                    </tr>
                </tbody>
            </table>
        </article>
        <span>
            Règles tirées de
            <a
                href="https://github.com/vareversat/carg/blob/dev/assets/rules/contree_belote_rules.md"
            >
                ce repo
            </a>
        </span>
    </div>
</template>
