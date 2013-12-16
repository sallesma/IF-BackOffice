                <div class="bs-docs-section">
                    <div class="page-header">
                        <h1 id="infos">Informations pratiques</h1>
                    </div>
                    <p>Vous pouvez ajouter ou éditer des infos pratiques par cette interface.</p>
                    <p>Sélectionnez une info ou une catégorie d'info dans l'arbre à gauche pour pouvoir l'éditer à droite. L'arborescence présentée sera exactement celle de la page "Infos pratiques" dans l'application.</p>
                    <p>Il est vivement conseillé de construire une arborescence propre (en mettant les infos dans des catégories et non l'inverse, par exemple). Sinon l'application mobile risque de mal fonctionner.</p>
                    <p>Il est possible de laisser des infos à la racine de l'arborescence ("Aucun parent").</p>
                    <div id="onDeleteInfoAlert" class="alert alert-danger fade in">
                        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                        <h4>L'info/Catégorie a bien été supprimée !</h4>
                        <p>(Les champs sont laissés plein au cas où tu voudrais copier/coller tout ça pour la recréer ;) )</p>
                    </div>
                    <div id="infos-div" class="row">
                        <div id="infos-tree" class="col-md-3"></div>
                        <div id="infos-edit-form" class="col-md-8">
                            <p id="infos-edit-text">Sélectionnez une info ou une catégorie dans l'arbre pour l'afficher en détail ici</p>
                            <form id="infos-form" class="form-horizontal" role="form">
                                <input id="info-id" type="hidden" value="" name="id" />
                                <!--Name-->
                                <div class="form-group">
                                    <label for="info-name" class="col-lg-4 control-label">Nom</label>
                                    <div class="col-lg-8">
                                        <input id="info-name" type="text" class="form-control" id="art-name" placeholder="Nom">
                                    </div>
                                </div>
                                <!--isCategory-->
                                <div class="form-group">
                                    <label for="info-name" class="col-lg-4 control-label">Catégorie ou info ?</label>
                                    <div class="col-lg-8">
                                        <label class="radio">
                                            <input type="radio" name="isCategoryRadio" id="category" value="1">Catégorie</label>
                                        <label class="radio">
                                            <input type="radio" name="isCategoryRadio" id="info" value="0">Info</label>
                                    </div>
                                </div>
                                <!--Description-->
                                <div id="InfoContent" class="form-group">
                                    <label for="info-content" class="col-lg-4 control-label">Description</label>
                                    <div class="col-lg-8">
                                        <textarea id="info-content" type="text" class="form-control" placeholder="Description"></textarea>
                                    </div>
                                </div>

								<!--Displayed on map ?-->
                                <div id="InfoContent" class="form-group">
                                    <label class="col-lg-4 control-label">Affichée sur la <a href="#map">carte</a> :</label>
                                        <p id="info-map" class="col-lg-8"></p>
                                </div>

                                <!-- UPLOAD -->
                                <div class="form-group">
                                    <label for="edit-info-image" class="col-lg-2 control-label">Icône</label>
                                    <input id="edit-info-image" type="hidden" value="" />
                                    <span class="btn btn-success fileinput-button">
                                        <i class="glyphicon glyphicon-plus"></i>
                                        <span id="edit-infoFileButtonName">Séléctionner un fichier</span>
                                        <!-- The file input field used as target for the file upload widget -->
                                        <input id="edit-infoFileUpload" type="file" name="files[]">
                                    </span>
                                    <br>
                                    <br>
                                    <!-- The global progress bar -->
                                    <div id="edit-progressInfo" class="progress">
                                        <div class="progress-bar progress-bar-success"></div>
                                    </div>

                                    <div class="col-md-3" id="edit-photoInfo">
                                    </div>
                                </div>
                                <div id="clear"></div>

                                <!--Parent-->
                                <div class="form-group">
                                    <label for="info-parent" class="col-lg-4 control-label">Catégorie parente</label>
                                    <div class="col-lg-8">
                                        <select id="info-parent" class="form-control"></select>
                                    </div>
                                </div>
                                <button type="button" class="btn btn-primary" id="infosEditButton">Enregistrer les modifs</button>
                                <button type="button" class="btn btn-danger" id="infosDeleteButton">Supprimer !</button>
                            </form>
                        </div>
                    </div>
                    <!-- Button to trigger modal -->
                    <a id="showInfoModalToAdd" data-toggle="modal" href="#addInfoModal" class="btn btn-primary btn-lg">Ajouter une Info</a>
                    <!-- ADD Modal -->
                    <div class="modal fade" id="addInfoModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                    <h4 class="modal-title">Ajouter une info</h4>
                                </div>
                                <form role="form">
                                    <div class="modal-body">
                                        <!--name-->
                                        <input id="add-info-name" type="text" class="form-control" placeholder="Titre">
                                        <br />
                                        <!--isCategory-->
                                        <input type="radio" name="isAddCategoryRadio" id="add-category" value="1">
                                        <span>&nbsp;Catégorie&nbsp;</span>
                                        <input type="radio" name="isAddCategoryRadio" id="add-info" value="0">
                                        <span>&nbsp;Info&nbsp;</span>
                                        <br />
                                        <br />
                                        <!--Description-->
                                        <textarea id="add-info-content" class="form-control" rows="3" placeholder="Contenu"></textarea>
                                        <br />
                                        <!-- Image -->
                                        <div class="form-group">
                                            <label for="add-info-image" class="col-lg-2 control-label">Image</label>
                                            <input id="add-info-image" type="hidden" value="" />
                                            <span class="btn btn-success fileinput-button">
                                                <i class="glyphicon glyphicon-plus"></i>
                                                <span id="infoFileButtonName">Séléctionner un fichier</span>
                                                <!-- The file input field used as target for the file upload widget -->
                                                <input id="add-infoFileUpload" type="file" name="files[]">
                                            </span>
                                            <br>
                                            <br>
                                            <!-- The global progress bar -->
                                            <div id="add-progressInfo" class="progress">
                                                <div class="progress-bar progress-bar-success"></div>
                                            </div>

                                            <div class="col-md-3" id="add-photoInfo">
                                            </div>

                                        </div>
                                        <br>
                                        <br>
                                        <!--Parent-->
                                        <label for="add-info-parent" class="col-lg-4 control-label">Catégorie parente</label>
                                        <select id="add-info-parent" class="form-control"></select>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-default" data-dismiss="modal">Annuler</button>
                                        <button type="button" class="btn btn-primary" id="addInfoButton">Ajouter</button>
                                    </div>
                                </form>
                            </div>
                            <!-- /.modal-content -->
                        </div>
                        <!-- /.modal-dialog -->
                    </div>
                    <!-- /.modal -->
                </div>