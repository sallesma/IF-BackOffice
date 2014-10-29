var fs = require('fs');
var emptyfilesize = 514;

casper.test.begin('Testing partners manipulation', 16, function suite(test) {
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
      test.info('Testing partners section');
      test.assertExists('div.bs-docs-section div.page-header h1#partners', "Partners header exists");
      test.assertExists('table#partners-table', "Partners table exists");
   });

   casper.then(function() {
      test.info('Testing partners add');
      var count = this.evaluate(function() {
	 return __utils__.findAll('table#partners-table tbody tr').length;
      });
      this.click('a#addPartnersTriggerModal');
      this.waitUntilVisible('div#addPartnerModal', function() {
	 this.fill('div#addPartnerModal form', {
	    'files[]': 'test/image.png'
	 }, false);
	 this.wait(4000, function() {
	    this.fillSelectors('div#addPartnerModal form', {
	       'div#addPartnerModal form input#newName': 'test',
	       'div#addPartnerModal form input#newWebsite': 'testtesttest',
	       'div#addPartnerModal form input#newPriority': '999999999'
	    }, false);
	    this.click('button#addPartnerButton');
	    this.wait(3000, function() {
               var newCount = this.evaluate(function() {
                  return __utils__.findAll('table#partners-table tbody tr').length;
               });
               test.assertEquals(newCount, count + 1, 'One partner has been removed');
	       test.assertSelectorHasText('table#partners-table tbody tr:first-child td:nth-of-type(1)', 'test', 'New name is ok');
	       test.assertEvalEquals(function() {
		  return document.querySelectorAll('table#partners-table tbody tr:first-child td:nth-of-type(2) img')[0].getAttribute("src");
	       }, url + 'src/fileUpload/partners/image.png', 'New picture is ok');
	       test.assertSelectorHasText('table#partners-table tbody tr:first-child td:nth-of-type(3)', 'testtesttest', 'New website is ok');
	       test.assertSelectorHasText('table#partners-table tbody tr:first-child td:nth-of-type(4)', '999999999', 'New priority is ok');
	       this.download(url + '/src/fileUpload/partners/image.png', 'uploaded.png');
	       test.assertNotEquals(fs.size('uploaded.png'), emptyfilesize, 'Partner picture was uploaded');
	       fs.remove('uploaded.png');
	    }, function() {
	       test.fail('New partner was not added');
	    });
         }, function() {
	    test.fail('Could not upload partner picture');
	 });
      }, function() {
	 test.fail('Add partners modal was not visible');
      });
   });

   casper.then(function() {
      test.info('Testing partners delete');
      var count = this.evaluate(function() {
	 return __utils__.findAll('table#partners-table tbody tr').length;
      });
      this.click('table#partners-table tbody tr:first-child button.partnerDeleteButton');
      this.waitUntilVisible('div#onDeletePartnersAlert', function() {
	 test.pass('Partners delete modal is displayed');
      }, function() {
	 test.fail('Partners delete alert did not show up');
      });
      this.wait(3000, function() {
         var newCount = this.evaluate(function() {
            return __utils__.findAll('table#partners-table tbody tr').length;
         });
	 test.assertEquals(newCount, count -1, 'One partner has been removed');
	 test.assertSelectorDoesntHaveText('table#partners-table tbody tr:first-child td:nth-of-type(1)', 'test');
	 test.assertEval(function (url) {
	    return document.querySelectorAll('table#partners-table tbody tr:first-child td:nth-of-type(2) img')[0].getAttribute('src') != url + 'src/fileUpload/partners/image.png';
	    });
	 test.assertSelectorDoesntHaveText('table#partners-table tbody tr:first-child td:nth-of-type(3)', 'testtesttest');
	 test.assertSelectorDoesntHaveText('table#partners-table tbody tr:first-child td:nth-of-type(4)', '999999999');
	 this.download(url + '/src/fileUpload/partners/image.png', 'uploaded.png');
         test.assertEquals(fs.size('uploaded.png'), emptyfilesize, 'Partner picture was deleted');
	 fs.remove('uploaded.png');
      }, function() {
	 test.fail('Partner was not deleted');
      });
   });
 
   casper.run(function() {
      test.done();
   });
});
