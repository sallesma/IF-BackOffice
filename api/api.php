<?php
require_once("Rest.inc.php");

class API extends REST {

    public $data = "";



    private $db = NULL;

    public function __construct(){
        parent::__construct();				// Init parent contructor
        $this->dbConnect();					// Initiate Database connection
    }

    /*
		 *  Database connection
		*/
    private function dbConnect(){
        include("../data/connection.php");
        $this->db = mysql_connect($host,$login,$password);
        if($this->db)
            mysql_select_db($databaseName,$this->db);
    }

    /*
		 * Public method for access api.
		 * This method dynmically call the method based on the query string
		 *
		 */
    public function processApi(){
        $func = strtolower(trim(str_replace("/","",$_REQUEST['request'])));
        if((int)method_exists($this,$func) > 0)
            $this->$func();
        else
            $this->response('',404);				// If the method not exist with in this class, response would be "Page not found".
    }


    private function artists() {
        // Cross validation if the request method is GET else it will return "Not Acceptable" status
        if($this->get_request_method() != "GET"){
            $this->response('',406);
        }

        $lastRetrieve = $_REQUEST['lastRetrieve'];

        if (empty($lastRetrieve)) {
             $sql = mysql_query("SELECT * FROM artists", $this->db);

                if(mysql_num_rows($sql) > 0){

                    $result = array();
                    while($rlt = mysql_fetch_array($sql,MYSQL_ASSOC)){
                        $result[] = $rlt;
                    }

                    // If success everythig is good send header as "OK" and user details
                    $this->response($this->json($result), 200);
                }

                $this->response('', 204);	// If no records "No Content" status
        }
        else {


            $lastUpdateSql = mysql_query ("SELECT UPDATE_TIME FROM information_schema.TABLES WHERE TABLE_NAME =  'artists' LIMIT 0 , 30", $this->db);
            $lastUpdate = "";
            if(mysql_num_rows($lastUpdateSql) > 0) {
                 $lastUpdate = mysql_fetch_array($lastUpdateSql,MYSQL_ASSOC);
            }
            else
                $this->response('', 204);


            $lastRetrieveDate = strtotime($lastRetrieve);
            $lastUpdateDate = strtotime($lastUpdate['UPDATE_TIME']);

            if ($lastRetrieveDate > $lastUpdateDate){
                $this->response('Pas de nouvelles mises à jour disponible pour les artistes', 207);
            } else {
                $sql = mysql_query("SELECT * FROM artists", $this->db);

                if(mysql_num_rows($sql) > 0){

                    $result = array();
                    while($rlt = mysql_fetch_array($sql,MYSQL_ASSOC)){
                        $result[] = $rlt;
                    }

                    // If success everythig is good send header as "OK" and user details
                    $this->response($this->json($result), 200);
                }
                else
                    $this->response('', 204);	// If no records "No Content" status
            }

        }
    }

	private function infos() {
        // Cross validation if the request method is GET else it will return "Not Acceptable" status
        if($this->get_request_method() != "GET"){
            $this->response('',406);
        }

        $lastRetrieve = $_REQUEST['lastRetrieve'];

        if (empty($lastRetrieve)) {
             $sql = mysql_query("SELECT * FROM infos", $this->db);

                if(mysql_num_rows($sql) > 0){

                    $result = array();
                    while($rlt = mysql_fetch_array($sql,MYSQL_ASSOC)){
                        $result[] = $rlt;
                    }

                    // If success everythig is good send header as "OK" and user details
                    $this->response($this->json($result), 200);
                }

                $this->response('', 204);	// If no records "No Content" status
        }
        else {


            $lastUpdateSql = mysql_query ("SELECT UPDATE_TIME FROM information_schema.TABLES WHERE TABLE_NAME =  'infos' LIMIT 0 , 30", $this->db);
            $lastUpdate = "";
            if(mysql_num_rows($lastUpdateSql) > 0) {
                 $lastUpdate = mysql_fetch_array($lastUpdateSql,MYSQL_ASSOC);
            }
            else
                $this->response('', 204);


            $lastRetrieveDate = strtotime($lastRetrieve);
            $lastUpdateDate = strtotime($lastUpdate['UPDATE_TIME']);

            if ($lastRetrieveDate > $lastUpdateDate){
                $this->response('Pas de nouvelles mises à jour disponible pour les infos', 207);
            } else {
                $sql = mysql_query("SELECT * FROM infos", $this->db);

                if(mysql_num_rows($sql) > 0){

                    $result = array();
                    while($rlt = mysql_fetch_array($sql,MYSQL_ASSOC)){
                        $result[] = $rlt;
                    }

                    // If success everythig is good send header as "OK" and user details
                    $this->response($this->json($result), 200);
                }
                else
                    $this->response('', 204);	// If no records "No Content" status
            }

        }
    }


	private function news() {
        // Cross validation if the request method is GET else it will return "Not Acceptable" status
        if($this->get_request_method() != "GET"){
            $this->response('',406);
        }

        $lastRetrieve = $_REQUEST['lastRetrieve'];

        if (empty($lastRetrieve)) {
             $sql = mysql_query("SELECT * FROM news", $this->db);

                if(mysql_num_rows($sql) > 0){

                    $result = array();
                    while($rlt = mysql_fetch_array($sql,MYSQL_ASSOC)){
                        $result[] = $rlt;
                    }

                    // If success everythig is good send header as "OK" and user details
                    $this->response($this->json($result), 200);
                }

                $this->response('', 204);	// If no records "No Content" status
        }
        else {


            $lastUpdateSql = mysql_query ("SELECT UPDATE_TIME FROM information_schema.TABLES WHERE TABLE_NAME =  'news' LIMIT 0 , 30", $this->db);
            $lastUpdate = "";
            if(mysql_num_rows($lastUpdateSql) > 0) {
                 $lastUpdate = mysql_fetch_array($lastUpdateSql,MYSQL_ASSOC);
            }
            else
                $this->response('', 204);


            $lastRetrieveDate = strtotime($lastRetrieve);
            $lastUpdateDate = strtotime($lastUpdate['UPDATE_TIME']);

            if ($lastRetrieveDate > $lastUpdateDate){
                $this->response('Pas de nouvelles mises à jour disponible pour les news', 207);
            } else {
                $sql = mysql_query("SELECT * FROM news", $this->db);

                if(mysql_num_rows($sql) > 0){

                    $result = array();
                    while($rlt = mysql_fetch_array($sql,MYSQL_ASSOC)){
                        $result[] = $rlt;
                    }

                    // If success everythig is good send header as "OK" and user details
                    $this->response($this->json($result), 200);
                }
                else
                    $this->response('', 204);	// If no records "No Content" status
            }

        }
    }


    /*
		 *	Encode array into JSON
		*/
    private function json($data){
        if(is_array($data)){
            return json_encode($data);
        }
    }
}

// Initiiate Library

$api = new API;
$api->processApi();

?>