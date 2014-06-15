                <div class="bs-docs-section">
                    <div class="page-header">
                        <h1 id="partners">Partenaires</h1>
                    </div>
                    <p>Pour ajouter, éditer et supprimer les partenaires du festival.</p>
                    <p>Elles seront affichées dans l'ordre décroissant (la plus récente en premier) dans l'application.</p>

                    <div id="onDeletePartnersAlert" class="alert alert-danger fade in">
                        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                        <h4>Le partenaire a bien été supprimé !</h4>
                        <p>(C'est trop tard, il n'est plus possible de le récupérer. )</p>
                    </div>

                    <table id="partners-table" class="table table-bordered table-stripped table-hover">
						<thead>
							<th style="width: 20%">Nom</th>
							<th style="width: 20%">Image</th>
							<th style="width: 40%">Lien</th>
							<th style="width: 20%">Actions</th>
						</thead>
						<tbody></tbody>
					</table>

                    <!-- Button to trigger modal -->
                    <a id="addPartnersTriggerModal" data-toggle="modal" href="#addPartnerModal" class="btn btn-primary btn-lg">Ajouter un partenaire</a>

                    <!-- ADD Modal -->
                    <div class="modal fade" id="addPartnerModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                    <h4 class="modal-title">Ajouter un partenaire</h4>
                                </div>
                                <form role="form">
                                    <div class="modal-body">
                                        <input id="newName" type="text" class="form-control" placeholder="Titre">
                                        <br />
                                        <div class="form-group">
                                            <label for="newPicture" class="col-lg-2 control-label">Image</label>
                                            <input id="newPicture" type="hidden" value="" />
                                            <span class="btn btn-success fileinput-button">
                                                <i class="glyphicon glyphicon-plus"></i>
                                                <span id="partnerFileButtonName">Séléctionner un fichier</span>
                                                <!-- The file input field used as target for the file upload widget -->
                                                <input id="partnerFileUpload" type="file" name="files[]">
                                            </span>
                                            <br>
                                            <br>
											<p>Les photos d'artistes devraient avoir une résolution proche de <b>300*300 pixels</b>. C'est ce qui est utilisé dans l'application (une taille plus grande pourrait alourdir l'application).</p>
                                            <!-- The global progress bar -->
                                            <div id="progressPartner" class="progress">
                                                <div class="progress-bar progress-bar-success"></div>
                                            </div>


                                            <div class="col-md-3" id="photoPartner">
                                            </div>

                                        </div>
                                        <input id="newWebsite" type="text" class="form-control" placeholder="Lien web">
                                        <br />
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-default" data-dismiss="modal">Annuler</button>
                                        <button type="button" class="btn btn-primary" id="addPartnerButton">Ajouter</button>
                                    </div>
                                </form>
                            </div>
                            <!-- /.modal-content -->
                        </div>
                        <!-- /.modal-dialog -->
                    </div>
                    <!-- /.modal -->

                    <!-- EDIT Modal -->
                    <div class="modal fade" id="editPartnerModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                    <h4 class="modal-title">Modifier un partenaire</h4>
                                </div>
                                <form role="form">
                                    <div class="modal-body">
                                        <input id="id" type="hidden" value="">
                                        <input id="name" type="text" class="form-control" placeholder="Nom">
                                        <br />
                                         <div class="form-group">
                                            <label for="part-picture" class="col-lg-2 control-label">Image</label>
                                            <input id="part-picture" type="hidden" value="" />
                                            <span class="btn btn-success fileinput-button">
                                                <i class="glyphicon glyphicon-plus"></i>
                                                <span id="edit-partnerFileButtonName">Séléctionner un fichier</span>
                                                <!-- The file input field used as target for the file upload widget -->
                                                <input id="edit-partnerFileUpload" type="file" name="files[]">
                                            </span>
                                            <br>
                                            <br>
											<p>Les photos d'artistes devraient avoir une résolution proche de <b>300*300 pixels</b>. C'est ce qui est utilisé dans l'application (une taille plus grande pourrait alourdir l'application).</p>
                                            <!-- The global progress bar -->
                                            <div id="edit-progressPartner" class="progress">
                                                <div class="progress-bar progress-bar-success"></div>
                                            </div>


                                            <div class="col-md-3" id="edit-photoPartner">
                                            </div>

                                        </div>
                                        <input id="website" type="text" class="form-control" placeholder="Lien web">
                                        <br />
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-default" data-dismiss="modal">Annuler</button>
                                        <button type="button" class="btn btn-primary" id="editPartnerButton">Enregistrer</button>
                                    </div>
                                </form>
                            </div>
                            <!-- /.modal-content -->
                        </div>
                        <!-- /.modal-dialog -->
                    </div>
                    <!-- /.modal -->
                </div>
