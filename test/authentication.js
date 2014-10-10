casper.test.begin('Testing backoffice authentication', 5, function suite(test) {
   var url = casper.cli.get('url')
   casper.start(url);
   
   casper.then(function() {
      test.assertEquals(this.getCurrentUrl(), 'https://cas.utc.fr/cas/login?service=' + url, "Redirection to CAS because not logged in");
      this.fillSelectors("form#fm1", {
	 'input[name="username"]': 'wronglogin',
	 'input[name="password"]': 'wrongpassword'
      }, false);
      this.click('input.btn-submit[name="submit_btn"]');
      var regexp_url = new RegExp("https://cas.utc.fr/cas/login.*?service=" + url);
      this.waitForUrl(regexp_url, function() {
         test.pass("Stays on CAS because bad credentials");

	 this.fillSelectors("form#fm1", {
	    'input[name="username"]': casper.cli.get("login"),
	    'input[name="password"]': casper.cli.get("password")
         }, false);
	 this.click('input.btn-submit[name="submit_btn"]');
         this.waitForUrl(url, function() {
	    test.pass("Redirection to backoffice after login");
	    this.click('a[href="logout"]');
	    this.waitForUrl('https://cas.utc.fr/cas/logout?url=' + url, function(){
	       test.pass("Redirection du CAS after logout");
	       test.assertVisible('a[href="'+url+'"]', "Link back to backoffice is visible");
	    }, function() {
	       test.fail();
	    });
	 }, function() {
	    test.fail();
	 });
      }, function() {
	 test.fail(this.getCurrentUrl());
      });
   });
 
   casper.run(function() {
      test.done();
   });
});
