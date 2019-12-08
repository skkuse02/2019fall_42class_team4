print "\nTesting item API\n"
mocha test/test_item.js --timeout 30000
print "\nTesting user API\n"
mocha test/test_user.js --timeout 30000
print "\nTesting review API\n"
mocha test/test_review.js --timeout 30000
print "\nTesting login & logout API\n"
mocha test/test_loginout.js --timeout 30000
