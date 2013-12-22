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

                    <table id="partners-table" class="table table-hover"></table>

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