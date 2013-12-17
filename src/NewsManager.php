<?php

class NewsManager {

	public function __construct(){}

	public function getNews(){
		include("connection.php");

		$getNewsQuery = "SELECT id, title, content, date FROM news ORDER BY date DESC";
		$getNewsResult = mysql_query($getNewsQuery);

		$allNews = Array();
		while($newsRow = mysql_fetch_assoc($getNewsResult)){
			$thisNews = array('id'=> $newsRow['id'],
						 'title'=> $newsRow['title'],
						 'content'=> $newsRow['content'],
						 'date'=> $newsRow['date'] );
			array_push($allNews, $thisNews);
		}
		mysql_close($link);
		return (json_encode($allNews));
	}

	public function addNews($title, $content) {
		include ("connection.php");

		$title = mysql_real_escape_string( $title );
		$body = mysql_real_escape_string( $content );

		$addNewsQuery ="INSERT INTO news(title, content) VALUES ('".$title."', '".$body."')";
		echo $addNewsQuery;
		mysql_query($addNewsQuery);
		mysql_close($link);
	}

	public function deleteNews( $id ) {
		include("connection.php");

		$deleteNewsQuery ="DELETE FROM news WHERE id=".$id;
		mysql_query($deleteNewsQuery);
		mysql_close($link);
	}

	public function updateNews ( $id, $title, $content) {
		include("connection.php");

		$title = mysql_real_escape_string( $title );
		$content = mysql_real_escape_string( $content );

		$editNewsQuery ="UPDATE news SET title='".$title."', content='".$content."' WHERE id=".$id."";
		mysql_query($editNewsQuery);
		mysql_close($link);
	}
}