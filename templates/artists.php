                <div class="bs-docs-section">
                    <div class="page-header">
                        <h1 id="artists">Artistes</h1>
                    </div>
                    <p>Vous pouvez ajouter ou éditer des artistes par cette interface. Les changements sont pris en compte pour modifier la programmation en conséquence (en plus des fiches artiste).</p>
					<p>Faites attention à bien écrire les styles des artistes. Sinon, ils seront mal classés dans l'affichage par style.</p>
                    <div id="onDeleteArtistAlert" class="alert alert-danger fade in">
                        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                        <h4>L'artiste a bien été supprimé !</h4>
                        <p>(C'est trop tard, il n'est plus possible de le récupérer. )</p>
                    </div>
                    <table id="artists-table" class="table table-hover"></table>

                    <!-- Button to trigger modal -->
                    <button id="showArtistModalToAdd" class="btn btn-primary btn-lg">Ajouter un artiste</button>
                    <!-- Modal -->
                    <div class="modal fade" id="artistModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                    <h4 class="modal-title" id="title">Ajouter un nouvel artiste</h4>
                                </div>
                                <input type="hidden" value="" name="id" />
                                <form id="artist-add-form" class="form-horizontal" role="form">
                                    <div class="modal-body">
                                        <!--Name-->
                                        <div class="form-group">
                                            <label for="art-name" class="col-lg-2 control-label">Nom</label>
                                            <div class="col-lg-10">
                                                <input id="art-name" type="text" class="form-control" id="art-name" placeholder="Nom">
                                            </div>
                                        </div>
                                        <!--Style-->
                                        <div class="form-group">
                                            <label for="art-style" class="col-lg-2 control-label">Style</label>
                                            <div class="col-lg-10">
                                                <input id="art-style" type="text" class="form-control" id="art-style" placeholder="Style">
                                            </div>
                                        </div>
                                        <!-- Image -->
                                        <div class="form-group">
                                            <label for="art-image" class="col-lg-2 control-label">Image</label>
                                            <input id="art-image" type="hidden" value="" />
                                            <span class="btn btn-success fileinput-button">
                                                <i class="glyphicon glyphicon-plus"></i>
                                                <span id="artistFileButtonName">Séléctionner un fichier</span>
                                                <!-- The file input field used as target for the file upload widget -->
                                                <input id="artistFileUpload" type="file" name="files[]">
                                            </span>
                                            <br>
                                            <br>
											<p>Les photos d'artistes devraient avoir une résolution proche de <b>300*300 pixels</b>. C'est ce qui est utilisé dans l'application (une taille plus grande pourrait alourdir l'application).</p>
                                            <!-- The global progress bar -->
                                            <div id="progressArtist" class="progress">
                                                <div class="progress-bar progress-bar-success"></div>
                                            </div>


                                            <div class="col-md-3" id="photoArtist">
                                            </div>

                                        </div>


                                        <!--Description-->
                                        <div class="form-group">
                                            <label for="art-description" class="col-lg-2 control-label">Description</label>
                                            <div class="col-lg-10">
                                                <textarea id="art-description" type="text" class="form-control" placeholder="Description"></textarea>
                                            </div>
                                        </div>

                                        <!--Scene-->
                                        <div class="form-group">
                                            <label for="art-scene" class="col-lg-2 control-label">Scène</label>
                                            <div class="col-lg-10">
                                                <select id="art-scene" class="form-control">
                                                    <option value="principale">Scène principale</option>
                                                    <option value="chapiteau">Scène chapiteau</option>
                                                </select>
                                            </div>
                                        </div>
                                        <!--Day-->
                                        <div class="form-group">
                                            <label for="art-day" class="col-lg-2 control-label">Jour</label>
                                            <div class="col-lg-10">
                                                <select id="art-day" class="form-control">
                                                    <option value="vendredi">Vendredi</option>
                                                    <option value="samedi">Samedi</option>
                                                </select>
                                            </div>
                                        </div>
                                        <!--Start time-->
                                        <div class="form-group">
                                            <label for="art-start-time" class="col-lg-2 control-label">Heure début</label>
                                            <div class="bootstrap-timepicker col-lg-10">
                                                <input id="art-start-time" type="text">
                                            </div>
                                        </div>
                                        <!--End hour-->
                                        <div class="form-group">
                                            <label for="art-end-time" class="col-lg-2 control-label">Heure Fin</label>
                                            <div class="bootstrap-timepicker col-lg-10">
                                                <input id="art-end-time" type="text">
                                            </div>
                                        </div>
                                        <!--Website-->
                                        <div class="form-group">
                                            <label for="art-website" class="col-lg-2 control-label">Site web</label>
                                            <div class="input-group col-lg-10">
                                                <input id="art-website" type="text" class="form-control input-link">
                                                <span class="input-group-btn">
                                                    <button class="btn btn-default visit-link" type="button">Visiter</button>
                                                </span>
                                            </div>
                                            <!-- /input-group -->
                                        </div>
                                        <!--Facebook-->
                                        <div class="form-group">
                                            <label for="art-facebook" class="col-lg-2 control-label">Facebook</label>
                                            <div class="input-group col-lg-10">
                                                <input id="art-facebook" type="text" class="form-control input-link">
                                                <span class="input-group-btn">
                                                    <button class="btn btn-default visit-link" type="button">Visiter</button>
                                                </span>
                                            </div>
                                            <!-- /input-group -->
                                        </div>
                                        <!--Twitter-->
                                        <div class="form-group">
                                            <label for="art-twitter" class="col-lg-2 control-label">Twitter</label>
                                            <div class="input-group col-lg-10">
                                                <input id="art-twitter" type="text" class="form-control input-link">
                                                <span class="input-group-btn">
                                                    <button class="btn btn-default visit-link" type="button">Visiter</button>
                                                </span>
                                            </div>
                                            <!-- /input-group -->
                                        </div>
                                        <!--Twitter-->
                                        <div class="form-group">
                                            <label for="art-youtube" class="col-lg-2 control-label">Youtube</label>
                                            <div class="input-group col-lg-10">
                                                <input id="art-youtube" type="text" class="form-control input-link">
                                                <span class="input-group-btn">
                                                    <button class="btn btn-default visit-link" type="button">Visiter</button>
                                                </span>
                                            </div>
                                            <!-- /input-group -->
                                        </div>
                                    </div>
                                    <!--/.modal-body-->
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-default" data-dismiss="modal">Annuler</button>
                                        <button type="button" class="btn btn-primary" id="artistModalActionButton">Ajouter</button>
                                    </div>
                                    <!--/.modal-footer-->
                                </form>
                            </div>
                            <!-- /.modal-content -->
                        </div>
                        <!-- /.modal-dialog -->
                    </div>
                    <!-- /.modal -->
                </div>