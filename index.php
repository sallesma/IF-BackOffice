<?php

require 'Slim/Slim.php';
\Slim\Slim::registerAutoloader();

require 'src/APIManager.php';
require 'src/NewsManager.php';
require 'src/ArtistsManager.php';
require 'src/FiltersManager.php';
require 'src/InfosManager.php';
require 'src/MapItemsManager.php';
require 'src/PartnersManager.php';

$app = new \Slim\Slim();

$homeUrl = "http://titouanrossier.com/ifT";

$app->get('/', function() use ($app) {
	$app->redirect('login');
});

$app->get('/home', function() use ($app) {
        $app->render('header.php');
        $app->render('news.php');
        $app->render('artists.php');
        $app->render('filters.php');
        $app->render('infos.php');
        $app->render('map.php');
        $app->render('partners.php');
        $app->render('footer.php');
});

$app->get('/login', function() use ($app) {
    // Si pas de ticket, c'est une invitation à se connecter
    if(empty($_GET["ticket"])) {
		global $homeUrl;
		$app->redirect("https://cas.utc.fr/cas/login?service=".$homeUrl."/login");
    } else {
        // Connexion avec le ticket CAS
        try {
            $app->getLog()->debug("Trying loginCas");
			//(vérifier que le ticket dans $_GET["ticket"] est bon et récupérer le login pour tester si la persnne est dans la liste des login autorisés)
            /*$result = JsonClientFactory::getInstance()->getClient("MYACCOUNT")->loginCas(array(
                "ticket" => $_GET["ticket"],
                "service" => Config::get("casper_url").'login'
            ));*/
        } catch (Exception $e) {
            $app->getLog()->warn("Error with CAS ticket ".$_GET["ticket"].": ".$e->getMessage());

            // Affichage d'une page avec juste l'erreur
            $app->render('error.php', array('error_message' => 'Erreur de login CAS<br /><a href="/">Réessayer</a>'));
        }

		$app->redirect('home');
    }
})->name('login');

$app->get('/logout', function() use ($app) {
    $app->redirect("https://cas.utc.fr/cas/logout");
});

$app->get('/api/:table(/:lastRetrieve)', function( $table, $lastRetrieve = null) use ($app) {
	$apiManager = new APIManager();
	echo $apiManager->webService( $table, $lastRetrieve );
});

$app->get('/getNews', function() use ($app) {
        $newsManager = new NewsManager();
        echo $newsManager->getNews();
});

$app->post('/addNews', function() use ($app) {
        $newsManager = new NewsManager();

        $title = $app->request->post('title');
        $content = $app->request->post('content');
        echo $newsManager->addNews( $title, $content);
});

$app->post('/updateNews', function() use ($app) {
        $newsManager = new NewsManager();

        $id = $app->request->post('id');
        $title = $app->request->post('title');
        $content = $app->request->post('content');
        echo $newsManager->updateNews( $id, $title, $content );
});

$app->get('/deleteNews/:id', function( $id ) use ($app) {
        $newsManager = new NewsManager();
        echo $newsManager->deleteNews( $id );
});

$app->get('/getArtists', function() use ($app) {
        $artistManager = new ArtistsManager();
        echo $artistManager->getArtists();
});

$app->get('/getArtist/:id', function( $id ) use ($app) {
        $artistManager = new ArtistsManager();
        echo $artistManager->getArtist($id);
});

$app->post('/addArtist', function() use ($app) {
        $artistManager = new ArtistsManager();

        $name = $app->request->post('name');
        $picture = $app->request->post('picture');
        $style = $app->request->post('style');
        $description = $app->request->post('description');
        $day = $app->request->post('day');
        $stage = $app->request->post('stage');
        $startTime = $app->request->post('startTime');
        $endTime = $app->request->post('endTime');
        $website = $app->request->post('website');
        $facebook = $app->request->post('facebook');
        $twitter = $app->request->post('twitter');
        $youtube = $app->request->post('youtube');
        echo $artistManager->addArtists($name, $picture, $style, $description, $day, $stage, $startTime, $endTime, $website, $facebook, $twitter, $youtube);
});

$app->post('/updateArtist', function() use ($app) {
        $artistManager = new ArtistsManager();

        $id = $app->request->post('id');
        $name = $app->request->post('name');
        $picture = $app->request->post('picture');
        $style = $app->request->post('style');
        $description = $app->request->post('description');
        $day = $app->request->post('day');
        $stage = $app->request->post('stage');
        $startTime = $app->request->post('startTime');
        $endTime = $app->request->post('endTime');
        $website = $app->request->post('website');
        $facebook = $app->request->post('facebook');
        $twitter = $app->request->post('twitter');
        $youtube = $app->request->post('youtube');
        echo $artistManager->updateArtists($id, $name, $picture, $style, $description, $day, $stage, $startTime, $endTime, $website, $facebook, $twitter, $youtube);
});

$app->get('/deleteArtist/:id', function( $id ) use ($app) {
        $artistsManager = new ArtistsManager();
        echo $artistsManager->deleteArtist( $id );
});

$app->get('/getFilters', function() use ($app) {
        $filtersManager = new FiltersManager();
        echo $filtersManager->getFilters();
});

$app->post('/addFilter', function() use ($app) {
        $filtersManager = new FiltersManager();
        $url = $app->request->post('url');
        echo $filtersManager->addFilter( $url );
});

$app->get('/deleteFilter/:id', function( $id ) use ($app) {
    $filtersManager = new FiltersManager();
	echo $filtersManager->deleteFilter( $id );
});

$app->get('/getInfos', function() use ($app) {
        $infosManager = new InfosManager();
        echo $infosManager->getInfos();
});

$app->get('/getInfo/:id', function( $id ) use ($app) {
        $infosManager = new InfosManager();
        echo $infosManager->getInfo($id);
});

$app->post('/addInfo', function() use ($app) {
        $infosManager = new InfosManager();

        $name = $app->request->post('name');
        $picture = $app->request->post('picture');
        $isCategory = $app->request->post('isCategory');
        $content = $app->request->post('content');
        $parent = $app->request->post('parent');
        echo $infosManager->addInfo( $name, $picture, $isCategory, $content, $parent );
});

$app->post('/updateInfo', function() use ($app) {
        $infosManager = new InfosManager();

        $id = $app->request->post('id');
        $name = $app->request->post('name');
        $picture = $app->request->post('picture');
        $isCategory = $app->request->post('isCategory');
        $content = $app->request->post('content');
        $parentId = $app->request->post('parentId');
        echo $infosManager->updateInfo( $id, $name, $picture, $isCategory, $content, $parentId );
});

$app->get('/deleteInfo/:id', function( $id ) use ($app) {
        $infosManager = new InfosManager();
        echo $infosManager->deleteInfo( $id );
});

$app->get('/getMapItems', function() use ($app) {
	$mapItemManager = new MapItemsManager();
	echo $mapItemManager->getMapItems();
});

$app->post('/addMapItem', function() use ($app) {
        $mapItemManager = new MapItemsManager();

        $label = $app->request->post('label');
        $x = $app->request->post('x');
        $y = $app->request->post('y');
        $infoId = $app->request->post('infoId');

        echo $mapItemManager->addMapItem( $label, $x, $y, $infoId );
});

$app->post('/updateMapItem', function() use ($app) {
        $mapItemManager = new MapItemsManager();

        $id = $app->request->post('id');
        $label = $app->request->post('label');
        $x = $app->request->post('x');
        $y = $app->request->post('y');
        $infoId = $app->request->post('infoId');

        echo $mapItemManager->updateMapItem( $id, $label, $x, $y, $infoId);
});

$app->get('/deleteMapItem/:id', function( $id ) use ($app) {
    $mapItemManager = new MapItemsManager();
    echo $mapItemManager->deleteMapItem( $id );
});

$app->get('/getPartners', function() use ($app) {
	$partnersManager = new PartnersManager();
	echo $partnersManager->getPartners();
});

$app->post('/addPartner', function() use ($app) {
        $partnersManager = new PartnersManager();

        $name = $app->request->post('name');
        $picture = $app->request->post('picture');
        $website = $app->request->post('website');

        echo $partnersManager->addPartner( $name, $picture, $website);
});

$app->post('/updatePartner', function() use ($app) {
        $partnersManager = new PartnersManager();

        $id = $app->request->post('id');
        $name = $app->request->post('name');
        $picture = $app->request->post('picture');
        $website = $app->request->post('website');

        echo $partnersManager->updatePartner( $id, $name, $picture, $website);
});

$app->get('/deletePartner/:id', function( $id ) use ($app) {
        $partnersManager = new PartnersManager();
        echo $partnersManager->deletePartner( $id );
});

$app->run();