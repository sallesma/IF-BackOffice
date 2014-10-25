casper.test.begin('Testing news manipulation', 9, function suite(test) {
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
      test.info('Testing news section');
      test.assertExists('div.bs-docs-section div.page-header h1#news', "News header exists");
      test.assertExists('table#news-table', "News table exists");
   });

   casper.then(function() {
      test.info('Testing news add');
      this.click('a#addNewsTriggerModal');
      this.waitUntilVisible('div#addNewModal', function() {
	 this.fillSelectors('div#addNewModal form', {
	    'div#addNewModal form input#newTitle': 'test',
	    'div#addNewModal form textarea#newContent': 'testtesttest'
	 }, false);
	 this.click('button#addNewButton');
	 this.wait(3000, function() {
	    test.assertSelectorHasText('table#news-table tbody tr:first-child td#title', 'test', 'New title is ok');
	    test.assertSelectorHasText('table#news-table tbody tr:first-child td#content', 'testtesttest', 'New content is ok');
	 }, function() {
	    test.fail('New news was not added');
	 });
      }, function() {
	 test.fail('Add news modal was not visible');
      });
   });

   /*casper.then(function() {
      test.info('Testing news update');
      this.click('table#news-table tbody tr:first-child button.modifyNewButton');
      this.waitUntilVisible('div#editNewsModal.in', function() {
	 test.pass('Edit news modal is visible');
         this.fillSelectors('div#editNewsModal form', {
	    'div#editNewsModal form input#newTitle': 'test2',
	    'div#editNewsModal form textarea#newContent': 'testtesttest2'
	 }, false);
	 this.click('button#editNewButton');
	 this.wait(1000, function() {
	    test.assertSelectorHasText('table#news-table tbody tr:first-child td#title', 'test2');
	    test.assertSelectorHasText('table#news-table tbody tr:first-child td#content', 'testtesttest2');
	 }, function() {
	    test.fail('Last news was not updated');
	 });
      }, function() {
	 this.capture('test.png');
	 test.fail('Edit news modal was not visible');
      });
   });*/

   casper.then(function() {
      test.info('Testing news delete');
      var count = this.evaluate(function() {
	 return __utils__.findAll('table#news-table tbody tr').length;
      });
      this.click('table#news-table tbody tr:first-child button.newsDeleteButton');
      this.waitUntilVisible('div#onDeleteNewsAlert', function() {
	 test.pass('News delete modal is displayed');
      }, function() {
	 test.fail('News delete alert did not show up');
      });
      this.wait(3000, function() {
         var newCount = this.evaluate(function() {
            return __utils__.findAll('table#news-table tbody tr').length;
         });
	 test.assert(newCount == count -1, 'One news has been removed');
	 test.assertSelectorDoesntHaveText('table#news-table tbody tr:first-child td#title', 'test2');
	 test.assertSelectorDoesntHaveText('table#news-table tbody tr:first-child td#content', 'testtesttest2');
      }, function() {
	 test.fail('News was not deleted');
      });
   });
 
   casper.run(function() {
      test.done();
   });
});
