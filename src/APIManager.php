<?php

class APIManager {

	private $table_schema = NULL;

    public function __construct(){
        include("connection.php");
		$this->table_schema = $table_schema;
    }

	public function webService( $table, $lastRetrieve) {
        $function = $table."WebService";
        if( (int)method_exists($this,$function) > 0 )
            $this->$function( $lastRetrieve );
        else
            $this->response('',404);
    }

	private function artistsWebService( $lastRetrieve ) {
        $this->processWebService( "artists", $lastRetrieve );
    }

	private function infosWebService( $lastRetrieve ) {
        $this->processWebService( "infos", $lastRetrieve );
    }

	private function newsWebService( $lastRetrieve ) {
        $this->processWebService( "news", $lastRetrieve );
    }

	private function filtersWebService( $lastRetrieve ) {
        $this->processWebService( "filters", $lastRetrieve );
    }

	private function mapItemsWebService( $lastRetrieve ) {
        $this->processWebService( "map", $lastRetrieve );
    }

	private function partnersWebService( $lastRetrieve ) {
        $this->processWebService( "partners", $lastRetrieve );
    }

	private function processWebService ( $table, $lastRetrieve ) {
		if (empty($lastRetrieve)) {
             $sql = mysql_query("SELECT * FROM ".$table);

                if(mysql_num_rows($sql) > 0){
                    $result = array();
                    while($rlt = mysql_fetch_array($sql,MYSQL_ASSOC)){
                        $result[] = $rlt;
                    }
                    $this->response(json_encode($result), 200);
                }
                $this->response('', 204);	// If no records "No Content" status
        } else {
            $lastUpdateSql = mysql_query ("SELECT UPDATE_TIME FROM information_schema.TABLES WHERE TABLE_NAME = '".$table."' AND TABLE_SCHEMA = '".$this->table_schema."'");
            $lastUpdate = "";
            if(mysql_num_rows($lastUpdateSql) > 0) {
                 $lastUpdate = mysql_fetch_array($lastUpdateSql,MYSQL_ASSOC);
            } else {
                $this->response('', 204);
			}

            $lastRetrieveDate = strtotime($lastRetrieve);
            $lastUpdateDate = strtotime($lastUpdate['UPDATE_TIME']);

            if ($lastRetrieveDate > $lastUpdateDate){
                $this->response("Pas de nouvelles mises à jour disponible pour la table ".$table, 304);
            } else {
                $sql = mysql_query("SELECT * FROM ".$table);

                if(mysql_num_rows($sql) > 0){
                    $result = array();
                    while($rlt = mysql_fetch_array($sql,MYSQL_ASSOC)){
                        $result[] = $rlt;
                    }
                    $this->response(json_encode($result), 200);
                }
                else
                    $this->response('', 204);	// If no records "No Content" status
            }
        }
	}

	private function response($data,$status){
		$this->_code = ($status)?$status:200;
		$this->set_headers();
		echo $data;
		exit;
	}

	private function get_status_message(){
		$status = array(
					100 => 'Continue',
					101 => 'Switching Protocols',
					200 => 'OK',
					201 => 'Created',
					202 => 'Accepted',
					203 => 'Non-Authoritative Information',
					204 => 'No Content',
					205 => 'Reset Content',
					206 => 'Partial Content',
					300 => 'Multiple Choices',
					301 => 'Moved Permanently',
					302 => 'Found',
					303 => 'See Other',
					304 => 'Not Modified',
					305 => 'Use Proxy',
					306 => '(Unused)',
					307 => 'Temporary Redirect',
					400 => 'Bad Request',
					401 => 'Unauthorized',
					402 => 'Payment Required',
					403 => 'Forbidden',
					404 => 'Not Found',
					405 => 'Method Not Allowed',
					406 => 'Not Acceptable',
					407 => 'Proxy Authentication Required',
					408 => 'Request Timeout',
					409 => 'Conflict',
					410 => 'Gone',
					411 => 'Length Required',
					412 => 'Precondition Failed',
					413 => 'Request Entity Too Large',
					414 => 'Request-URI Too Long',
					415 => 'Unsupported Media Type',
					416 => 'Requested Range Not Satisfiable',
					417 => 'Expectation Failed',
					500 => 'Internal Server Error',
					501 => 'Not Implemented',
					502 => 'Bad Gateway',
					503 => 'Service Unavailable',
					504 => 'Gateway Timeout',
					505 => 'HTTP Version Not Supported');
		return ($status[$this->_code])?$status[$this->_code]:$status[500];
	}

	private function set_headers(){
		header("HTTP/1.1 ".$this->_code." ".$this->get_status_message());
		header("Content-Type: application/json");
	}
}
?>