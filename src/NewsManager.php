<?php

class NewsManager {

	public function __construct(){}

	public function getNews(){
		

		$getNewsQuery = "SELECT id, title, content, date FROM "NEWS_TABLE" ORDER BY date DESC";
		$getNewsResult = mysql_query($getNewsQuery);

		$allNews = Array();
		while($newsRow = mysql_fetch_assoc($getNewsResult)){
			$thisNews = array('id'=> $newsRow['id'],
						 'title'=> $newsRow['title'],
						 'content'=> $newsRow['content'],
						 'date'=> $newsRow['date'] );
			array_push($allNews, $thisNews);
		}
		
		return (json_encode($allNews));
	}

	public function addNews($title, $content) {
		include ("connection.php");

		$title = mysql_real_escape_string( $title );
		$body = mysql_real_escape_string( $content );

		$addNewsQuery ="INSERT INTO "NEWS_TABLE"(title, content) VALUES ('".$title."', '".$body."')";
		echo $addNewsQuery;
		mysql_query($addNewsQuery);
		
	}

	public function deleteNews( $id ) {
		

		$deleteNewsQuery ="DELETE FROM "NEWS_TABLE" WHERE id=".$id;
		mysql_query($deleteNewsQuery);
		
	}

	public function updateNews ( $id, $title, $content) {
		

		$title = mysql_real_escape_string( $title );
		$content = mysql_real_escape_string( $content );

		$editNewsQuery ="UPDATE "NEWS_TABLE" SET title='".$title."', content='".$content."' WHERE id=".$id."";
		mysql_query($editNewsQuery);
		
	}
}