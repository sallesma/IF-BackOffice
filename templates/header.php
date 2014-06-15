<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>Imaginarium Backoffice</title>
    <meta name="description" content="">
    <link href="css/main.css" rel="stylesheet">
    <link href="css/lib/bootstrap.min.css" rel="stylesheet">
    <link href="css/lib/bootstrap-docs.css" rel="stylesheet">
    <link href="css/lib/bootstrap-pygments-manni.css" rel="stylesheet">
    <link href="css/lib/bootstrap-timepicker.css" rel="stylesheet">
	<link rel="stylesheet" href="css/lib/font-awesome-4.1.0/css/font-awesome.min.css">

    <link href="css/lib/jqx.base.css" type="text/css" rel="stylesheet"  />
    <link href="css/lib/jquery.fileupload.css" rel="stylesheet" />

	<link rel="icon" href="img/favicon.ico"
</head>

<body>
    <div class="container">
        <h1>
            <img src="img/logo_low.png" id="logo" alt="Logo">Imaginarium Festival - Backoffice</h1>
        <p>Pour changer le contenu de l'application mobile Imaginarium Festival.</p>
    </div>
    <div class="container bs-docs-container">
        <div class="row">
            <div class="col-md-3">
                <div class="bs-sidebar hidden-print" role="complementary">
                    <ul class="nav bs-sidenav">
                        <li>
                            <a href="#informations">Informations sur le backoffice</a>
                        </li>
                        <li>
                            <a href="#news">News</a>
                            <ul class="nav">
                                <li>
                                    <a href="#news">Liste des news</a>
                                </li>
                                <li>
                                    <a href="#addNewsTriggerModal">Ajouter une news</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#artists">Artistes</a>
                            <ul class="nav">
                                <li>
                                    <a href="#artists">Liste des artistes</a>
                                </li>
                                <li>
                                    <a href="#showArtistModalToAdd">Ajouter un artiste</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#photoFilter">Photos</a>
                            <ul class="nav">
                                <li>
                                    <a href="#photoFilter-add">Ajouter un filtre</a>
                                </li>
                                <li>
                                    <a href="#photo-filters">Liste des filtres</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#infos">Infos pratiques</a>
                            <ul class="nav">
                                <li>
                                    <a href="#infos">Visualiser les infos pratiques</a>
                                </li>
                                <li>
                                    <a href="#showInfoModalToAdd">Ajouter une info pratique</a>
                                </li>
                            </ul>
                        </li>
						<li>
                            <a href="#map">Carte</a>
                            <ul class="nav">
                                <li>
                                    <a href="#map">Liste des points sur la carte</a>
                                </li>
                                <li>
                                    <a href="#addMapItemTriggerModal">Ajouter un point</a>
                                </li>
                            </ul>
                        </li>
						<li>
                            <a href="#partners">Partenaires</a>
                            <ul class="nav">
                                <li>
                                    <a href="#partners">Liste des partenaires</a>
                                </li>
                                <li>
                                    <a href="#addPartnerTriggerModal">Ajouter un partenaire</a>
                                </li>
                            </ul>
                        </li>
						<hr>
						<li>
							<a href="logout">
								<button type="button" class="btn btn-danger">Déconnexion</button>
							</a>
						</li>
                    </ul>
                </div>
            </div>
            <div class="col-md-9" role="main">


                <div class="bs-docs-section">
                    <div class="page-header">
                        <h1 id="informations">Informations sur le backoffice</h1>
                    </div>
                    <p>Ce backoffice vous permet de modifier facilement une grande partie du contenu des applications mobiles. C'est pratique, mais le revers de la médaille est la responsabilité qui vous est donnée.</p>

                    <p>Pensez à toujours vérifier les informations que vous ajoutez car elles sont disponibles immédiatement dans l'application (Même s'il est possible de les modifier juste après)</p>

                    <p>Faites particulièrement attention à la taille et au format des photos et images que vous ajoutez (artistes, infos pratiques, filtres photos). Respectez les tailles requises quand il y en a et au besoin inspirez vous des fichiers déjà ajoutés pour être sûrs.</p>

                    <p>Une bonne pratique serait d'avoir toujours sur soi un smartphone et de tester l'application tout de suite après avoir effectué une modification pour s'assurer que l'on n'a pas fait d'erreur.</p>

                    <p>Si vous avez la moindre question, n'hésitez pas à nous contacter au plus vite : titouan.rossier@gmail.com salles.martin@gmail.com</p>
                </div>
