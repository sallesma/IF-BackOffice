<?php

require_once 'Slim/Slim.php';
require_once 'src/Connection.php';

$connection = Connection::getInstance();
$table_schema = '';

\Slim\Slim::registerAutoloader();

require_once 'src/APIManager.php';
require_once 'src/NewsManager.php';
require_once 'src/ArtistsManager.php';
require_once 'src/FiltersManager.php';
require_once 'src/InfosManager.php';
require_once 'src/MapItemsManager.php';
require_once 'src/PartnersManager.php';

session_cache_limiter(false);
session_start();
$app = new \Slim\Slim();

$parameters = parse_ini_file('src/parameters.ini', true);

if (!$parameters || !array_key_exists('website', $parameters) || !array_key_exists('base_url', $parameters['website'])) {
    die('Missing website base_url parameter in src/parameters.ini file !');
}

$homeUrl = $parameters['website']['base_url'];
$authorizedLogins = $parameters['authorizedLogins'];

function checkAuth(){
    if (!isset($_SESSION['loggedUser'])) {
        $app = \Slim\Slim::getInstance();
        $app->redirect($app->urlFor('/'));
    }
}

$app->get('/', function() use ($app) {
    global $homeUrl;
    // Si pas de ticket, c'est une invitation à se connecter
    if(empty($_GET["ticket"])) {
        $app->redirect("https://cas.utc.fr/cas/login?service=".$homeUrl);
    } else {
        // Connexion avec le ticket CAS
        try {
            $validateUrl = "https://cas.utc.fr/cas/serviceValidate?service=".$homeUrl."&ticket=".$_GET["ticket"];
            $response = file_get_contents($validateUrl);
            $xml = new SimpleXMLElement($response);

            $namespaces = $xml->getNamespaces();
            $serviceResponse = $xml->children($namespaces['cas']);
            $user = $serviceResponse->authenticationSuccess->user;

            global $authorizedLogins;
            if (in_array((string) $user, $authorizedLogins)) {
                $_SESSION['loggedUser'] = (string)$user;
                $app->redirect('home');
            } else {
                throw new Exception();
            }
        } catch (Exception $e) {
            $app->render('error.php', array('error_message' => 'Erreur de login CAS<br />Es-tu sûr d\'avoir accès à cette page ?  <a href="'.$app->urlFor('logout').'">Réessayer</a>'));
        }
    }
})->name('/');

$app->get('/logout', function() use ($app) {
    unset($_SESSION['loggedUser']);
    global $homeUrl;
    $app->redirect("https://cas.utc.fr/cas/logout?url=".$homeUrl);
})->name('logout');

$app->get('/home', 'checkAuth', function() use ($app) {
    $_SESSION['currentYear'] = date("Y");
    $app->render('header.php');
    $app->render('news.php');
    $app->render('artists.php');
    $app->render('filters.php');
    $app->render('infos.php');
    $app->render('map.php');
    $app->render('partners.php');
    $app->render('footer.php');
});

$app->get('/api/:table(/:lastRetrieve)', function( $table, $lastRetrieve = null) use ($app) {
    global $table_schema;
    $apiManager = new APIManager($table_schema);
    echo $apiManager->webService( $table, $lastRetrieve );
});

//
// Years
//
$app->get('/year', 'checkAuth', function() use ($app) {
    $newsManager = new NewsManager();
    $artistsManager = new ArtistsManager();
    $filtersManager = new FiltersManager();
    $infosManager = new InfosManager();
    $mapItemManager = new MapItemsManager();
    $partnersManager = new PartnersManager();
    
    $years = array_unique(
        array_merge($newsManager->getYears(),
            $artistsManager->getYears(),
            $filtersManager->getYears(),
            $infosManager->getYears(),
            $mapItemManager->getYears(),
            $partnersManager->getYears()
        )
    );
    echo json_encode($years);
});

$app->put('/year', 'checkAuth', function() use ($app) {
    $_SESSION['currentYear'] = $app->request->post('year');
    echo $_SESSION['currentYear'];
});

//
// News
//
$app->get('/news', 'checkAuth', function() use ($app) {
    $newsManager = new NewsManager($_SESSION['currentYear']);
    echo $newsManager->listAll();
});

$app->post('/news', 'checkAuth', function() use ($app) {
    $newsManager = new NewsManager($_SESSION['currentYear']);
    echo $newsManager->add(array(
        'title' => $app->request->post('title'),
        'content' => $app->request->post('content')
    ));
});

$app->put('/news/:id', 'checkAuth', function( $id ) use ($app) {
    $newsManager = new NewsManager($_SESSION['currentYear']);
    echo $newsManager->update($id, array(
        'title' => $app->request->post('title'),
        'content' => $app->request->post('content')
    ));
});

$app->delete('/news/:id', 'checkAuth', function( $id ) use ($app) {
    $newsManager = new NewsManager($_SESSION['currentYear']);
    echo $newsManager->delete($id);
});

//
// Artists
//
$app->get('/artist', 'checkAuth', function() use ($app) {
    $artistManager = new ArtistsManager($_SESSION['currentYear']);
    echo $artistManager->listAll();
});

$app->post('/artist', 'checkAuth', function() use ($app) {
    $artistManager = new ArtistsManager($_SESSION['currentYear']);

    echo $artistManager->add(array(
        'name' => $app->request->post('name'),
        'picture' => $app->request->post('picture'),
        'style' => $app->request->post('style'),
        'description' => $app->request->post('description'),
        'day' => $app->request->post('day'),
        'stage' => $app->request->post('stage'),
        'beginHour' => $app->request->post('startTime'),
        'endHour' => $app->request->post('endTime'),
        'website' => $app->request->post('website'),
        'facebook' => $app->request->post('facebook'),
        'twitter' => $app->request->post('twitter'),
        'youtube' => $app->request->post('youtube')
    ));
});

$app->get('/artist/:id', 'checkAuth', function( $id ) use ($app) {
    $artistManager = new ArtistsManager($_SESSION['currentYear']);
    echo $artistManager->find($id);
});

$app->put('/artist/:id', 'checkAuth', function( $id ) use ($app) {
    $artistManager = new ArtistsManager($_SESSION['currentYear']);

    echo $artistManager->update($id, array(
        'name' => $app->request->post('name'),
        'picture' => $app->request->post('picture'),
        'style' => $app->request->post('style'),
        'description' => $app->request->post('description'),
        'day' => $app->request->post('day'),
        'stage' => $app->request->post('stage'),
        'beginHour' => $app->request->post('startTime'),
        'endHour' => $app->request->post('endTime'),
        'website' => $app->request->post('website'),
        'facebook' => $app->request->post('facebook'),
        'twitter' => $app->request->post('twitter'),
        'youtube' => $app->request->post('youtube')
    ));
});

$app->delete('/artist/:id', 'checkAuth', function( $id ) use ($app) {
    $artistsManager = new ArtistsManager($_SESSION['currentYear']);
    echo $artistsManager->delete($id);
});

//
// Filters
//
$app->get('/filter', 'checkAuth', function() use ($app) {
    $filtersManager = new FiltersManager($_SESSION['currentYear']);
    echo $filtersManager->listAll();
});

$app->post('/filter', 'checkAuth', function() use ($app) {
    $filtersManager = new FiltersManager($_SESSION['currentYear']);
    echo $filtersManager->add(array(
        'picture' => $app->request->post('url')
    ));
});

$app->delete('/filter/:id', 'checkAuth', function( $id ) use ($app) {
    $filtersManager = new FiltersManager($_SESSION['currentYear']);
    echo $filtersManager->delete($id);
});

//
// Infos
//
$app->get('/info', 'checkAuth', function() use ($app) {
    $infosManager = new InfosManager($_SESSION['currentYear']);
    echo $infosManager->listAll();
});

$app->post('/info', 'checkAuth', function() use ($app) {
    $infosManager = new InfosManager($_SESSION['currentYear']);
    echo $infosManager->add(array(
        'name' => $app->request->post('name'),
        'picture' => $app->request->post('picture'),
        'isCategory' => $app->request->post('isCategory'),
        'content' => $app->request->post('content'),
        'parent' => $app->request->post('parent')
    ));
});

$app->get('/info/:id', 'checkAuth', function( $id ) use ($app) {
    $infosManager = new InfosManager($_SESSION['currentYear']);
    echo $infosManager->find($id);
});

$app->put('/info/:id', 'checkAuth', function( $id ) use ($app) {
    $infosManager = new InfosManager($_SESSION['currentYear']);
    echo $infosManager->update($id, array(
        'name' => $app->request->post('name'),
        'picture' => $app->request->post('picture'),
        'isCategory' => $app->request->post('isCategory'),
        'content' => $app->request->post('content'),
        'parent' => $app->request->post('parent')
    ));
});

$app->delete('/info/:id', 'checkAuth', function( $id ) use ($app) {
    $infosManager = new InfosManager($_SESSION['currentYear']);
    echo $infosManager->delete($id);
});

//
// Map
//
$app->get('/mapItem', 'checkAuth', function() use ($app) {
    $mapItemManager = new MapItemsManager($_SESSION['currentYear']);
    echo $mapItemManager->listAll();
});

$app->post('/mapItem', 'checkAuth', function() use ($app) {
    $mapItemManager = new MapItemsManager($_SESSION['currentYear']);
    echo $mapItemManager->add(array(
        'label' => $app->request->post('label'),
        'x' => $app->request->post('x'),
        'y' => $app->request->post('y'),
        'infoId' => $app->request->post('infoId')
    ));
});

$app->put('/mapItem/:id', 'checkAuth', function( $id ) use ($app) {
    $mapItemManager = new MapItemsManager($_SESSION['currentYear']);
    echo $mapItemManager->update($id, array(
        'label' => $app->request->post('label'),
        'x' => $app->request->post('x'),
        'y' => $app->request->post('y'),
        'infoId' => $app->request->post('infoId')
    ));
});

$app->delete('/mapItem/:id', 'checkAuth', function( $id ) use ($app) {
    $mapItemManager = new MapItemsManager($_SESSION['currentYear']);
    echo $mapItemManager->delete($id);
});

//
// Partners
//
$app->get('/partner', 'checkAuth', function() use ($app) {
    $partnersManager = new PartnersManager($_SESSION['currentYear']);
    echo $partnersManager->listAll();
});

$app->post('/partner', 'checkAuth', function() use ($app) {
    $partnersManager = new PartnersManager($_SESSION['currentYear']);
    echo $partnersManager->add(array(
        'name' => $app->request->post('name'),
        'picture' => $app->request->post('picture'),
        'website' => $app->request->post('website'),
        'priority' => $app->request->post('priority')
    ));
});

$app->put('/partner/:id', 'checkAuth', function( $id ) use ($app) {
    $partnersManager = new PartnersManager($_SESSION['currentYear']);
    echo $partnersManager->update($id, array(
        'name' => $app->request->post('name'),
        'picture' => $app->request->post('picture'),
        'website' => $app->request->post('website'),
        'priority' => $app->request->post('priority')
    ));
});

$app->delete('/partner/:id', 'checkAuth', function( $id ) use ($app) {
    $partnersManager = new PartnersManager($_SESSION['currentYear']);
    echo $partnersManager->delete($id);
});

$app->run();
