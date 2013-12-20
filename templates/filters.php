                <div class="bs-docs-section">
                    <div class="page-header">
                        <h1 id="photoFilter">Filtres photos</h1>
                    </div>

                    <p>Vous pouvez ajouter des filtres photos qui seront utilisés pour la fonctionnalité d'appareil photo de l'application. L'utilisateur choisira un filtre et prendra une photo, la photo sera alors modifiée en ajoutant le filtre par dessus.</p>
                    <p>Vous devez impérativement respecter la taille standard qui est de XXX*XXX pixels et utiliser le format png (pour utiliser la transparence).</p>

                    <h3 id="photoFilter-add">Ajouter un filtre</h3>
                    <form id="filter-add-form" class="form-horizontal" role="form">
                        <span class="btn btn-success fileinput-button">
                            <i class="glyphicon glyphicon-plus"></i>
                            <span>Séléctionner un fichier</span>
                            <!-- The file input field used as target for the file upload widget -->
                            <input id="filtersFileUpload" type="file" name="files[]" multiple>
                        </span>
                        <br>
                        <br>
                        <!-- The global progress bar -->
                        <div id="progress" class="progress">
                            <div class="progress-bar progress-bar-success"></div>
                        </div>
                        <!-- The container for the uploaded files -->
                        <div id="files" class="files"></div>
                        <br>
                    </form>
                    <h3>Editer les filtres</h3>

                    <div id="onDeleteFiltersAlert" class="alert alert-danger fade in">
                        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                        <h4>Le filtre photo a bien été supprimé !</h4>
                        <p>(C'est trop tard, il n'est plus possible de le récupérer. )</p>
                    </div>

                    <div class="row" id="photo-filters">
                    </div>
                </div>