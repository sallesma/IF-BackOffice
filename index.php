<?php
/**
 * Step 1: Require the Slim Framework
 *
 * If you are not using Composer, you need to require the
 * Slim Framework and register its PSR-0 autoloader.
 *
 * If you are using Composer, you can skip this step.
 */
require 'Slim/Slim.php';
\Slim\Slim::registerAutoloader();

require 'src/NewsManager.php';

$app = new \Slim\Slim();

$app->get('/', function() use ($app) {
	$app->render('header.php');
	$app->render('news.php');
	$app->render('artists.php');
	$app->render('filters.php');
	$app->render('infos.php');
	$app->render('map.php');
	$app->render('partners.php');
	$app->render('footer.php');
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

$app->run();
