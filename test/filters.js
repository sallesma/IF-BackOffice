var emptyfilesize = 514;

casper.test.begin('Testing filters manipulation', 10, function suite(test) {
   var url = casper.cli.get('url');
   var username = casper.cli.get('login');
   var password = casper.cli.get('password');
   casper.start(url);

   casper.then(function() {
      test.info('Logging in');
      if(this.exists('form#credentials')) {
         this.fillSelectors('form#credentials', {
            'input[name="username"]': username,
            'input[name="password"]': password
         }, false);
         this.click('button.SubmitBtn[name="Submit1"]');
      }
      this.waitForUrl(url, function(){
         test.pass('Logged in');
      }, function () {
         test.fail('Did not log in the backoffice');
      });
   });
  
   casper.then(function() {
      test.info('Testing filters section');
      test.assertExists('div.bs-docs-section div.page-header h1#photoFilter', "Filters header exists");
      test.assertExists('#photo-filters', "Filters area exists");
   });

   casper.then(function() {
      test.info('Testing filter add');
      var count = this.evaluate(function() {
         return __utils__.findAll('#photo-filters > div img').length;
      });
      this.fill('form#filter-add-form', {
         'files[]': 'test/image.png'
      }, false);
      this.wait(6000, function() {
         var newCount = this.evaluate(function() {
            return __utils__.findAll('#photo-filters > div img').length;
         });
         test.assertEquals(newCount, count + 1, 'One filter has been removed');
         test.assertEvalEquals(function () {
            return document.querySelectorAll('#photo-filters > div:last-child img')[0].getAttribute('src');
         }, url + 'src/fileUpload/filters/image.png', 'image.png found in image list');
         this.download(url + '/src/fileUpload/filters/image.png', 'uploaded.png');
         test.assertNotEquals(fs.size('uploaded.png'), emptyfilesize, 'Filter was uploaded');
         fs.remove('uploaded.png');
      }, function() {
         test.fail('New filter was not added');
      });
   });

   casper.then(function() {
      test.info('Testing filter delete');
      var count = this.evaluate(function() {
         return __utils__.findAll('#photo-filters > div img').length;
      });
      this.click('#photo-filters > div:last-child button.filterDeleteButton');
      this.waitUntilVisible('div#onDeleteFiltersAlert', function() {
         test.pass('Filter delete modal is displayed');
      }, function() {
         test.fail('Filter delete alert did not show up');
      });
      this.wait(4000, function() {
         var newCount = this.evaluate(function() {
            return __utils__.findAll('#photo-filters > div img').length;
         });
         test.assertEquals(newCount, count -1, 'One filter has been removed');
         test.assertEval(function (url) {
         return document.querySelectorAll('#photo-filters > div:last-child img')[0].getAttribute('src') != url + 'src/fileUpload/filters/image.png';
         }, 'image.png removed from image list');
         this.download(url + '/src/fileUpload/filters/image.png', 'uploaded.png');
         test.assertEquals(fs.size('uploaded.png'), emptyfilesize, 'Filter file was deleted');
         fs.remove('uploaded.png');
      }, function() {
         test.fail('Filter was not deleted');
      });
   });
 
   casper.run(function() {
      test.done();
   });
});
