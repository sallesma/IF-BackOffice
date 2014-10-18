<?php

class APIManager
{
    private $table_schema = null;

    public function __construct($table_schema = null)
    {
        $this->table_schema = $table_schema;
    }

    public function webService( $table, $lastRetrieve)
    {
        $function = $table . "WebService";

        if (method_exists($this, $function)) {
            $this->$function($lastRetrieve);
        } else {
            $this->generateResponse('Unknown API route', 404);
        }
    }

    private function artistsWebService( $lastRetrieve )
    {
        $this->processWebService( ARTISTS_TABLE, $lastRetrieve );
    }

    private function infosWebService( $lastRetrieve )
    {
        $this->processWebService( INFOS_TABLE, $lastRetrieve );
    }

    private function newsWebService( $lastRetrieve )
    {
        $this->processWebService( NEWS_TABLE, $lastRetrieve );
    }

    private function filtersWebService( $lastRetrieve )
    {
        $this->processWebService( FILTERS_TABLE, $lastRetrieve );
    }

    private function mapItemsWebService( $lastRetrieve )
    {
        $this->processWebService( MAP_TABLE, $lastRetrieve );
    }

    private function partnersWebService( $lastRetrieve )
    {
        $this->processWebService( PARTNERS_TABLE, $lastRetrieve );
    }

    private function processWebService ( $table, $lastRetrieve )
    {
        $content = null;
        $status = 200;
        $connection = Connection::getInstance();

        if (is_null($lastRetrieve) || empty($lastRetrieve)) {
            $sth = $connection->prepare('SELECT * FROM ' . $table);
            $sth->execute();

            if ($sth->rowCount() > 0) {
                $content = json_encode($sth->fetchAll());
            } else {
				$content = 'Pas de données à renvoyer pour la table ' . $table;
                $status = 204;
            }
        } else {
            $connection = Connection::getInstance();
            $query = 'SELECT UPDATE_TIME FROM information_schema.TABLES WHERE TABLE_NAME = "' .$table.'"';
            if ($this->table_schema) {
                $query .= ' AND TABLE_SCHEMA = ' . $this->table_schema;
            }
            $sth = $connection->prepare($query);
            $sth->execute();

            if ($sth->rowCount() > 0) {
                $lastUpdate = $sth->fetch();

                $lastRetrieveDate = strtotime($lastRetrieve);
                $lastUpdateDate = strtotime($lastUpdate['UPDATE_TIME']);

                if ($lastRetrieveDate > $lastUpdateDate) {
                    $content = 'Pas de nouvelles mises à jour disponible pour la table ' . $table;
                    $status = 304;
                } else {
                    $currentYear = date("Y");
                    $sth = $connection->prepare('SELECT * FROM ' . $table . ' WHERE year = '. $currentYear);
                    $sth->execute();

                    if ($sth->rowCount() > 0) {
                        $content = json_encode($sth->fetchAll());
                    } else {
						$content = 'Pas de données à renvoyer pour cette date pour la table ' . $table;
                        $status = 204;
                    }
                }
            } else {
				$content = 'Impossible de trouver la date de dernière modification pour la table ' . $table;
                $status = 500;
            }
        }
        $this->generateResponse($content, $status);
    }

    private function generateResponse($data, $status)
    {
        $this->_code = ($status) ? $status : 200;
        $this->set_headers();
        echo $data;
        exit();
    }

    private function set_headers()
    {
        header("HTTP/1.1 " . $this->_code . " " . $this->get_status_message());
        header("Content-Type: application/json");
    }

    private function get_status_message()
    {
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
            505 => 'HTTP Version Not Supported'
        );

        return ($status[$this->_code] ? $status[$this->_code] : $status[500]);
    }
}
